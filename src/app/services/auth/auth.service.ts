/// <reference path="../../../../typings/index.d.ts" />
import ErrorService from "../errorService/error.service";
import UserService from "../userService/user.service";

/**
 * @ngdoc object
 * @name AuthService
 *
 * @description
 * Service for all authentication related operations,both local and API requests
 *
 */
class AuthService {
    public authorized: boolean;
    public minPasswordSize: number = 8;

    /** @ngInject */
    constructor(public $cookies: ng.cookies.ICookiesService,
                public $rootScope,
                public $q,
                public Restangular: any,
                public ErrorService: ErrorService,
                public UserService: UserService,
                public appConfig) {
        this.authorized = false;
    }

    // ------------------------------ Basic auth Actions -----------------------------
    initiateUser() {
        console.log("initiateUser");
        let deferred = this.$q.defer();
        var accessToken = this.$cookies.get('access_token'); // general access token from API
        var userId = this.$cookies.get('user_id');
        if(userId) {
            this.UserService.getUser(userId)
            .then(
                (userObject) => {
                    this.loginEventBroadcast();
                    deferred.resolve(userObject);
                })
            .catch((error) => {
               deferred.resolve(null);
            });
        // } else {
        //     deferred.resolve(null);
        }
        else if (accessToken) {
            console.log("InitiateUser yes access token");
            this.setBearerHeader(accessToken);
            deferred.resolve(null);
        } else {
            console.log("InitiateUser no access token");
            this.setBasicHeader();
            this.requestBearerToken()
            .then(() => {
                deferred.resolve(null);
            });
        }
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @methodOf AuthService
     * @name AuthService.isAuthorized
     *
     * @description
     * Checks if user has been authorized to access private sections
     * @return {boolean} Result as boolean value
     */
    public isAuthorized() {
        return this.authorized === true;
    }

    /**
     * @ngdoc method
     * @methodOf AuthService
     * @name AuthService.requestBearerToken
     *
     * @description
     * Sends request to API to retrieve new access_token, writes it to headers and cookies storage
     * @return {IPromise<T>} Request promise
     */
    public requestBearerToken() {
        console.log("RequestBearerToken");
        let deferred = this.$q.defer();
        let self = this;
        this.Restangular
            .setDefaultHeaders({Authorization:  "Basic "+this.getBasicToken()})
            .withConfig(
            (RestangularConfigurer) => {
                RestangularConfigurer.setBaseUrl(this.appConfig.apiUrl + '/oauth/');
            }).all('token?grant_type=client_credentials&scope=read').post({Authorization: "Basic " + this.getBasicToken()})
        .then((tokenObject) => {
            console.log("tokenObject:", tokenObject);
            self.writeTokenToCookies(tokenObject);
            self.setBearerHeader(tokenObject.access_token);
            deferred.resolve(tokenObject);
        })
        .catch((error) => {
            console.log(error);
            deferred.reject(error);
        });
        return deferred.promise;
    }

    /**
     * @ngdoc       method
     * @name        AuthService.setBearerHeader
     * @methodOf    AuthService
     *
     * @description
     * Set a Bearer token into HTTP headers
     * @param {string} token Bearer token
     */
    setBearerHeader(token) {
        this.Restangular.setDefaultHeaders({
            Authorization: 'Bearer ' + token
        });
    }

    /**
     * Set basic Bearer token to HTTP headers
     */
    setBasicHeader() {
        this.Restangular.setDefaultHeaders({
            Authorization: 'Basic ' + this.getBasicToken()
        });
    }

    /**
     * @ngdoc       method
     * @name        AuthService.getBasicToken
     * @methodOf    AuthService
     *
     * @description
     * Retrieves basic bearer token for all API requests
     * @return {string} - Token string
     */
    getBasicToken() {
        return btoa("deos:deossecret");
    }

    // ------------------------------- User profile Actions ----------------------------------------
    /**
     * @ngdoc       method
     * @name        AuthService.login
     * @methodOf    AuthService
     * @public
     *
     * @description
     * Sends a login request to API and stores response data in cookies
     *
     * @param   {string}    data Request body with login data
     * @return  {IPromise}  Request promise
     */
    login(data) {
        let deferred = this.$q.defer();
        this.Restangular.withConfig(
            (RestangularConfigurer) => {
                RestangularConfigurer.setBaseUrl(this.appConfig.apiUrl + '/api/');
            })
            .all('/users/login')
            .withHttpConfig({ignoreLoadingBar: true})
            .post(data)
            .then((response) => {
                console.log("auth response:",response.toString());
                this.UserService.user = response.user;
                this.setBearerHeader(response.access_token);
                this.writeUserToCookies(response);
                this.loginEventBroadcast();
                deferred.resolve(response);
            })
            .catch((error) => {
                console.log("auth error:", error);
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /**
     * Broadcasts login event for all listeners using $broadcast
     */
    loginEventBroadcast() {
        this.setAuthorized(true);
        this.$rootScope.$broadcast('LoginEvent');
    }

    /**
     * @ngdoc       method
     * @name        AuthService.logout
     * @methodOf    AuthService
     *
     * @description
     * Logs out user with API request
     *
     * @return {IPromise} Request promise
     */
    logout() {
        let deferred = this.$q.defer();
        this.Restangular.withConfig(
            (RestangularConfigurer) => {
                RestangularConfigurer.setBaseUrl(this.appConfig.apiUrl + '/oauth/');
            }).all('/users/logout').post()
        .then((response) => {
                this.logoutEventBroadcast();
                deferred.resolve();
            },
            (error)=> {
                this.logoutEventBroadcast();
                deferred.resolve();
            });
        return deferred.promise;
    }

    /**
     * @ngdoc       method
     * @name        AuthService.logoutEventBroadcast
     * @methodOf    AuthService
     *
     * @description
     * Cleans up cookies, switches to general access_token and broadcasts logout event for all listeners using $broadcast
     */
    logoutEventBroadcast() {
        this.setAuthorized(false);
        // this.$cookies.remove('user_token');
        this.$cookies.remove('user_id');
        this.UserService.flushUser();
        let accessToken = this.$cookies.get('access_token');
        if (accessToken && accessToken.length) {
            this.setBearerHeader(accessToken);
        } else {
            this.setBasicHeader();
        }
        this.$rootScope.$broadcast('LogoutEvent');

    }

    /**
     * @ngdoc       method
     * @name        AuthService.validateDate
     * @methodOf    AuthService
     *
     * @description
     * Validates the date and returns boolean validation value
     *
     * @param   {string}    date    Date object or string
     * @return  {boolean}   Validation output as boolean
     */
    validateDate(date) {
        return date && date.length > 0;
    }

    /**
     * @ngdoc       method
     * @name        AuthService.validatePassword
     * @methodOf    AuthService
     *
     * @description
     * Validates the password for length and containing required characters
     *
     * @param {string}  password         Password value
     * @return {Object} Validation output as object if errors are found
     */
    validatePassword(password: string) {
        let errors = {};
        let passwordIsLong = password && password.length >= this.minPasswordSize;
        let passwordIsValid = password && password.match((/^(?=.*\d)(?=.*[а-яa-z])(?=.*[А-ЯA-Z])[0-9а-яa-zА-ЯA-Z~`!@#$%^&*()-+_=\{\[\}\];:''"\|<,>.?/]{0,}$/g));
        if (!passwordIsLong) {
            errors['passwordShort'] = true;
        }
        if (!passwordIsValid) {
            errors['passwordInvalid'] = true;
        }
        return errors;
    }

    /**
     * @ngdoc       method
     * @name        AuthService.validatePasswordsPair
     * @methodOf    AuthService
     *
     * @description
     * Validates the password and confirm password matching
     *
     * @param {string}  password            Password value
     * @param {string}  confirmPassword     Confirm password value
     * @return {Object} Validation output as object if errors are found
     */
    validatePasswordsPair(password: string, confirmPassword: string) {
        let errors = {};
        errors = this.validatePassword(password);
        let passwordsEqual = (password == confirmPassword);
        // no need to show any confirmPassword field error, if password field is not valid
        if (!errors['passwordShort'] && !errors['passwordInvalid'] && !passwordsEqual) {
            errors['confirmPassword'] = this.ErrorService.getPasswordErrors().passwordNotMatchError;
        }
        return errors;
    }

    // ---------------------------------- Helper functions  ----------------------------------

    /**
     * @ngdoc       function
     * @name        AuthService.writeUserToCookies
     * @methodOf    AuthService
     * @function
     * @private
     *
     * @description
     * Stores User ID and user token into cookie storage
     *
     * @param {Object}  data    Data from token request
     */
    private writeUserToCookies(data) {
        var expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + data.expires_in);
        this.$cookies.put('user_id', data.user.user_id, {
        	expires: expireDate
        });
        this.$cookies.put('user_id', data.user.user_id);
        // this.$cookies.put('user_token', data.access_token);
    }

    /**
     * @ngdoc       function
     * @name        AuthService.writeTokenToCookies
     * @methodOf    AuthService
     * @function
     * @private
     *
     * Stores phone number into cookie storage
     * @param {string}  data    Data from token request
     */
    private writeTokenToCookies(data) {
        var expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + data.expires_in);
        this.$cookies.put('access_token', data.access_token);
    }

    /**
     * Modifies authorized global field
     * @param value {boolean} - New boolean value
     */
    private setAuthorized(value) {
        this.authorized = value;
    }

}

export default AuthService;
