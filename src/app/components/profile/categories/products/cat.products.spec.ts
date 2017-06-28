import * as angular from 'angular';
import 'angular-mocks';
import {catProducts} from './cat.products';

describe('cat.products component', () => {
  beforeEach(() => {
    angular
      .module('cat.products', ['app/components/profile/categories/products/cat.products.html'])
      .component('cat.products', catProducts);
    angular.mock.module('cat.products');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<cat-products></cat-products>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
