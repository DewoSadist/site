import {IOrder} from "../../../services/shopServices/shop.services";
import './order.item.scss';
import UserService from "../../../services/userService/user.service";
class OrderItemController {
  /**
   * @ngdoc object
   * @name OrderItem
   */
  public order: IOrder;
  /**
   * @ngdoc    property
   * @name    OrderItemController#stepOptions
   * @propertyOf    OrderItemController
   * @returns    {Array}    List of step options
   */
  public stepOptions;
  /**
   * @ngdoc    property
   * @name    OrderItemController#step
   * @propertyOf    OrderItemController
   * @returns    {boolean}    Current form step
   */
  public step;

  /** @ngInject */
  constructor(public $state,
              public UserService: UserService) {
    this.stepOptions = {
      RECEIVED: 0,
      IN_PROGRESS: 1,
      ON_THE_WAY: 2,
      DELIVERED: 3
    };
    this.order.status = 'received';

    switch (this.order.status) {
      case 'received': {
        this.goToReceivedStep();
        break;
      }
      case 'inprogress': {
        this.goToProgressStep();
        break;
      }
      case 'ontheway': {
        this.goToWayStep();
        break;
      }
      case 'delivered': {
        this.goToDeliveredStep();
        break;
      }
    }
    if (this.order.status == 'received') {

    }

  }

  editLink(){
    this.$state.go('profile.order-edit', {order: this.order});
  }
  /**
   * @ngdoc method
   * @name goToReceivedStep
   * @methodOf OrderItemController
   *
   * @description
   * Switch order status form to received step, first one
   */
  goToReceivedStep() {
    this.showStep(this.stepOptions.RECEIVED);
  }

  /**
   * @ngdoc method
   * @name goToProgressStep
   * @methodOf OrderItemController
   *
   * @description
   * Switch order status form to in progress step, second one
   */
  goToProgressStep() {
    this.showStep(this.stepOptions.IN_PROGRESS);
  }



  /**
   * @ngdoc       method
   * @name        goToWayStep
   * @methodOf    OrderItemController
   *
   * @description
   * Switch order status form to On the Way step, first one
   */
  goToWayStep() {
    this.showStep(this.stepOptions.ON_THE_WAY);
  }

  /**
   * @ngdoc       method
   * @name        goToDeliveredStep
   * @methodOf    OrderItemController
   *
   * @description
   * Switch order status form to Delivered step, which is present only for logged in users
   */
  goToDeliveredStep() {
    this.showStep(this.stepOptions.DELIVERED);
  }


  /**
   * @ngdoc       method
   * @name        showStep
   * @methodOf    OrderItemController
   *
   * @description
   * Changes the current step, affecting UI
   *
   * @param {number}  step    Next step
   */
  protected showStep(step: number) {
    this.step = step;
  }
}

export const orderItem = {
  templateUrl: 'app/components/orders/item/order.item.html',
  controller: OrderItemController,
  bindings: {
    order: '<'
  }
};

