/// <reference path="../../typings/index.d.ts" />
// import AuthService from '../app/services/auth/auth.service';
// import UserService from '../app/services/userService/user.service';
// import ErrorService from '../app/services/errorService/error.service';

import CartServices from "../app/services/cartServices/cart.services";
import AuthService from "../app/services/auth/auth.service";
import ErrorService from "../app/services/errorService/error.service";
export default runConfig;

/** @ngInject */
function runConfig($cookies: ng.cookies.ICookiesService,
                   $rootScope,
                   $state: angular.ui.IStateService,
                   $q: ng.IQService,
                   $http: ng.IHttpService,
                   Restangular: restangular.IService,
                   AuthService: AuthService,
                   // UserService: UserService,
                   ErrorService: ErrorService,
				   CartServices: CartServices,
                   appConfig) {

	function endSession() {
		AuthService.logoutEventBroadcast();
		$state.go('users.login', { warning: ErrorService.getAuthErrors().sessionExpiredError });
	}

	/**
	 * @ngdoc       function
	 * @name        refreshAccessToken
	 *
	 * @description
	 * Requests new user access token from API, writes it to cookies and initiates session
	 *
	 * @return {IPromise}    Request promise
	 */
	function refreshAccessToken() {
		AuthService.setBasicHeader();
		return AuthService.requestBearerToken();
	}

	/**
	 * @description
	 * Global HTTP interceptor for 401 error for refreshing access token from API.
	 * If request came with HTTP 401 and 'invalid_token' text and user token was present, go to LOGIN.
	 * Otherwise that means user was not previously logged in and this is a general request token problem, repeat the request
	 */
	Restangular.setErrorInterceptor((response: any, deferred: ng.IDeferred<any>, responseHandler: any) => {
		// todo: do not refresh requests from AuthService.getUser. If 401 came back, then 401 it is, no need to resend.
		// if (response.status === 401 && response.data.error === 'invalid_token') {
		if (response.status === 401) {
			// let userTokenCookie = $cookies.get('user_token'); // private user token obtained after login
			// let userIdCookie = $cookies.get('user_id'); // User GUID from Kazkom
			// if (!userTokenCookie && !userIdCookie) {
				refreshAccessToken().then(
					(data: any) => {
						response.config.headers.Authorization = 'Bearer ' + data.access_token;
						$http(response.config).then(responseHandler, deferred.reject);
					});
			// } else {
			// 	endSession();
			// }
			return false;
		}
		return true;
	});

	/**
	 * @description
	 * State change interceptor which will take care of situation, when authorized user is accessing
	 * public pages, like login, register, restore or home page
	 */
	$rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		console.log('going: ' + fromState.name + '  -->  ' + toState.name);
		// var isLoggedUserAccessPublicState = UserService.isAuthorized() && (
		// 	toState.name === 'home' ||
		// 	toState.name === 'users.login' ||
		// 	toState.name === 'users.register' ||
		// 	toState.name === 'users.restore'
		// 	);
		// if(isLoggedUserAccessPublicState){
		// 	e.preventDefault(); // stop current execution
		// 	$state.go('profile.main'); // go to login
		// }
	});

	// Always scroll to top during state change
	// and close the dropdowns
	$rootScope.$on('$stateChangeSuccess', function () {
		$('html,body').animate({scrollTop: 0}, 400);
      	$('body').removeClass('no-scroll');
		$('.collapse').collapse('hide');
	});

	/**
	 * @description
	 * Redirects to defined state if redirectTo param exists
	 */
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
      if (toState.redirectTo) {
        event.preventDefault();
        $state.go(toState.redirectTo, toParams)
      }
      $state.previous = fromState;
    });
}
