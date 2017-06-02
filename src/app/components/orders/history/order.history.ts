import {IShopServices} from "../../../services/shopServices/shop.services";
import {IUserService} from "../../../services/userService/user.service";
import './orders.history.scss';

class OrderHistoryController {
    public list;
    public showAll: boolean;

    /** @ngInject */
    constructor(public $scope: ng.IScope,
                public UserService: IUserService,
                public ShopServices: IShopServices) {
        if (this.UserService.isAuthorized()) {
            if (this.UserService.user.roles === 'ADMIN') {
                this.ShopServices.getOrders()
                    .then((list) => {
                        this.list = list;
                    });
            } else if (this.UserService.user.roles === 'CUSTOMER') {
                this.ShopServices.getRestaurantOrders(1)
                    .then((list) => {
                        this.list = list;
                    });

            } else {
                this.ShopServices.getUserOrders(this.UserService.user.user_id)
                    .then((list) => {
                        this.list = list;
                    });

            }

        }
    }
}

export const orderHistory = {
    templateUrl: 'app/components/orders/history/order.history.html',
    controller: OrderHistoryController
};

