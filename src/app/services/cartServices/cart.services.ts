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
    getDeliveryTax();
    getTax();
    getServiceFee();
    getTotalPrice();

    addItemToCart(item);
    deleteItemFromCart(itemId: number);
    deleteAllFromCart();
    getTotalCount();
    increaseItemQ(index: number);
    decreaseItemQ(index: number);
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

    /** @ngInject */
    constructor(public $cookies: ng.cookies.ICookiesService) {
        this.showCart = false;
        this.cart = $cookies.getObject("cart");
        console.log(this.cart);
        if(!this.cart) {
            this.setCartDefault();
        }
    }

    /**
     * @ngdoc method
     * @name ICartServices.getSubTotalPrice
     * @methodOf CartServices
     *
     * @description
     * count cart subtotal price
     *
     * @return  subtotal price
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
        this.cart.subtotal = Math.round(this.subTotalPrice * 100)/100;
        return this.cart.subtotal;
    };
    /**
     * @ngdoc method
     * @name ICartServices.getDeliveryTax
     * @methodOf CartServices
     *
     * @description
     * If restaurant object not null make calculation else return 0
     *
     * @return  delivery tax
     */
    getDeliveryTax(){
        if(this.cart.restaurant != null && this.cart.restaurant.delivery){
            let delivery = (this.getSubTotalPrice() * this.cart.restaurant.delivery)/100;
            this.cart.delivery = Math.round(delivery * 100)/ 100;
        } else {
            this.cart.delivery = 0;

        }
        return this.cart.delivery;
    }
    /**
     * @ngdoc method
     * @name ICartServices.getServiceFee
     * @methodOf CartServices
     *
     * @description
     * If restaurant object not null make calculation else return 0
     *
     * @return  service fee
     */
    getServiceFee(){
        if(this.cart.restaurant != null && this.cart.restaurant.service_fee){
            let serviceFee = (this.getSubTotalPrice() * this.cart.restaurant.service_fee)/100;
            this.cart.service_fee = Math.round(serviceFee * 100) / 100;
        } else {
            this.cart.service_fee = 0
        }
        return this.cart.service_fee;
    }
    /**
     * @ngdoc method
     * @name ICartServices.getTax
     * @methodOf CartServices
     *
     * @description
     * If restaurant object not null make calculation else return 0
     *
     * @return  tax
     */
    getTax() {
        if(this.cart.restaurant != null && this.cart.restaurant.tax) {
            let tax = (this.getSubTotalPrice() * this.cart.restaurant.tax)/100;
            this.cart.tax = Math.round(tax * 100) / 100;

        } else {
            this.cart.tax = 0;
        }
        return this.cart.tax;
    }
    /**
     * @ngdoc method
     * @name ICartServices.getTotalPrice
     * @methodOf CartServices
     *
     * @description
     * subtotal + tax + + delivery tax + service fee
     *
     * @return  total price
     */
    getTotalPrice(){
        let total = (this.getSubTotalPrice() + this.getTax() + this.getDeliveryTax() + this.getServiceFee());
        this.cart.total = Math.round(total * 100) / 100;
        return this.cart.total;
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
            this.cart.store = item.restaurant.title;
            this.cart.storeId = item.restaurant.id;
            this.cart.items.push(item);

        } else {
            if(this.cart.restaurant.id == item.restaurant.id) {
                this.cart.items.push(item);
            } else {
                let msg = 'This product from another restaurant,do you want to change restaurant?' +
                    'If you change we delete products from existing restaurant';
                if(window.confirm(msg)) {
                    this.cart.restaurant = item.restaurant;
                    this.cart.store = item.restaurant.title;
                    this.cart.storeId = item.restaurant.id;
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
        // calculating total price.
        this.getTotalPrice();
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
        });
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
        this.$cookies.remove("cart");
        this.$cookies.putObject("cart", this.cart);
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
    increaseItemQ (indexE:number) {
        this.cart.items.forEach((item) => {
                let index = this.cart.items.indexOf(item);
            if (indexE == index) {

            if (index => 0) {
                    item.quantity = item.quantity + 1;
                    console.log("+1");
                    item.price = item.each_price * item.quantity;
                }
            }
        });
        this.$cookies.remove("cart");
        this.$cookies.putObject("cart", this.cart);
    }

    /**
     * @ngdoc method
     * @name ICartServices.decreaseItemQ
     * @methodOf CartServices
     *
     * @description get all items count from shopping cart
     */
    decreaseItemQ (indexE:number) {
        this.cart.items.forEach((item) => {
            let index = this.cart.items.indexOf(item);
            if (indexE === index) {
                if (index => 0) {
                    if(item.quantity > 1) {
                        item.quantity = item.quantity - 1;
                        console.log("-1");
                        item.price = item.each_price * item.quantity;
                    }

                }
            }
        });
        this.$cookies.remove("cart");
        this.$cookies.putObject("cart", this.cart);
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
    setCartDefault(){
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

export default CartServices;

