class ProductsItemController {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}

export const productsItem = {
  templateUrl: 'app/components/products/item/products.item.html',
  controller: ProductsItemController
};

