import './cart.scss';
import CartServices from "../../services/cartServices/cart.services";
import {IFormContainer, IOrder, IShopServices} from "../../services/shopServices/shop.services";
import UserService from "../../services/userService/user.service";
import ErrorService from "../../services/errorService/error.service";
class CartController implements IFormContainer {
    public step;
    public payment;
    public cart;
    public isSend: boolean;
    public errors;
    public isLoading: boolean;
    public day;
    public time;
    public order: IOrder;
    public userForm;

    /** @ngInject */
    constructor(public $scope,
                public $filter,
                public CartServices: CartServices,
                public UserService: UserService,
                public ErrorService: ErrorService,
                public ShopServices: IShopServices) {
        this.time = this.$filter('date')(new Date(), 'HH:mm:ss');
        this.day = this.$filter('date')(new Date(), 'yyyy-MM-dd');
        console.log("current date:", this.day, this.time);
        this.step = 1;
        this.userForm = {
            name: '',
            address: '',
            number: '',
            email: ''
        };
        this.payment = 'by_cash';
        this.isSend = false;
        this.cart = this.CartServices.getCardItems();
    }

    /**
     * @ngdoc method
     * @name resetErrors
     * @methodOf CartController
     *
     * @description
     * resets the errors object method from IFormContainer interface
     */
    resetErrors() {
        this.$scope.$apply(() => {
            this.errors = {};
        })
    }

    /**
     * @ngdoc method
     * @name startLoading
     * @methodOf CartController
     *
     * @description
     * Start loading data state method from IFormContainer interface
     */
    startLoading() {
        this.isLoading = true;
    }

    /**
     * @ngdoc method
     * @name stopLoading
     * @methodOf CartController
     *
     * @description
     * Terminate loading state, IFormContainer interface
     */
    stopLoading() {
        this.isLoading = false;
    }

    /**
     * @ngdoc method
     * @name hasNoErrors
     * @methodOf CartController
     *
     * @description
     * Return true if no errors present in Form, IFormContainer interface
     *
     * @return {boolean} Return true if no errors present in Form
     */
    hasNoErrors(): boolean {
        return Object.keys(this.errors).length === 0;
    }
    /**
     * @ngdoc method
     * @name placeOrder
     * @methodOf CartController
     *
     * @description
     * place order on server
     *
     * @return response order object from server
     */
    placeOrder() {
        this.startLoading();
        this.time = this.$filter('date')(new Date(), 'hh:mm:ss');
        this.day = this.$filter('date')(new Date(), 'yyyy-MM-dd');
        console.log("current date:", this.day, this.time);
        if (this.UserService.isAuthorized()) {
            this.order = {
                res_id: this.cart.restaurant.id,
                res_name: this.cart.restaurant.title,
                tax: this.cart.tax,
                delivery: this.cart.delivery,
                service_fee: this.cart.service_fee,
                small_order_fee: this.cart.small_order_fee,
                quantity: 0,
                order_amount: this.cart.total,
                status: 'preorder',
                user_id: this.UserService.user.user_id,
                reorder: 0,
                order_day: this.day,
                order_time: this.time,
                req_day: this.day,
                req_time: this.time,
                ship_via: 'car',
                orderDetails: [],
                client_name: this.UserService.user.firstname,
                client_address: this.UserService.user.address,
                client_email: this.UserService.user.email,
                client_number: this.UserService.user.phone,
                payment: this.payment
            };
        } else {
            this.order = {
                res_id: this.cart.restaurant.id,
                res_name: this.cart.restaurant.title,
                tax: this.cart.tax,
                delivery: this.cart.delivery,
                service_fee: this.cart.service_fee,
                small_order_fee: this.cart.small_order_fee,
                quantity: 0,
                order_amount: this.cart.total,
                status: 'preorder',
                user_id: 'unknown',
                reorder: 0,
                order_day: this.day,
                order_time: this.time,
                req_day: this.day,
                req_time: this.time,
                ship_via: 'car',
                orderDetails: [],
                client_name: this.userForm.name,
                client_address: this.userForm.address,
                client_email: this.userForm.email,
                client_number: this.userForm.number,
                payment: this.payment
            };
        }
        this.cart.items.forEach((item) => {
            let notes = "";
            if(item.notes.length > 0){
                item.notes.forEach((note) => {
                    notes = notes + note.title + " " + note.name + "; ";
                });
            }

            if (index => 0) {
                let obj = {
                    title: item.name,
                    employee_id: 1,
                    unit_price: item.each_price,
                    quantity: item.quantity,
                    additional: item.additional,
                    note: notes
                };
                this.order.orderDetails.push(obj);
                console.log("dobavleno:", item);
            }
        });
        console.log("Order Details", this.order);
        this.ShopServices.saveOrUpdateOrder(this.order)
            .then((response) => {
                this.stopLoading();
                console.log(response);
                this.order = response;
                this.step = 2;
                this.CartServices.setCartDefault();
            })
            .catch((error) => {
                console.log(error);
                this.stopLoading();
                if (error.status === 404) {
                    this.errors = {
                        form: this.ErrorService.getEditError().saveError
                    };
                } else if (error.status === 500) {
                    this.errors = {
                        form: this.ErrorService.getEditError().saveIncorrectValue
                    }
                } else {
                    this.errors = {
                        form: this.ErrorService.getGeneralBadRequestError()
                    };
                }
            });
    }
    /**
     * @ngdoc method
     * @name cancelOrder
     * @methodOf CartController
     *
     * @description
     * cancel order on server
     *
     * @return response order object from server
     */
    cancelOrder() {
        this.startLoading();
        this.order.status = 'canceled';
        this.ShopServices.saveOrUpdateOrder(this.order)
            .then((response) => {
                this.stopLoading();
                console.log(response);
                this.order = response;
                this.step = 2;
            })
            .catch((error) => {
                console.log(error);
                this.stopLoading();
                if (error.status === 404) {
                    this.errors = {
                        form: this.ErrorService.getEditError().saveError
                    };
                } else if (error.status === 500) {
                    this.errors = {
                        form: this.ErrorService.getEditError().saveIncorrectValue
                    }
                } else {
                    this.errors = {
                        form: this.ErrorService.getGeneralBadRequestError()
                    };
                }
            });
    }

}

export const cart = {
    templateUrl: 'app/components/cart/cart.html',
    controller: CartController
};

