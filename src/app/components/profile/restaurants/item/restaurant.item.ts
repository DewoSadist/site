import {
    IRestaurant, IProductCategory, IShopServices,
    IFormContainer
} from "../../../../services/shopServices/shop.services";
import ErrorService from "../../../../services/errorService/error.service";
class RestaurantItemController implements IFormContainer {
    public errors;
    public isLoading;
    public warning; // string for alert at the top

    public restaurant: IRestaurant;
    public categories: IProductCategory;

    /** @ngInject */
    constructor(public $scope,
                public $state,
                public ShopServices: IShopServices,
                public ErrorService: ErrorService) {

    }

    editLink() {
        this.$state.go('profile.restaurant-edit', {restaurant: this.restaurant});
    }

    deleteCategory(catId: number) {
        this.startLoading();
        this.ShopServices.delCategory(catId)
            .then(() => {
                this.$state.go('profile.main');
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

export const restaurantItem = {
    templateUrl: 'app/components/profile/restaurants/item/restaurant.item.html',
    controller: RestaurantItemController,
    bindings: {
        restaurant: '<',
        categories: '<'
    }
};

