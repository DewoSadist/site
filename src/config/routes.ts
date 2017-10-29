/// <reference path="../../typings/index.d.ts" />
import {IShopServices, default as ShopServices} from '../app/services/shopServices/shop.services';
import AuthService from "../app/services/auth/auth.service";
import {IUserService} from "../app/services/userService/user.service";
import {register} from "../app/components/users/register/register";
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
	.state('terms', {
		url: '/terms',
		template: '<terms></terms>'
	})
	.state('partner', {
		url: '/partner',
		template: '<partner></partner>'
	})
	.state('courier', {
		url: '/courier',
		template: '<courier></courier>'
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
	.state('users.register', {
		url: '/register',
		params: {
			warning: null,
		},
		template: '<register warning="$resolve.warning"></register>',
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
		template: '<restaurant-item data-restaurant="$resolve.restaurant" data-categories="$resolve.categories"></restaurant-item>',
		resolve:{
			restaurant: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService, $state: ng.ui.IStateService) => {
				if ($stateParams['id']) {
					return ShopServices.getRestaurant($stateParams['id']) || $state.go('profile.main');
				} else {
					return ShopServices.getRestaurant($stateParams['id']) || $state.go('profile.main');
				}
			},
			categories: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService) => {
				return ShopServices.getRestaurantCategories($stateParams['id']);
			},
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
	.state('profile.product-new', {
		url: '/categories/:cid/productnew',
		template: '<products-new data-cid="$resolve.cid"></products-new>',
		params: {cid: null},
		resolve: {
			cid: ($stateParams: ng.ui.IStateParamsService) => {
				return $stateParams['cid'];
			}
		}

	})
	.state('profile.product-item', {
		url: '/products/:id',
		params: {id:null},
		template: '<products-item data-product="$resolve.product"></products-item>',
		resolve: {
			product: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService, $state: ng.ui.IStateService)=>{
				if ($stateParams['id']) {
					return ShopServices.getProduct($stateParams['id']);
				} else {
					return ShopServices.getProduct($stateParams['id']);
				}
			}
		}

	})
	.state('profile.order-item', {
		url: '/orders/:id',
		params: {id:null},
		template: '<order-item data-order="$resolve.order"></order-item>',
		resolve: {
			order: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService, $state: ng.ui.IStateService)=>{
				if ($stateParams['id']) {
					return ShopServices.getOrder($stateParams['id']);
				} else {
					return ShopServices.getOrder($stateParams['id']);
				}
			}
		}
	})
	.state('profile.order-edit', {
		url: '/orders/edit/:id',
		params: {id: null},
		template: '<order-edit data-order="$resolve.order"></order-edit>',
		resolve: {
			order: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService, $state: ng.ui.IStateService)=> {
				if ($stateParams['id']) {
					return ShopServices.getOrder($stateParams['id']);
				} else {
					return ShopServices.getOrder($stateParams['id']) || $state.go('profile.main');
				}
			}
		}
	})
	.state('profile.category-new', {
		url: '/categorynew',
		params: {id : null},
		template: '<category-new data-img-categories="$resolve.imgCategories"></category-new>',
		resolve: {
			imgCategories: (ShopServices: IShopServices) => {
				return ShopServices.getImgCategories();
			}
		}
	})
	.state('profile.category-products', {
		url: '/category/:id/products',
		template: '<cat-products data-products-list="$resolve.catProducts" data-cat-id="$resolve.catId"></cat-products>',
		resolve: {
			catProducts: (ShopServices: IShopServices, $stateParams: ng.ui.IStateParamsService, $state : ng.ui.IStateService)=>{
				if ($stateParams['id']) {
					return ShopServices.getCategoryProducts($stateParams['id']);
				} else {
					return ShopServices.getCategoryProducts($stateParams['id']) || $state.go('profile.main');
				}
			},
			catId: ($stateParams: ng.ui.IStateParamsService) => {
				return $stateParams['id'];
			}

		}
	})
	;
}
