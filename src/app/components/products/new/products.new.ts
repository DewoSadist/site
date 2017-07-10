import {IFormContainer, IProduct} from "../../../services/shopServices/shop.services";
import {IShopServices} from "../../../services/shopServices/shop.services";
import ErrorService from "../../../services/errorService/error.service";
class ProductsNewController implements IFormContainer {
    public cid;
    public product :IProduct;
    public productOptions;
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
        this.product = {
            title: '',
            img_url: '#',
            price: 0,
            description: '',
            tags: '',
            discount: '',
            cat_id: this.cid
        };
        this.isLoading = false;
        this.isOptionsLoading = false;
    }

    /**
     * @ngdoc method
     * @name addOption
     * @methodOf addOption
     *
     * @description
     * add new option to product options
     */
    addOption(){
        let obj = {
            name: '',
            isRequired: 0,
            isFree: 0,
            isOne: 0,
            prod_id: this.product.id,
            productOptionsItems:[]
        };
        this.productOptions.push(obj);
    }

    /**
     * @ngdoc method
     * @name removeOption
     * @methodOf ProductsItemController
     *
     * @description
     * remove selected option
     */
    removeOption(index) {
        // let index = this.productOptions.indexOf(option);
        this.productOptions.splice(index,1);
    }

    /**
     * @ngdoc method
     * @name addOptionItem
     * @methodOf addOptionItem
     *
     * @description
     * get add new option to product options
     */
    addOptionItem(index) {
        let obj = {
            name: '',
            price: ''
        };
        this.productOptions[index].productOptionsItems.push(obj)

    }

    /**
     * @ngdoc method
     * @name removeOptionItem
     * @methodOf ProductsItemController
     *
     * @description
     * remove selected optionItem
     */
    removeOptionItem(index, productOption) {
        let pindex = this.productOptions.indexOf(productOption);
        console.log(index, pindex);
        this.productOptions[pindex].productOptionsItems.splice(index, 1);
    }
    saveProduct() {
        this.errors = {};
        this.startLoading();
        this.ShopServices.saveOrUpdateProduct(this.product)
            .then((response) => {
                this.stopLoading();
                console.log(response);
                this.product = response;
                this.$state.go('profile.product-item', {id: this.product.id});
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

    saveProductOptions(){
        this.startOptionsLoading();
        this.ShopServices.saveOrUpdateProductOptions(this.productOptions)
            .then((response) => {
                this.stopOptionsLoading();
                console.log(response);
                this.productOptions = response;
            })
            .catch((error) => {
                console.log(error);
                this.stopOptionsLoading();
                if (error.status === 404) {
                    this.errors = {
                        form2: this.ErrorService.getEditError().saveError
                    };
                } else if (error.status === 500) {
                    this.errors = {
                        form2: this.ErrorService.getEditError().saveIncorrectValue
                    }
                } else {
                    this.errors = {
                        form2: this.ErrorService.getGeneralBadRequestError()
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

export const productsNew = {
    templateUrl: 'app/components/products/new/products.new.html',
    controller: ProductsNewController,
    bindings: {
        cid: '<'
    }

};

