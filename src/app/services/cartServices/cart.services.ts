import {IRestaurant} from "../shopServices/shop.services";
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
export interface IOrder {
    order_id: string;
    res_id: number;
    res_name: string;
    tax: number;
    delivery: number;
    service_fee: number;
    small_order_fee: number;
    quantity: number;
    order_amount: number | string;
    status: string;
    user_id: string;
    reorder: number;
    order_day: string;
    order_time: string;
    req_day: string;
    req_time: string;
    ship_via: string;
    order_details: any;
}

/**
 * @interface ICart
 */
export interface ICart {
    restaurant: IRestaurant;
    store: string;
    storeId: number;
    shipping: string;
    taxRate: number;
    tax: number;
    delivery: number;
    service_fee: number;
    small_order_fee: number;
    items: Array<ICartItem>;
    payment: string;
    total: number;
    subtotal: number ;
}

/**
 * @interface ICartServices
 */
export interface ICartServices {
    getSubTotalPrice();
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
    public subTotalPrice: number;
    public showCart: boolean;
    public order: IOrder;

    /** @ngInject */
    constructor(public $cookies: ng.cookies.ICookiesService) {
        this.showCart = false;
        this.cart = $cookies.getObject("cart");
        console.log(this.cart);
        if(!this.cart) {
            this.cart = {
                restaurant: null,
                store: "",
                storeId: 0,
                shipping: "",
                tax: 0,
                taxRate: 1,
                items: [],
                payment: "cash",
                delivery: 0,
                service_fee: 0,
                small_order_fee: 0,
                total: 0,
                subtotal: 0
            };
        }
    }

    /**
     * @ngdoc method
     * @name ICartServices.getSubTotalPrice
     * @methodOf CartServices
     *
     * @description
     * Requests User object from server to determine if user is logged in.
     * If success, stores user in-memory, otherwise HTTP 401
     *
     * @return  {IPromise}  Request promise
     */
    getSubTotalPrice() {
        this.subTotalPrice = 0;
        if (this.cart.items.length > 0) {
            this.cart.items.forEach((item) => {
                if (item.price > 0) {
                    this.subTotalPrice += item.price;
                }
            });
        }
        this.cart.subtotal = this.subTotalPrice;
        console.log(this.cart.total);
        return this.cart.subtotal;
    };
    getDeliveryTax(){
        this.cart.delivery = (this.getSubTotalPrice() * this.cart.restaurant.delivery)/100;
        console.log(this.cart.delivery);
        return this.cart.delivery;
    }
    getServiceFee(){
        this.cart.service_fee = (this.getSubTotalPrice() * this.cart.restaurant.service_fee)/100;
        console.log(this.cart.service_fee);

        return this.cart.service_fee;
    }
    getTax() {
        this.cart.tax = (this.getSubTotalPrice() * this.cart.restaurant.tax)/100;
        console.log(this.cart.tax);
        return this.cart.tax;
    }
    getTotalPrice(){
        this.cart.total = (this.getSubTotalPrice() + this.getTax() + this.getDeliveryTax() + this.getServiceFee());
        console.log(this.cart.total);

    }

    /**
     * @ngdoc method
     * @name ICartServices.addItemToCart
     * @methodOf CartServices
     * @param item
     *
     * @description add item to shopping cart
     */
    addItemToCart(item) {
        if(this.cart.restaurant == null) {
            this.cart.restaurant = item.restaurant;
        } else {
            if(this.cart.restaurant.id == item.restaurant.id) {
                this.cart.items.push(item);
            } else {
                let msg = 'This product from another restaurant,do you want to change restaurant?' +
                    'If you change we delete products from existing restaurant';
                if(window.confirm(msg)) {
                    this.cart.restaurant = item.restaurant;
                    this.cart.items=[];
                    this.cart.items.push(item);
                }
                console.log("error! restaurants are different")
            }
        }

        // this.cart.items.push(item);
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

