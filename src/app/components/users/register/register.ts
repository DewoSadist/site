import {IUsers} from "../users";
import {IFormContainer} from "../../../services/shopServices/shop.services";
import ErrorService from "../../../services/errorService/error.service";
// import '../login.scss';
import AuthService from "../../../services/auth/auth.service";
import Map = google.maps.Map;
import Autocomplete = google.maps.places.Autocomplete;
/**
 * @ngdoc   object
 * @name    RegisterController
 */
class RegisterController implements IUsers, IFormContainer {
    public registerData;
    public errors;
    public isLoading;
    public warning; // string for alert at the top
    public address;
    public place: Autocomplete;
    public address_components;
    longitude: number;
    latitude: number;
    public types;
    public placeChanged;
    public success;
    public city;
    public country;
    public postal_code;

    // static $inject = ['$scope', '$state', '$stateParams', '$filter', 'AuthService', 'ErrorService'];
    /** @ngInject */
    constructor(public $scope, public $rootScope, public $state, public $stateParams, public $filter, public AuthService: AuthService, public ErrorService: ErrorService, public NgMap) {
        this.success = null;
        this.errors = {};
        this.registerData = {
            city : 'Not Defined',
            country : 'Not Defined',
            postal_code : 'Not Defined'
        };
        this.isLoading = false;
        this.registerData.isPasswordShown = false;
        this.registerData.isConfirmShown = false;
        this.city = '';
        this.country = '';
        this.postal_code = '';


        this.placeChanged = function () {
            this.place = this.getPlace();
            this.address_components = this.place.address_components;
            this.address_components.forEach((data) => {
                if (data.types[0] === 'country' || data.types[1] === 'country') {
                    if (data.long_name) {
                        $rootScope.country = data.long_name;
                    }
                }
                if (data.types[0] === 'postal_code' || data.types[1] === 'postal_code') {
                    if (data.long_name) {
                        $rootScope.postal_code = data.long_name;
                    }
                }
                if (data.types[0] === 'locality' || data.types[1] === 'locality') {
                    if (data.long_name) {
                        $rootScope.city = data.long_name;
                    }
                }
            });


            $rootScope.address = {
                name: this.place.vicinity,
                address: this.place.name,
                location: {
                    lat: this.place.geometry.location.lat(),
                    lng: this.place.geometry.location.lng()
                },
                postal: this.postal_code,
                delivery_instructions: 'call me',
                choose: true,
            };

        };

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
     * Output method to toggle password hide/reveal
     */
    togglePasswordShow() {
        this.registerData.isPasswordShown = !this.registerData.isPasswordShown;
    }

    /**
     * Output method to toggle repeated password hide/reveal
     */
    toggleConfirmPasswordShow() {
        this.registerData.isConfirmShown = !this.registerData.isConfirmShown;
    }

    /**
     * Send registration request with passwords and birthday
     */
    registerAction() {
        this.success = null;
        if (this.validateRegisterFields()) {
            let self = this;
            this.startLoading();
            // securityQuestion is converted to Date object by ui-date-picker,
            // so need to convert back to string right before request
            this.prepareData();

            this.AuthService.register(this.registerData)
                .then(() => {
                    self.stopLoading();
                    this.success = 'You successfully registered';
                    // self.$state.go('users.login', {
                    //     email: self.registerData.email,
                    //     operation: 'login'
                    // });
                })
                .catch((error) => {
                    this.stopLoading();
                    if (error.status === 403) {
                    } else if (error.status === 400 && error.data.code === 'illegal_password') {
                        this.errors.form = this.ErrorService.getAuthErrors().passwordWeakError;
                    } else if (error.status === 400 || error.status === 404) {
                        this.errors.form = this.ErrorService.getAuthErrors().loginFailedError;
                    } else if (error.status === 500 && error.data.message.contains('User by this email already registered')) {
                        this.errors.form = this.ErrorService.getAuthErrors().registerAlreadyExistsError;
                    } else {
                        this.errors.form = this.ErrorService.getAuthErrors().registerUnknownError;
                    }
                });
        }
    }

// ------------------------------- Helper functions ----------------------------------

    /**
     * Checks registration fields: password, password length, repeated password match, date format
     * @return {boolean} - Validation output as a boolean
     */
    private validateRegisterFields(): boolean {
        this.errors = {};
        this.errors = this.AuthService.validatePasswordsPair(this.registerData.password, this.registerData.confirmPassword);

        return this.hasNoErrors();
    }

    private prepareData() {
        this.registerData.username = this.registerData.email;
        this.registerData.enabled = 1;
        this.registerData.roles = 'USER';
        this.registerData.address = JSON.stringify(this.$rootScope.address);
        this.registerData.user_id = '';
        this. registerData.city = this.$rootScope.city;
        this.registerData.country = this.$rootScope.country;
        this.registerData.postal_code = this.$rootScope.postal_code;
        console.log(this.registerData)
    }
}

export const register = {
    templateUrl: 'app/components/users/register/register.html',
    controller: RegisterController,
    bindings: {warning: '<'}
};

