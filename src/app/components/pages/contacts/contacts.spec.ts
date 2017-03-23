import * as angular from 'angular';
import 'angular-mocks';
import {contacts} from './contacts';

describe('contacts component', () => {
  beforeEach(() => {
    angular
      .module('contacts', ['app/components/pages/contacts/contacts.html'])
      .component('contacts', contacts);
    angular.mock.module('contacts');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<contacts></contacts>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
