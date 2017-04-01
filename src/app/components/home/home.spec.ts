/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import {home} from './home';

describe('home component', () => {
  beforeEach(() => {
    angular
      .module('home', ['app/components/home/home.html'])
      .component('home', home);
    angular.mock.module('home');
  });

});
