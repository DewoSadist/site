import CartServices from "../../../services/cartServices/cart.services";
import UserService from "../../../services/userService/user.service";

class SidebarController {
  public text: string;
  public cart;

  /** @ngInject */
  constructor(public CartServices: CartServices, public UserService: UserService) {
    this.text = 'Cart!';
    this.cart = this.CartServices.getCardItems();
    console.log("cartItems:", this.cart);
  }
}

export const sidebar = {
  templateUrl: 'app/components/cart/sidebar/sidebar.html',
  controller: SidebarController
};

