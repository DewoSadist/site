import {
    IProductCategory, IShopServices, IFormContainer,
    IRestaurant
} from "../../../../services/shopServices/shop.services";
import UserService from "../../../../services/userService/user.service";
import ErrorService from "../../../../services/errorService/error.service";
class CategoryNewController implements IFormContainer {
    public errors;
    public isLoading;
    public warning; // string for alert at the top

    public category: IProductCategory;
    public restaurants: Array<IRestaurant>;
    public selectedRestaurantName;
    public imgCategoriesSelected;
    public imgCategories;


    constructor(public $state,
                public $stateParams,
                public $scope: ng.IScope,
                public ShopServices: IShopServices,
                public ErrorService: ErrorService,
                public UserService: UserService) {
        this.errors = {};
        this.category = {
            name: null,
            res_id: 0,
            tags: null
        };
        this.selectedRestaurantName = 'Choose Restaurant';
        this.imgCategoriesSelected = 'Choose Category';
        this.ShopServices.getUserRestaurants(this.UserService.user.user_id)
            .then((list) => {
                this.restaurants = list;
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

    selectRestaurant(restaurant) {
        this.category.res_id = restaurant.id;
        this.selectedRestaurantName = restaurant.title;
    }

    selectCategory(data) {
        this.imgCategoriesSelected = data.name;
        this.category.name = data.name;
        this.category.tags = data.value;
    }
    saveCategory(){
        this.validateForm();
        this.startLoading();
        this.ShopServices.saveOrUpdateCategory(this.category)
            .then((response) => {
                this.stopLoading();
                console.log(response);
                this.$state.go('profile.restaurant',{id:response.res_id});
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

        console.log(this.category);
    }
    private validateForm() {
        if (this.category.name == null) {
            this.errors = {
                form: this.ErrorService.getEditError().saveIncorrectValue
            }
        }
        if (this.category.tags == null) {
            this.errors = {
                form: this.ErrorService.getEditError().saveIncorrectValue
            }
        }
        if (this.category.res_id == 0){
            this.errors = {
                form: this.ErrorService.getEditError().saveIncorrectValue
            }
        }
        return this.hasNoErrors();
    }
}

export const categoryNew = {
    templateUrl: 'app/components/profile/categories/new/category.new.html',
    controller: CategoryNewController,
    bindings: {
        imgCategories: '<'
    }
};

