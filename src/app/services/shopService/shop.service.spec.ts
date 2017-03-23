import * as angular from 'angular';
import 'angular-mocks';
import ShopService from './shop.service';

describe('ShopService component', () => {
  beforeEach(() => {
    angular
      .module('ShopService' ['restangular'])
      .component('ShopService', ShopService);
    angular.mock.module('ShopService');
  });

  it('should have getUser function', angular.mock.inject((ShopService: ShopService) => {
    expect(ShopService.getAllRestaurants).toBeDefined();
  }));
});
