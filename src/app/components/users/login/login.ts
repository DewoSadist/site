import {IUsers} from "../users";
import {IFormContainer} from "../../../services/shopServices/shop.services";
import ErrorService from "../../../services/errorService/error.service";
import '../users.scss';
import AuthService from "../../../services/auth/auth.service";
/**
 * @ngdoc   object
 * @name    LoginController
 */
class LoginController implements IUsers, IFormContainer {
    public loginData;
    public errors;
    public isLoading;
    public warning; // string for alert at the top

    /** @ngInject */
    constructor(public $scope,
                public $state,
                public $stateParams,
                public ErrorService: ErrorService,
                public AuthService: AuthService) {
        this.errors = {};
        this.loginData = {};
        this.isLoading = false;
        this.loginData.isPasswordShown = false;
    }

    /**
     * @ngdoc method
     * @name resetErrors
     * @methodOf LoginController
     *
     * @description
     * resets the errors object method from IFormContainer interface
     */
    resetErrors() {
        this.$scope.$apply(() => {
            this.errors = {};
            this.warning = null;
        });
    }

    /**
     * @ngdoc method
     * @name startLoading
     * @methodOf LoginController
     *
     * @description
     * Start loading state method form IFormContainer interface
     */
    startLoading() {
        this.isLoading = true;
    }

    /**
     * @ngdoc method
     * @name stopLoading
     * @methodOf LoginController
     *
     * @description
     * Terminate loading state, IFormContainer interface
     */
    stopLoading() {
        this.isLoading = false;
    }

    /**
     * @ngdoc method
     * @name hasNoErrors
     * @methodOf LoginController
     *
     * @description
     * Return true if no errors present in Form, IFormContainer interface
     *
     * @return {boolean} Return true if no errors present in Form
     */
    hasNoErrors(): boolean {
        return Object.keys(this.errors).length === 0;
    }

    /**
     * @ngdoc method
     * @name togglePasswordShow
     * @methodOf LoginController
     *
     * @description
     * Output method to toggle password hide/reveal
     */
    togglePasswordShow() {
        this.loginData.isPasswordShown = !this.loginData.isPasswordShown;
    }

    /**
     * @ngdoc method
     * @name loginAction
     * @methodOf LoginController
     *
     * @description
     * Send Login action to API and redirect to profile after success
     */
    loginAction() {
        this.warning = null;
        if (!this.loginData.email) {
            this.errors = {
                input: this.ErrorService.getAuthErrors().emailEmptyError
            };
        } else if (!this.loginData.password) {
            this.errors = {
                password: this.ErrorService.getPasswordErrors().passwordEmptyError
            };
        } else {
            let self = this;
            let params = {
                username: this.loginData.email,
                password: this.loginData.password
            };
            this.startLoading();
            this.AuthService.login(params)
                .then((response) => {
                    this.stopLoading();
                    this.$state.go('home');
                })
                .catch((error) => {
                    this.stopLoading();
                    console.log("-----------",error.status);
                    switch (error.status) {
                        case 403:
                            if (error.data.code === '') {
                                this.errors = {
                                    form: this.ErrorService.getAuthErrors().loginDeniedError,
                                };
                            }
                            else {
                                this.errors = {
                                    form: this.ErrorService.getAuthErrors().loginLockedError,
                                };
                            }
                            break;
                        case 400:
                        case 401:
                        case 404:
                            this.errors = {
                                form: this.ErrorService.getAuthErrors().loginFailedError,
                            };
                            break;
                        default:
                            this.errors = {
                                form: this.ErrorService.getAuthErrors().emailFailedError,
                            };
                            break;
                    }
                });

        }
    }
}


export const login = {
    templateUrl: 'app/components/users/login/login.html',
    controller: LoginController,
    bindings: {warning: '<'}
};

