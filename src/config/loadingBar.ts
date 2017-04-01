/// <reference path="../../typings/index.d.ts" />

export default loadingBarConfig;

/** @ngInject */
function loadingBarConfig(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
}