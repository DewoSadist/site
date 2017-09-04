import {IFormContainer, IRestaurant, IShopServices, IHour} from "../../../../services/shopServices/shop.services";
import ErrorService from "../../../../services/errorService/error.service";
import UserService from "../../../../services/userService/user.service";

class RestaurantNewController implements IFormContainer {
    public errors;
    public isLoading;
    public warning; // string for alert at the top
    public restaurant: IRestaurant;

    /** @ngInject */
    constructor(public $state,
                public $stateParams,
                public $scope: ng.IScope,
                public ShopServices: IShopServices,
                public ErrorService: ErrorService,
                public UserService: UserService
    ) {
        this.restaurant = {
            title: "",
            slug: "",
            tags: "",
            description: "#",
            logo_image_url: "#",
            header_image_url: "#",
            cover_image_url: "",
            status: "OPEN",
            country: "",
            city: "",
            address: "",
            location: '{"lat":0,"lng":0}',
            fax: "",
            phone: "",
            postal_code: "",
            open_id: "",
            ratings: 0,
            user_id: this.UserService.user.user_id,
            hours: [
                {
                    day: "EVERYDAY",
                    open_hour: "11:00:00",
                    close_hour: "19:00:00"
                }
            ],
            tax: 0,
            delivery: 0,
            service_fee: 0,
            small_order_fee: 0,
            partner: 0

            };
    }

    saveRestaurant() {
        this.startLoading();
        this.ShopServices.saveOrUpdateRestaurant(this.restaurant)
            .then((response) => {
                this.stopLoading();
                console.log(response);
                this.$state.go('profile.restaurant',{id:response.id});
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

}

export const restaurantNew = {
    templateUrl: 'app/components/profile/restaurants/new/restaurant.new.html',
    controller: RestaurantNewController
};

