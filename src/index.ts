/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';
import * as moment from 'moment';

// ------------------ Libs & system --------------------
import 'angular-sticky-plugin';
import 'angular-swing';
import 'angular-hammer';
import 'restangular-umd';
import 'angular-cookies';
import 'humanize-duration';
import 'angular-timer';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-touch';
import 'angular-ui-mask';
import 'angular-credit-cards';
import 'creditcards/card';
import 'angular-filter';
import 'angular-loading-bar';
import 'ngmap/build/scripts/ng-map';

import 'jquery-migrate';

import './index.scss';
import '@iamadamjowett/angular-click-outside';

// ------------------ Components --------------------
import { header } from './app/components/layout/header/header';
import { footer } from './app/components/layout/footer/footer';

import { home } from './app/components/home/home';
import { homeSlider } from './app/components/home/slider/home.slider';

import { store } from './app/components/store/store';
import { storeRestaurants } from './app/components/store/restaurants/store.restaurants';
import { storeRestaurant} from './app/components/store/restaurants/restaurant/store.restaurant';
import { productsCollection } from './app/components/products/collection/products.collection';
import { productsFilter } from './app/components/products/filter/products.filter';
import { productsInfo } from './app/components/products/info/products.info';
import { productsItem } from './app/components/products/item/products.item';
import { productsEdit } from './app/components/products/edit/products.edit';
import { productsNew } from './app/components/products/new/products.new';

import { sidebar } from './app/components/cart/sidebar/sidebar';
import { cart } from './app/components/cart/cart';

import { about } from './app/components/pages/about/about';
import { contacts } from  './app/components/pages/contacts/contacts';
import { terms } from "./app/components/pages/terms/terms";


import { users } from './app/components/users/users';
import { login } from './app/components/users/login/login';
import { register } from "./app/components/users/register/register";
import { usersList } from "./app/components/users/list/users.list";


import { profile } from './app/components/profile/profile';
import { profileMain } from './app/components/profile/main/main';
import { history } from './app/components/common/history/history';
import { historyItem } from './app/components/common/history/item/history.item';
import { historyDetails } from './app/components/common/history/details/history.details';
import { historyFilter } from './app/components/common/history/filter/history.filter';
import { admin } from './app/components/profile/admin/admin';
import { restaurantsList } from './app/components/profile/restaurants/list/restaurants.list';
import { restaurantNew } from "./app/components/profile/restaurants/new/restaurant.new";
import { restaurantEdit } from "./app/components/profile/restaurants/edit/restaurant.edit";
import { restaurantItem } from "./app/components/profile/restaurants/item/restaurant.item";
import { orderHistory } from "./app/components/orders/history/order.history";
import { orderEdit } from "./app/components/orders/edit/order.edit";
import { orderItem } from "./app/components/orders/item/order.item";
import { categoryNew } from "./app/components/profile/categories/new/category.new";

// ------------------ Services --------------------
import AuthService from './app/services/auth/auth.service';
import ShopServices from './app/services/shopServices/shop.services';
import CartServices from './app/services/cartServices/cart.services';
import TemplatorService from './app/services/templator/templator.service';
import ErrorService from './app/services/errorService/error.service';
import UserService from "./app/services/userService/user.service";

// ------------------ Directives ------------------
import clearErrorDirective from './app/directives/clearErrors/clearErrors';

// ------------------ General ---------------------
import routesConfig from './config/routes';
import restangularConfig from './config/restangular';
import maskConfig from './config/mask';
import runConfig from './config/run';
import loadingBarConfig from './config/loadingBar';





const highcharts = require('highcharts');
const tinycolor = require('tinycolor2');

var variables = {
	apiUrl: '',
	frontUrl: '',
};

function fetchJSONFile(path, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				var data = JSON.parse(httpRequest.responseText);
				if (callback) callback(data);
			}
		}
	};
	httpRequest.open('GET', path);
	httpRequest.send();
}

// this requests the file and executes a callback with the parsed result once
// it is available
fetchJSONFile('variables.json', (data) => {
	variables.apiUrl = data.apiUrl;
	variables.frontUrl = data.frontUrl;

	angular.bootstrap(document.getElementsByTagName("BODY")[0], ['app']);
});


const appConfig = variables;

angular.module('app', [
	'ui.router',
	'restangular',
	'ngCookies',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
	'ngAnimate',
	'ngTouch',
	'ui.mask',
	'timer',
	'credit-cards',
	'hl.sticky',
	'gajus.swing',
	'hmTouchEvents',
	'angular.filter',
	'angular-loading-bar',
	'angular-click-outside',
	'ngMap',
])
.constant('appConfig', appConfig)
.constant('moment', moment)
.constant('tinycolor', tinycolor)
.constant('highcharts', highcharts)


.service('ShopServices', ShopServices)
.service('CartServices', CartServices)
.service('TemplatorService', TemplatorService)
.service('ErrorService', ErrorService)
.service('AuthService', AuthService)
.service('UserService',UserService)

.directive('clearErrors', clearErrorDirective)

.component('header', header)
.component('footer', footer)
.component('home', home)
.component('homeSlider', homeSlider)
.component('sidebarCart', sidebar)
.component("cart", cart)

// import { profile } from './app/components/profile/profile';



.component('store', store)
.component('storeRestaurants', storeRestaurants)
.component('storeRestaurant', storeRestaurant)
.component('productsCollection',productsCollection)
.component('productsFilter', productsFilter)
.component('productsInfo', productsInfo)
.component('about', about)
.component('contacts', contacts)
.component('terms', terms)

.component('users', users)
.component('login', login)
.component('register', register)

.component('profile', profile)
.component('profileMain', profileMain)
.component('profileAdmin', admin)
.component('restaurantsList',restaurantsList)
.component('restaurantNew', restaurantNew)
.component('restaurantEdit', restaurantEdit)
.component('restaurantItem', restaurantItem)
.component('usersList', usersList)
.component('history', history)
.component('historyItem', historyItem)
.component('historyDetails', historyDetails)
.component('historyFilter', historyFilter)
.component('orderHistory', orderHistory)
.component('orderItem', orderItem)
.component('orderEdit', orderEdit)
.component('categoryNew', categoryNew)
.component('productsItem', productsItem)
.component('productsEdit', productsEdit)
.component('productsNew', productsNew)


.config(restangularConfig)
.config(routesConfig)
.config(['uiMask.ConfigProvider', maskConfig])
.config(['cfpLoadingBarProvider', loadingBarConfig])

.run(runConfig);
