import {IUsers} from "../users";
import {IFormContainer} from "../../../services/shopServices/shop.services";
import ErrorService from "../../../services/errorService/error.service";
// import '../login.scss';
import AuthService from "../../../services/auth/auth.service";
/**
 * @ngdoc   object
 * @name    RegisterController
 */
class RegisterController implements IUsers, IFormContainer {
    public registerData;
    public errors;
    public isLoading;
    public warning; // string for alert at the top

    constructor(public $scope,
                public $state,
                public $stateParams,
                public ErrorService: ErrorService,
                public AuthService: AuthService) {
        this.errors = {};
        this.registerData = {};
        this.isLoading = false;
        this.registerData.isPasswordShown = false;
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
        this.registerData.isPasswordShown = !this.registerData.isPasswordShown;
    }

}

export const register = {
    templateUrl: 'app/components/users/register/register.html',
    controller: RegisterController,
    bindings: {warning: '<'}
};

