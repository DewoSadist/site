import * as angular from 'angular';
import 'angular-mocks';
import {profile} from './profile';

describe('profile component', () => {
  beforeEach(() => {
    angular
      .module('profile', ['app/components/profile/profile/profile.html'])
      .component('profile', profile);
    angular.mock.module('profile');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<profile></profile>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
