/// <reference path="../../../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import {header} from './header';

describe('header component', () => {
	beforeEach(() => {
		angular
			.module('header', ['app/components/layout/header/header.html'])
			.component('header', header);
		angular.mock.module('header');
	});

	it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
		// const element = $compile('<header></header>')($rootScope);
		// $rootScope.$digest();
		// expect(element).not.toBeNull();
	}));
});
