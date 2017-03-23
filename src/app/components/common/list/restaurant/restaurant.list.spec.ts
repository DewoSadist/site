import * as angular from 'angular';
import 'angular-mocks';
import {restaurantList} from './restaurant.list';

describe('restaurant.list component', () => {
  beforeEach(() => {
    angular
      .module('restaurantList', ['app/components/common/list/restaurant/restaurant.list.html'])
      .component('restaurantList', restaurantList);
    angular.mock.module('restaurantList');
  });


});
