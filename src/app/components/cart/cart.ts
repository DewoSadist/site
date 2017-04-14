import './cart.scss';
import CartServices from "../../services/cartServices/cart.services";
class CartController {
  public text: string;
  public cart;

  /** @ngInject */
  constructor(public CartServices: CartServices) {
    this.cart = this.CartServices.getCardItems();
    this.text = 'My brand new component!';
  }
}

export const cart = {
  templateUrl: 'app/components/cart/cart.html',
  controller: CartController
};

