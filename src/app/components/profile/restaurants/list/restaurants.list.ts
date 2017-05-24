import {IUserService} from "../../../../services/userService/user.service";
import {IShopServices} from "../../../../services/shopServices/shop.services";
import './restaurants.list.scss';


class RestaurantsListController {
  public list;
  public showAll: boolean;
  /** @ngInject */
  constructor(public $scope: ng.IScope,
              public UserService: IUserService,
              public ShopServices: IShopServices) {
    this.showAll = false;
    if (this.UserService.isAuthorized()) {
      if(this.UserService.user.roles === 'ADMIN'){
        this.ShopServices.getAllRestaurants()
            .then((list) => {
              this.list = list;
            });
      } else if(
          this.UserService.user.roles === 'CUSTOMER') {
        this.ShopServices.getUserRestaurants(this.UserService.user.user_id)
            .then((list) => {
              this.list = list;
            });
      }

    }
  }
  /**
   * @ngdoc method
   * @name toggleShowAll
   * @methodOf AccountListController
   *
   * @description
   * Shows/hides list of all accounts
   */
  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}

export const restaurantsList = {
  templateUrl:'app/components/profile/restaurants/list/restaurants.list.html',
  controller: RestaurantsListController
};

