import * as angular from 'angular';
import 'angular-mocks';
import {courier} from './courier';

describe('courier component', () => {
  beforeEach(() => {
    angular
      .module('courier', ['app/components/pages/courier/courier.html'])
      .component('courier', courier);
    angular.mock.module('courier');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<courier></courier>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
