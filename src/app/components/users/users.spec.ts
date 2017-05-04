import * as angular from 'angular';
import 'angular-mocks';
import {users} from './users';

describe('users component', () => {
  beforeEach(() => {
    angular
      .module('users', ['app/components/users/users.html'])
      .component('users', users);
    angular.mock.module('users');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<users></users>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
