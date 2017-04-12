import './products.info.scss';
import {
    IProduct, default as ShopServices, IShopServices,
    IProductOption, IFormContainer
} from "../../../services/shopServices/shop.services";
import {ICartServices} from "../../../services/cartServices/cart.services";
import ErrorService from "../../../services/errorService/error.service";

/**
 * @ngdoc   object
 * @name    ProductsInfoController
 */
class ProductsInfoController implements IFormContainer {
    /**
     * @ngdoc       property
     * @name        ProductsInfoController#errors
     * @propertyOf  ProductsInfoController
     * @returns     {ICard}    Errors object bound to errors on UI, from IFormContainer
     */
    public errors;
    public additional: string;
    /**
     * @ngdoc       property
     * @name        ProductsInfoController#isLoading
     * @propertyOf  ProductsInfoController
     * @returns     {boolean}    Loading indicator, from IFormContainer interface
     */
    public isLoading: boolean;
    public product: IProduct;
    public productOptions: Array<IProductOption>;
    public close;
    public quantity: number;
    public amount;
    public resolve;
    public order;
    public item;
    public itemOptions: Array<any>;

    /** @ngInject */
    constructor(public $scope,
                public ShopServices: IShopServices,
                public CartServices: ICartServices,
                public ErrorService: ErrorService) {
        this.errors = {};

        this.isLoading = true;
        this.product = this.resolve.product;
        this.quantity = 1;
        this.amount = this.product.price + this.getOptionsPrice();
        this.itemOptions = [];

        ShopServices.getProductOptions(this.product.id)
            .then((object) => {
                this.productOptions = object;
                this.isLoading = false;
            });
    }

    /**
     * @ngdoc method
     * @name validateForm
     * @methodOf ProductsInfoController
     * @private
     *
     * @description
     * validate product fields
     */
    private validateForm() {
        this.getOptionsPrice();

        return this.hasNoErrors();
    }

    addItemToCart() {
        console.log("productOptions:", this.productOptions);
        this.getOptionsPrice();

        if (this.validateForm()) {
            this.item = {
                id: this.product.id,
                name: this.product.title,
                quantity: this.quantity,
                notes: this.itemOptions,
                additional: this.additional,
                price: this.amount
            };
            this.CartServices.addItemToCart(this.item);
        }
    }

    closeModal() {
        this.close();
    }

    /**
     * @ngdoc method
     * @name increaseQuantity
     * @methodOf ProductsInfoController
     * @private
     *
     * @description
     * increase product counts
     */
    increaseQuantity() {
        this.quantity = this.quantity + 1;
        this.amount = this.quantity * this.getTotalProductPrice();
    }

    /**
     * @ngdoc method
     * @name decreaseQuantity
     * @methodOf ProductsInfoController
     * @private
     *
     * @description
     * decrease product counts
     */
    decreaseQuantity() {
        if (this.quantity > 1)
            this.quantity = this.quantity - 1;
        this.amount = this.quantity * this.getTotalProductPrice();
    }

    /**
     * @ngdoc method
     * @name getTotalProductPrice
     * @methodOf ProductsInfoController
     * @private
     *
     * @description
     * get product total price
     */
    getTotalProductPrice() {
        return this.product.price + this.getOptionsPrice();
    }
    totalProductPriceOnChange() {
        this.amount = this.quantity * (this.product.price + this.getOptionsPrice());
    }
    /**
     * @ngdoc function
     * @name getOptionsPrice
     * @methodOf ProductsInfoController
     * @private
     *
     * @description
     * get select options values with price, also push into new array
     * @return {number} Counted total price
     */
    getOptionsPrice() {
        let total = 0;
        this.itemOptions = [];
        if (this.productOptions && this.productOptions.length > 0) {
            console.log("kolichestvo opcii:",this.productOptions.length);
            this.productOptions.forEach((productOptions) => {
                if(productOptions.isOne === 0) {
                    //checkbox
                    if(productOptions.isRequired === 1){
                        let checkedCount = 0;
                        productOptions.productOptionsItems.forEach((productOptionsItems) => {
                            if(productOptionsItems.checked) {
                                this.itemOptions.push(productOptionsItems);
                                checkedCount = checkedCount + 1;
                                if(productOptions.isFree === 0 ){
                                    total = total + productOptionsItems.price;
                                }
                            }
                        });
                        if(checkedCount === 0) {
                            console.log("nichego ne otmeceno");
                            // this.errors.cart.cartCheckboxEmptyError;
                        }
                    } else {
                        productOptions.productOptionsItems.forEach((productOptionsItems) => {
                            if(productOptionsItems.checked){
                                this.itemOptions.push(productOptionsItems);
                                if(productOptions.isFree === 0 ){
                                    total = total + productOptionsItems.price;
                                }
                            }
                        });
                    }
                } else {
                    //radio
                    if(productOptions.isRequired === 1){
                        if(productOptions.checked){
                            let index = +productOptions.checked;
                            productOptions.productOptionsItems.forEach((productOptionsItems) => {
                                if(productOptionsItems.id === index) {
                                    this.itemOptions.push(productOptionsItems);
                                    if(productOptions.isFree === 0){
                                        total = total + productOptionsItems.price;
                                    }
                                }
                            })
                        } else {
                            console.log("radio nichego ne otmeceno");
                            // this.errors.cart.cartRadioEmptyError;
                        }
                    } else {
                        if(productOptions.checked){
                            let index = +productOptions.checked;
                            productOptions.productOptionsItems.forEach((productOptionsItems) => {
                                if(productOptionsItems.id === index) {
                                    this.itemOptions.push(productOptionsItems);
                                    if(productOptions.isFree === 0){
                                        total = total + productOptionsItems.price;
                                    }
                                }
                            })
                        }
                    }
                }
            });
        } else {
            total = 0;
        }

        return total;
    }


    /**
     * @ngdoc method
     * @name resetErrors
     * @methodOf ProductsInfoController
     *
     * @description
     * resets the errors object method from IFormContainer interface
     */
    resetErrors() {
        this.$scope.$apply(() => {
            this.errors = {};
        })
    }

    /**
     * @ngdoc method
     * @name hasNoErrors
     * @methodOf ProductsInfoController
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

export const productsInfo = {
    templateUrl: 'app/components/products/info/products.info.html',
    controller: ProductsInfoController,
    bindings: {
        resolve: '<',
        close: '&'
    }
};

