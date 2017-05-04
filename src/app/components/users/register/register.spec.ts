import * as angular from 'angular';
import 'angular-mocks';
import {register} from './register';

describe('register component', () => {
  beforeEach(() => {
    angular
      .module('register', ['app/components/users/register/register.html'])
      .component('register', register);
    angular.mock.module('register');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<register></register>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
