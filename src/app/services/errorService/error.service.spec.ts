/// <reference path="../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import ErrorService from './error.service';
import TemplatorService from '../templator/templator.service';

describe('ErrorService service', () => {
	beforeEach(() => {
		angular
		.module('ErrorService', [])
		.service('ErrorService', ErrorService)
		.service('TemplatorService', TemplatorService);
		angular.mock.module('ErrorService');
	});

	it('should pass Dummy test', angular.mock.inject((ErrorService: ErrorService) => {
		expect(ErrorService.getData()).toEqual(3);
	}));

	it('should pass simple Null test', angular.mock.inject((ErrorService: ErrorService) => {
		expect(ErrorService).not.toBeNull();
	}));
});
