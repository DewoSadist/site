import './products.info.scss';
import {
  IProduct, default as ShopServices, IShopServices,
  IProductOption
} from "../../../services/shopServices/shop.services";
import CartServices from "../../../services/cartServices/cart.services";
import {ICartServices} from "../../../services/cartServices/cart.services";
import {ICartItem} from "../../../services/cartServices/cart.services";
/**
 * @ngdoc   object
 * @name    ProductsInfoController
 */
class ProductsInfoController {
  public additional: string;
  public isLoading: boolean;
  public product: IProduct;
  public productOptions: Array<IProductOption>;
  public close;
  public quantity: number;
  public amount;
  public resolve;
  public order;
  public item;

  /** @ngInject */
  constructor($scope,
              public ShopServices: IShopServices,
              public CartServices: ICartServices) {

    this.isLoading = true;
    this.product = this.resolve.product;
    this.quantity = 1;
    this.amount = this.product.price;


    // console.log(this.product.title);

    ShopServices.getProductOptions(this.product.id)
        .then((object) => {
          this.productOptions = object;
          this.isLoading = false;
        });

  }
  validateForm() {
    this.item = {
      id: this.product.id,
      name: this.product.title,
      quantity: this.quantity,
      additional: this.additional
    };
      this.CartServices.addItemToCart(this.item);
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
    this.amount = this.quantity * this.product.price;
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
  decreaseQuantity(){
    if(this.quantity > 1)
      this.quantity = this.quantity - 1;
      this.amount = this.quantity * this.product.price;
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

