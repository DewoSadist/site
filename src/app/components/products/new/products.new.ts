class ProductsNewController {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}

export const productsNew = {
  templateUrl: 'app/components/products/new/products.new.html',
  controller: ProductsNewController
};

