/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import TemplatorService from './templator.service';

describe('Templator.service service', () => {
  beforeEach(() => {
    angular
      .module('TemplatorService', [])
      .service('TemplatorService', TemplatorService);
    angular.mock.module('TemplatorService');
  });

  it('should', angular.mock.inject((TemplatorService: TemplatorService) => {
    expect(TemplatorService.getVisualsForPayment('mobile')).not.toEqual(3);
  }));
});
