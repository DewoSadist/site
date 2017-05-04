import * as angular from 'angular';
import 'angular-mocks';
import {main} from './main';

describe('main component', () => {
  beforeEach(() => {
    angular
      .module('main', ['app/components/profile/main/main.html'])
      .component('main', main);
    angular.mock.module('main');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<main></main>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
