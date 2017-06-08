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
        this.order={
            client_address:
                "smam",
            client_email
                :
                "mamsa@asmas.asl",
            client_name
                :
                "Sama",
            client_number
                :
                "121312121",
            delivery
                :
                0.06625,
            id
                :
                100010,
            order_amount
                :
                13.43815,
            order_day
                :
                "2017-06-05",
            order_time
                :
                "11:20:25",
            payment
                :
                "by_cash",
            quantity
                :
                0,
            reorder
                :
                0,
            req_day
                :
                "2017-06-05",
            req_time
                :
                "11:20:25",
            res_id
                :
                2,
            res_name
                :
                "Nandus Cafe",
            service_fee
                :
                0.02915,
            ship_via
                :
                "car",
            small_order_fee
                :
                0,
            status
                :
                "preorder",
            tax
                :
                0.09274999999999999,
            user_id
                :
                "unknown",
            order_details:null

        }
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
        this.day = this.$filter('date')(new Date(), 'yyyy-MM-dd');
        console.log(this.day)
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

    placeOrder() {
        this.startLoading();
        this.time = this.$filter('date')(new Date(), 'hh:mm:ss');
        if(this.UserService.isAuthorized()) {
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
                order_details: null,
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
                order_details: null,
                client_name: this.userForm.name,
                client_address: this.userForm.address,
                client_email: this.userForm.email,
                client_number: this.userForm.number,
                payment: this.payment
            };
        }

        console.log("Order Details", this.order);
        this.ShopServices.saveOrUpdateOrder(this.order)
            .then((response) => {
                this.stopLoading();
                console.log(response);
                this.order = response;
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

