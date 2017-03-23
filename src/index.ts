
import * as angular from 'angular';

// ------------------  Libs & system --------------------
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-cookies';
import 'restangular-umd';

import './index.scss';

// ------------------  Components --------------------
import { about } from './app/components/pages/about/about';
import { contacts } from './app/components/pages/contacts/contacts';
import { header } from './app/components/layout/header/header';
import { footer } from './app/components/layout/footer/footer';
import { home } from './app/components/home/home';

import { restaurantList } from './app/components/common/list/restaurant/restaurant.list';
// ------------------  Services --------------------
import ShopService from './app/services/shopService/shop.service';
// ------------------ General ---------------------
import routesConfig from './config/routes';
import restangularConfig from './config/restangular';



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
        if (callback) {
          callback(data);
        }
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
  // bootstrapping an angular app without the need for ng-app or ng-controller
  // you should not use the ng-app directive when manually bootstrapping your app
  angular.bootstrap(document.getElementsByTagName('BODY')[0], ['app']);
});

const appConfig = variables;

angular.module('app', [
    'ui.router',
    'ngCookies',
    'restangular',
    'ui.bootstrap'
])
  .constant('appConfig', appConfig)

  .service('ShopService', ShopService)

  .component('header', header)
  .component('footer', footer)
  .component('home', home)
  .component('restaurantList', restaurantList)
  .component('about', about)
  .component('contacts', contacts)

  .config(restangularConfig)
  .config(routesConfig);

