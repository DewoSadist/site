/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';
import * as moment from 'moment';

// ------------------  Libs & system --------------------
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

import 'jquery-migrate';

import './index.scss';
import '@iamadamjowett/angular-click-outside';

// ------------------  Components --------------------
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

import { sidebar } from './app/components/cart/sidebar/sidebar';
// ------------------  Services --------------------
import ShopServices from './app/services/shopServices/shop.services';
import CartServices from './app/services/cartServices/cart.services';
import TemplatorService from './app/services/templator/templator.service';
import ErrorService from './app/services/errorService/error.service';
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
])
.constant('appConfig', appConfig)
.constant('moment', moment)
.constant('tinycolor', tinycolor)
.constant('highcharts', highcharts)


.service('ShopServices', ShopServices)
.service('CartServices', CartServices)
.service('TemplatorService', TemplatorService)
.service('ErrorService', ErrorService)

.component('header', header)
.component('footer', footer)
.component('home', home)
.component('homeSlider', homeSlider)
.component('sidebarCart', sidebar)


.component('store', store)
.component('storeRestaurants', storeRestaurants)
.component('storeRestaurant', storeRestaurant)
.component('productsCollection',productsCollection)
.component('productsFilter', productsFilter)
.component('productsInfo', productsInfo)

.config(restangularConfig)
.config(routesConfig)
.config(['uiMask.ConfigProvider', maskConfig])
.config(['cfpLoadingBarProvider', loadingBarConfig])

.run(runConfig);
