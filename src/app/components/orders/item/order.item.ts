import {IOrder} from "../../../services/shopServices/shop.services";

class OrderItemController {
  public order: IOrder;

  /** @ngInject */
  constructor(public $state) {

  }

  editLink(){
    this.$state.go('profile.order-edit', {order: this.order});
  }
}

export const orderItem = {
  templateUrl: 'app/components/orders/item/order.item.html',
  controller: OrderItemController,
  bindings: {
    order: '<'
  }
};

