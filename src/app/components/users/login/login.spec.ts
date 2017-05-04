import * as angular from 'angular';
import 'angular-mocks';
import {login} from './login';

describe('login component', () => {
  beforeEach(() => {
    angular
      .module('login', ['app/components/users/login/login.html'])
      .component('login', login);
    angular.mock.module('login');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<login></login>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
