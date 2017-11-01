import ErrorService from "../../../../services/errorService/error.service";
import {IShopServices, IProduct} from "../../../../services/shopServices/shop.services";
class CatProductsController {
    public resolve;
    public productsList;
    public product :IProduct;
    public catId;
    public errors;
    public isLoading;
    public isOptionsLoading;
    public warning; // string for alert at the top

    /** @ngInject */
    constructor(public $state,
                public $stateParams,
                public $scope: ng.IScope,
                public ShopServices: IShopServices,
                public ErrorService: ErrorService) {
        this.isLoading = false;
        this.product = {
            title: '',
            img_url: '#',
            price: 0,
            description: '',
            tags: '',
            discount: '',
            cat_id: this.catId
        };
    }
    saveProduct() {
        this.errors = {};
        this.startLoading();
        this.ShopServices.saveOrUpdateProduct(this.product)
            .then((response) => {
                this.stopLoading();
                console.log(response);
                this.product = response;

                // this.$state.go('profile.product-item', {id: this.product.id});
            })
            .then((response)=>{
                this.productsList.push(response);
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
    delete(product) {
        this.ShopServices.delProduct(product.id)
            .then((response) => {
                this.stopLoading();
                let index = this.productsList.indexOf(product);
                this.productsList.splice(index, 1);
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
     * @methodOf ProductsItemController
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
     * @methodOf ProductsItemController
     *
     * @description
     * Start loading state method form IFormContainer interface
     */
    startLoading() {
        this.isLoading = true;
    }

    /**
     * @ngdoc method
     * @name startOptionsLoading
     * @methodOf ProductsItemController
     *
     * @description
     * Start loading state method form IFormContainer interface
     */
    startOptionsLoading() {
        this.isOptionsLoading = true;
    }

    /**
     * @ngdoc method
     * @name stopLoading
     * @methodOf ProductsItemController
     *
     * @description
     * Terminate loading state, IFormContainer interface
     */
    stopLoading() {
        this.isLoading = false;
    }

    /**
     * @ngdoc method
     * @name stopOptionsLoading
     * @methodOf ProductsItemController
     *
     * @description
     * Terminate loading state, IFormContainer interface
     */
    stopOptionsLoading() {
        this.isOptionsLoading = false;
    }

    /**
     * @ngdoc method
     * @name hasNoErrors
     * @methodOf ProductsItemController
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

export const catProducts = {
    templateUrl: 'app/components/profile/categories/products/cat.products.html',
    controller: CatProductsController,
    bindings: {
        productsList: '<',
        catId: '<'
    }
};

