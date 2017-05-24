/// <reference path="../../typings/index.d.ts" />
import {IShopServices, default as ShopServices} from '../app/services/shopServices/shop.services';
import AuthService from "../app/services/auth/auth.service";
import {IUserService} from "../app/services/userService/user.service";
export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
	// $locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('root', {
		abstract: true,
		template: '<div ui-view=""></div>',
		resolve: {
			user: (UserService: IUserService,
				   AuthService: AuthService,
				   $q: ng.IQService,
				   $state: ng.ui.IStateService) => {
				if (UserService.user) {
					return UserService.user;
				} else {
					let deferred = $q.defer();
					AuthService.initiateUser()
					.then((response) => {
						deferred.resolve(response);
					})
					.catch((error) => {
						AuthService.logoutEventBroadcast();
						$state.go('users.login')
					});
					return deferred.promise;
				}
			}
		}
	})
	.state('home', {
		url: '/',
		parent: 'root',
		template: '<home></home>'
	})
	.state('store', {
		url: '/store',
		redirectTo: 'store.restaurants',
		parent: 'root',
		template: '<store></store>'
	})
	.state('store.restaurants',{
		url: '/restaurants',
		template: '<store-restaurants></store-restaurants>',
	})
	.state('store.restaurant', {
		url: '/restaurants/:restaurantId',
		template: '<store-restaurant data-restaurant-id="$resolve.restaurantId" data-restaurant="$resolve.restaurant" data-products-list="$resolve.productsList" data-categories="$resolve.categories"></store-restaurant>',
		resolve: {
			restaurantId: ($stateParams: ng.ui.IStateParamsService) => {
				return $stateParams['restaurantId'];
			},
			restaurant: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService) => {
				return ShopServices.getRestaurant($stateParams['restaurantId']);
			},
			categories: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService) => {
				return ShopServices.getRestaurantCategories($stateParams['restaurantId']);
			},
			productsList: (ShopServices: IShopServices) => {
				return ShopServices.getAllProducts();
			},
		}
	})
	.state('cart', {
		url: '/cart',
		template: '<cart></cart>'
	})

	// ----------------------------------- CUSTOM PAGES -----------------------------------

	.state('theme', {
		url: '/theme',
		templateUrl: 'bootstrap/demo.html'
	})
	.state('about',{
			url: '/about',
			template:'<about></about>'
	})
	.state('contacts',{
		url: '/contacts',
		template:'<contacts></contacts>'
	})

	// ----------------------------------- USER STATES ---------------------------------------

	.state('users', {
		url: '/users',
		parent: 'root',
		template: '<users></users>',
	})
	.state('users.login', {
		url: '/login',
		params: {
			warning: null,
		},
		template: '<login warning="$resolve.warning"></login>',
		resolve: {
			warning: ($stateParams: ng.ui.IStateParamsService) => {
				return $stateParams['warning'];
			}
		}
	})
	// ----------------------------------- PROFILE STATES -----------------------------------

	.state('profile', {
		url: '/profile',
		template: '<profile operation="$resolve.operation" user="$resolve.user"></profile>',
		parent: 'root',
		params: {
			operation: null
		},
		resolve: {
			operation: ($stateParams: ng.ui.IStateParamsService) => {
				return $stateParams['operation'];
			},
		}

	})
	.state('profile.main', {
		url: '/main',
		template: '<profile-main user="$resolve.user" ></profile-main>',
	})
	.state('profile.restaurant', {
		url:'/restaurant/:id',
		params: {id:null},
		template: '<restaurant-item data-restaurant="$resolve.restaurant"></restaurant-item>',
		resolve:{

			restaurant: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService, $state: ng.ui.IStateService) => {
				if ($stateParams['id']) {
					return ShopServices.getRestaurant($stateParams['id']) || $state.go('profile.main');
				} else {
					return ShopServices.getRestaurant($stateParams['id']) || $state.go('profile.main');
				}
			}
		}
	})
	.state('profile.restaurant-edit', {
		url:'/restaurant/edit/:id',
		template: '<restaurant-edit data-restaurant="$resolve.restaurant"></restaurant-edit>',
		resolve:{
			restaurant: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService, $state: ng.ui.IStateService) => {
				return ShopServices.getRestaurant($stateParams['id']) || $state.go('profile.restaurant');
			}
		}
	})
	.state('profile.restaurant-new', {
		url:'/restaurantnew',
		template: '<restaurant-new></restaurant-new>'
	})
	;
}
