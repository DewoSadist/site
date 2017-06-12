import ErrorService from "../../../services/errorService/error.service";
import {IFormContainer} from "../../../services/shopServices/shop.services";

class ContactsController implements IFormContainer{
    public contactData;
    public errors;
    public isLoading;
    public warning; // string for alert at the top

    /** @ngInject */
    constructor(public $scope,
                public $state,
                public $stateParams,
                public ErrorService: ErrorService) {
        this.contactData = {};
        this.errors = {};
        this.isLoading = false;
    }
    /**
     * @ngdoc method
     * @name resetErrors
     * @methodOf ContactsController
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
     * @methodOf ContactsController
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
     * @methodOf ContactsController
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
     * @methodOf ContactsController
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
     * @name sendAction
     * @methodOf ContactsController
     *
     * @description
     * Send Login action to API and redirect to profile after success
     */
    sendAction(){
        this.warning = null;
        if (!this.contactData.name) {
            this.errors = {
                name: this.ErrorService.getAuthErrors().nameEmptyError
            };
        } else if (!this.contactData.email) {
            this.errors = {
                email: this.ErrorService.getAuthErrors().emailEmptyError
            };
        } else if (!this.contactData.number) {
            this.errors = {
                number: this.ErrorService.getAuthErrors().numberEmptyError
            };
        } else if (!this.contactData.name) {
            this.errors = {
                text: this.ErrorService.getAuthErrors().textEmptyError
            };
        } else {
            let self = this;
            let params = {
                name: this.contactData.name,
                email: this.contactData.email,
                number: this.contactData.number,
                text: this.contactData.text
            };
            this.startLoading();
            // this.AuthService.login(params)
            //     .then((response) => {
            //         this.stopLoading();
            //         this.$state.go('profile.main');
            //     })
            //     .catch((error) => {
            //         this.stopLoading();
            //         console.log("-----------",error.status);
            //         switch (error.status) {
            //             case 403:
            //                 if (error.data.code === '') {
            //                     this.errors = {
            //                         form: this.ErrorService.getAuthErrors().loginDeniedError,
            //                     };
            //                 }
            //                 else {
            //                     this.errors = {
            //                         form: this.ErrorService.getAuthErrors().loginLockedError,
            //                     };
            //                 }
            //                 break;
            //             case 400:
            //             case 401:
            //             case 404:
            //                 this.errors = {
            //                     form: this.ErrorService.getAuthErrors().loginFailedError,
            //                 };
            //                 break;
            //             default:
            //                 this.errors = {
            //                     form: this.ErrorService.getAuthErrors().emailFailedError,
            //                 };
            //                 break;
            //         }
            //     });


        }
    }
}

export const contacts = {
    templateUrl: 'app/components/pages/contacts/contacts.html',
    controller: ContactsController,
    bindings: {warning: '<'}
};

