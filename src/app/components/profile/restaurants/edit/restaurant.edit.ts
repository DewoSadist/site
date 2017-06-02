import {IRestaurant, IShopServices, IHour, IFormContainer} from "../../../../services/shopServices/shop.services";
import ErrorService from "../../../../services/errorService/error.service";

class RestaurantEditController implements IFormContainer {
    public loginData;
    public errors;
    public isLoading;
    public warning; // string for alert at the top
    public restaurant: IRestaurant;
    public text: string;

    /** @ngInject */
    constructor(public $state,
                public $stateParams,
                public $scope: ng.IScope,
                public ShopServices: IShopServices,
                public ErrorService: ErrorService) {
        this.errors = {};
        this.loginData = {};
        this.isLoading = false;
        this.text = 'My brand new component!';
    }

    saveRestaurant() {
        this.startLoading();
        this.ShopServices.saveOrUpdateRestaurant(this.restaurant)
            .then((response) => {
                this.stopLoading();
                console.log(response);
                this.restaurant = response;
            })
            .catch((error) => {
                console.log(error);
                this.stopLoading();
                if (error.status === 404) {
                  this.errors = {
                    form: this.ErrorService.getEditError().saveError
                  };
                } else if (error.status === 500) {
                    this.errors = {
                        form: this.ErrorService.getEditError().saveIncorrectValue
                    }
                } else {
                  this.errors = {
                    form: this.ErrorService.getGeneralBadRequestError()
                  };
                }
            });

    }

    removeHour(hour: IHour) {
        let index = this.restaurant.hours.indexOf(hour);
        this.restaurant.hours.splice(index, 1);
    }

    getIndexHour(hour: IHour) {
        let index = this.restaurant.hours.indexOf(hour);
        return index;
    }

    addHour() {
        let obj = {
            day: '',
            open_hour: '00:00:00',
            close_hour: '00:00:00'
        };
        this.restaurant.hours.push(obj);
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
}

export const restaurantEdit = {
    templateUrl: 'app/components/profile/restaurants/edit/restaurant.edit.html',
    controller: RestaurantEditController,
    bindings: {
        restaurant: '<'
    }
};

