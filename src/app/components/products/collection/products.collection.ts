import {IProduct} from "../../../services/shopServices/shop.services";
/**
 * @ngdoc   object
 * @name    ProductsCollectionController
 */
class ProductsCollectionController {
  public products: Array<IProduct>;
  public product: IProduct;

  /** @ngInject */
  constructor(public $uibModal) {
  }

  openProductModal(item){
      console.log(item);
      this.$uibModal.open({
          component: 'productsInfo',
          resolve: {
              product: () => {
                return item;
              }
          },
          keyboard: false,
          windowClass: 'account-settings-modal'
      });
  }
}


export const productsCollection = {
  templateUrl: 'app/components/products/collection/products.collection.html',
  controller: ProductsCollectionController,
  bindings: {
    products:'<'
  }
};

