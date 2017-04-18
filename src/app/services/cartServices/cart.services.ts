/**
 * @interface ICartItem
 */
export interface ICartItem {
    id: number;
    name: string;
    data: string;
    additional: string;
    quantity: number;
    price: number;
    each_price: number;
}

/**
 * @interface ICart
 */
export interface ICart {
    store: string
    storeId: number;
    shipping: string;
    taxRate: number;
    tax: number;
    items: Array<ICartItem>;
}

/**
 * @interface ICartServices
 */
export interface ICartServices {
    getTotalPrice();
    addItemToCart(item);
    deleteItemFromCart(itemId: number);
    deleteAllFromCart();
    getTotalCount();
    increaseItemQ(itemId: number);
    decreaseItemQ(itemId: number)
    toggleShowCart();
}

/**
 * @ngdoc object
 * @name CartServices
 */
class CartServices implements ICartServices {
    public cart: ICart;
    public totalPrice: number;
    public showCart: boolean;

    /** @ngInject */
    constructor(
        public $cookies: ng.cookies.ICookiesService) {
        this.showCart = false;
        this.cart = $cookies.getObject("cart");
        console.log(this.cart);
        if(!this.cart) {
            this.cart = {
                store:"",
                storeId:0,
                shipping: "",
                tax: 0,
                taxRate: 1,
                items: []
            };
        }
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
    getTotalPrice() {
        this.totalPrice = 0;
        if (this.cart.items.length > 0) {
            this.cart.items.forEach((item) => {
                if (item.price > 0) {
                    this.totalPrice += item.price;
                }
            });
        }
        return this.totalPrice.toFixed(2);
    };

    /**
     * @ngdoc method
     * @name ICartServices.addItemToCart
     * @methodOf CartServices
     * @param item
     *
     * @description add item to shopping cart
     */
    addItemToCart(item) {
        this.cart.items.push(item);
        this.$cookies.remove("cart");
        this.$cookies.putObject("cart", this.cart);
        console.log("Added to cart:", this.cart, this.getTotalCount());
    }

    /**
     * @ngdoc method
     * @name ICartServices.getCardItems
     * @methodOf CartServices
     *
     * @description
     * get all items from shopping cart
     */
    getCardItems() {
        return this.cart;
    }

    /**
     * @ngdoc method
     * @name ICartServices.deleteItemFromCart
     * @methodOf CartServices
     * @param itemId
     *
     * @description delete item by id from shopping cart
     */
    //todo: ok
    deleteItemFromCart(itemId: number) {
        this.$cookies.remove("cart");
        this.cart.items.forEach((item) => {
            if (item.id === itemId) {
                let index = this.cart.items.indexOf(item);
                if (index => 0) {
                    this.cart.items.splice(index, 1);
                    console.log("udaleno:", this.cart);
                }
            }
        })
        this.$cookies.putObject("cart", this.cart);
    }

    /**
     * @ngdoc method
     * @name ICartServices.deleteAllFromCart
     * @methodOf CartServices
     *
     * @description delete all items from shopping cart
     */
    deleteAllFromCart() {
        this.cart.items = [];
    }

    /**
     * @ngdoc method
     * @name ICartServices.getTotalCount
     * @methodOf CartServices
     *
     * @description get all items count from shopping cart
     */
    getTotalCount() {
        return this.cart.items.length;
    }

    /**
     * @ngdoc method
     * @name ICartServices.increaseItemQ
     * @methodOf CartServices
     *
     * @description get all items count from shopping cart
     */
    increaseItemQ (itemId:number) {
        this.cart.items.forEach((item) => {
            if (item.id === itemId) {
                let index = this.cart.items.indexOf(item);
                if (index => 0) {
                    item.quantity = item.quantity + 1;
                    console.log("+1");
                    item.price = item.each_price * item.quantity;
                }
            }
        })
    }

    /**
     * @ngdoc method
     * @name ICartServices.decreaseItemQ
     * @methodOf CartServices
     *
     * @description get all items count from shopping cart
     */
    decreaseItemQ (itemId:number) {
        this.cart.items.forEach((item) => {
            if (item.id === itemId) {
                if (index => 0) {
                    if(item.quantity > 1) {
                        item.quantity = item.quantity - 1;
                        console.log("-1");
                        item.price = item.each_price * item.quantity;
                    }

                }
            }
        })
    }
    /**
     * @ngdoc method
     * @name toggleShowCart
     * @methodOf HeaderController
     *
     * @description
     * Shows/hides cart sidebar
     */
    toggleShowCart() {
        this.showCart = !this.showCart;
    }
}

export default CartServices;

