import {IRestaurant, IShopServices, IHour, IFormContainer} from "../../../../services/shopServices/shop.services";
import ErrorService from "../../../../services/errorService/error.service";

class RestaurantEditController implements IFormContainer {
    public loginData;
    public errors;
    public isLoading;
    public warning; // string for alert at the top
    public restaurant: IRestaurant;
    public text: string;
    public logo_image;

    /** @ngInject */
    constructor(public $state,
                public $stateParams,
                public $scope,
                public ShopServices: IShopServices,
                public ErrorService: ErrorService) {
        this.errors = {};
        this.loginData = {};
        this.isLoading = false;
        this.text = 'My brand new component!';

        $scope.onLoad = (e, reader, file, fileList, fileOjects, fileObj) =>{
            // alert('this is handler for file reader onload event!');
        };

        $scope.errorHandler = (event, reader, file, fileList, fileObjs, object) => {
            console.log("An error occurred while reading file: "+file.name);
            reader.abort();
        };

    }

    saveRestaurant() {
        // patt['name'] = /^[a-z ,-]+$/i;
        // patt['username'] = /^[A-z0-9_-]+$/i;
        // patt['email'] = /^[a-z0-9]+(?:[\.-]?[a-z0-9]+)*@[a-z0-9]+([-]?[a-z0-9]+)*[\.-]?[a-z0-9]+([-]?[a-z0-9]+)*([\.-]?[a-z]{2,})*(\.[a-z]{2,5})+$/i;
        // patt['website'] = /^http(s)?:\/\/(www\.)?[a-z0-9]+([-]?[a-z0-9]+)*[\.-]?[a-z0-9]+([-]?[a-z0-9]+)*([\.-]?[a-z]{2,})*(\.[a-z]{2,5})+$/i;
        // patt['age'] = /^(?:([1][3-9]|[2-9][0-9]))$/i;
        // patt['subject'] = /[a-z0-9?!:;'&_\. ,-]+/i;
        this.errors = {};
        this.startLoading();
        if(this.restaurant.logo_image_url && this.restaurant.logo_image_url.length>1){
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
        } else {
            if(this.logo_image.filesize < 2000000 && this.logo_image.filetype === 'image/png' && !this.logo_image.filename.match('/^[A-z0-9_-]+$/i')){
                this.restaurant.logo_image = this.logo_image.base64;
                this.restaurant.logo_image_url = this.logo_image.filename;
                console.log(this.restaurant);
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

            } else {
                this.errors = {
                    form: this.ErrorService.getEditError().saveIncorrectValue
                }
            }
        }


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

