export default restangularConfig;

/** @ngInject */
function restangularConfig(RestangularProvider: Restangular.IProvider, appConfig) {
	RestangularProvider.setBaseUrl(appConfig.apiUrl + 'api/');
	console.log('restangular:', appConfig.apiUrl);
	/*RestangularProvider.setDefaultHeaders({
		Authorization: 'Basic d2ViYXBwOnNlY3JldA=='
	});*/
}
