class ProductsEditController {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}

export const productsEdit = {
  templateUrl: 'app/components/products/edit/products.edit.html',
  controller: ProductsEditController
};

