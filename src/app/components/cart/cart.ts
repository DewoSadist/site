import './cart.scss';
import CartServices from "../../services/cartServices/cart.services";
import {IFormContainer} from "../../services/shopServices/shop.services";
import UserService from "../../services/userService/user.service";
class CartController implements IFormContainer {
  public payment;
  public cart;
  public isSend: boolean;
  public errors;
  public isLoading: boolean;

  /** @ngInject */
  constructor(public $scope,
              public CartServices: CartServices,
              public UserService: UserService) {
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
}

export const cart = {
  templateUrl: 'app/components/cart/cart.html',
  controller: CartController
};

