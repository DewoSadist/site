import * as angular from 'angular';
import 'angular-mocks';
import {footer} from './footer';

describe('footer component', () => {
  beforeEach(() => {
    angular
      .module('footer', ['app/components/layout/footer/footer.html'])
      .component('footer', footer);
    angular.mock.module('footer');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<footer></footer>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
