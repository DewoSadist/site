class CartController {
  public text: string;

  /** @ngInject */
  constructor() {
    this.text = 'My brand new component!';
  }
}

export const cart = {
  templateUrl: 'app/components/cart/cart.html',
  controller: CartController
};

