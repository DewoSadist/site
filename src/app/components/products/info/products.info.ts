import './products.info.scss';
import {IProduct} from "../../../services/shopServices/shop.services";
/**
 * @ngdoc   object
 * @name    ProductsInfoController
 */
class ProductsInfoController {
  public product: IProduct;
  public close;
  public quantity: number;
  public resolve;

  /** @ngInject */
  constructor($scope) {
    this.product = this.resolve.product;
    this.quantity = 1;
    // console.log(this.product.title);
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

