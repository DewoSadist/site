import CartServices from "../../../services/cartServices/cart.services";
class SidebarController {
  public text: string;
  public cart;

  constructor(public CartServices: CartServices) {
    this.text = 'Cart!';
    this.cart = CartServices.getCardItems();
    console.log("cartItems:", this.cart);
  }
}

export const sidebar = {
  templateUrl: 'app/components/cart/sidebar/sidebar.html',
  controller: SidebarController
};

