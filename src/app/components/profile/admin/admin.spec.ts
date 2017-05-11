import * as angular from 'angular';
import 'angular-mocks';
import {admin} from './admin';

describe('admin component', () => {
  beforeEach(() => {
    angular
      .module('admin', ['app/components/profile/admin/admin.html'])
      .component('admin', admin);
    angular.mock.module('admin');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<admin></admin>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
