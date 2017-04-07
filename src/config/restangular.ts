/// <reference path="../../typings/index.d.ts" />
export default restangularConfig;

/** @ngInject */
function restangularConfig(RestangularProvider: restangular.IProvider, appConfig) {
	RestangularProvider.setBaseUrl(appConfig.apiUrl + 'api/');
	RestangularProvider.setDefaultHeaders({
		/*Authorization: 'Basic d2ViYXBwOnNlY3JldA=='*/
	});
}