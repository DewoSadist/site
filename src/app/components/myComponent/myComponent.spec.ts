import * as angular from 'angular';
import 'angular-mocks';
import {myComponent} from './myComponent';

describe('myComponent component', () => {
  beforeEach(() => {
    angular
      .module('myComponent', ['app/components/myComponent/myComponent.html'])
      .component('myComponent', myComponent);
    angular.mock.module('myComponent');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<myComponent></myComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
