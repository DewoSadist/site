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
    this.initRestaurants();
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
  /**
   * @ngdoc method
   * @name removeRestaurant
   * @methodOf AccountListController
   *
   * @description
   * remove restaurant
   */
  removeRestaurant(id){
    this.ShopServices.delRestaurant(id);
    this.list.forEach((item) => {
      if(item.id == id ){
        let index = this.list.indexOf(item);
        if (index => 0) {
          this.list.splice(index, 1);
          console.log("udaleno:", item);
        }
      }
    })
  }
  /**
   * @ngdoc method
   * @name initRestaurants
   * @methodOf AccountListController
   *
   * @description
   * initialize restaurants list
   */
  initRestaurants(){
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
}

export const restaurantsList = {
  templateUrl:'app/components/profile/restaurants/list/restaurants.list.html',
  controller: RestaurantsListController
};

