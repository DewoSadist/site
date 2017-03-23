import {IShopService} from '../../../../services/shopService/shop.service';
import './restaurant.scss';
/**
 * @ngdoc   object
 * @name    RestaurantListController
 */

class RestaurantListController {
  public list;
  public showSuccess;
  public isLoading: boolean;
  public showAll: boolean;

  /** @ngInject */
  constructor(public $scope: ng.IScope,
              public ShopService: IShopService,
              public $state: ng.ui.IStateService) {
    this.isLoading = true;
    this.showAll = false;
      this.ShopService.getAllRestaurants()
        .then((list) => {
          this.list = list;
          this.isLoading = false;
        });
  }
  /**
   * @ngdoc method
   * @name toggleShowAll
   * @methodOf RestaurantListController
   *
   * @description
   * Shows/hides list of all restaurants
   */
  toggleShowAll() {
    this.showAll = !this.showAll;
  }
  /**
   * @ngdoc method
   * @name selectItem
   * @methodOf RestaurantListController
   *
   * @description
   * Collection item click handle
   * Transitions user to transfer's page

   * @param {object} restaurant restaurant item
   */
  selectItem(restaurant) {
    console.log(restaurant.id);
    this.$state.go('restaurants.' + restaurant.id);

  }

}

export const restaurantList = {
  templateUrl: 'app/components/common/list/restaurant/restaurant.list.html',
  controller: RestaurantListController
};

