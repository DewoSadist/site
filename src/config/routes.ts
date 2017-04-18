/// <reference path="../../typings/index.d.ts" />
import {IShopServices, default as ShopServices} from '../app/services/shopServices/shop.services';
export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
	// $locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('root', {
		abstract: true,
		template: '<div ui-view=""></div>'
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
	});
}
