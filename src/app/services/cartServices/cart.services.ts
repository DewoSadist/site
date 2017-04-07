/**
 * @interface ICartItem
 */
export interface ICartItem {
  id: string;
  name: string;
  data: string;
  additional: string;
  quantity: number;
  price: number;
}
/**
 * @interface ICartServices
 */
export interface ICartServices {
   getTotalPrice();
   addItemToCart(item);
   deleteItemFromCart(itemId: number);
   deleteAllFromCart();
}
/**
 * @ngdoc object
 * @name CartServices
 */
class CartServices implements ICartServices{
  public totalPrice: number;
  public cartItems: Array<ICartItem>;
  public cartItem: ICartItem;

  constructor() {
    this.cartItems = [];
  }
  /**
   * @ngdoc method
   * @name ICartServices.getTotalPrice
   * @methodOf CartServices
   *
   * @description
   * Requests User object from server to determine if user is logged in.
   * If success, stores user in-memory, otherwise HTTP 401
   *
   * @return  {IPromise}  Request promise
   */
  getTotalPrice(){
    var total = 0;
  };

  /**
   * @ngdoc method
   * @name ICartServices.addItemToCart
   * @methodOf CartServices
   * @param item
   *
   * @description add item to shopping cart
   */
  addItemToCart(item){
    this.cartItems.push(item);
    console.log("dobavleno:", this.cartItems);

  }

  /**
   * @ngdoc method
   * @name ICartServices.deleteItemFromCart
   * @methodOf CartServices
   * @param itemId
   *
   * @description delete item by id from shopping cart
   */
   deleteItemFromCart(itemId: number){
    this.cartItems.splice(itemId, 1);
  }

  /**
   * @ngdoc method
   * @name ICartServices.deleteAllFromCart
   * @methodOf CartServices
   *
   * @description delete all items from shopping cart
   */
  deleteAllFromCart() {
    this.cartItems = [];
  }
}

export default CartServices;

