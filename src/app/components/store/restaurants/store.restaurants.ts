import { IShopServices } from '../../../services/shopServices/shop.services';

/**
 * @ngdoc   object
 * @name    StoreRestaurantsController
 */

class StoreRestaurantsController {
  public list;
  public showSuccess;
  public isLoading: boolean;
  public showAll: boolean;
  public text: string;

    /** @ngInject */
  constructor(public $scope: ng.IScope,
              public ShopServices: IShopServices,
              public $state) {
      this.isLoading = true;
      this.showAll = false;
      this.ShopServices.getAllRestaurants()
          .then((list) => {
              this.list = list;
              this.isLoading = false;
          });
      this.text = 'My brand new storeRestaurants!';
  }

  /**
   * @ngdoc method
   * @name toggleShowAll
   * @methodOf StoreRestaurantsController
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
   * @methodOf StoreRestaurantsController
   *
   * @description
   * Collection item click handle
   * Transitions user to transfer's page

   * @param {object} restaurant restaurant item
   */
  selectItem(restaurant) {
    this.$state.go('store.restaurant', {
      restaurantId: restaurant.id
    });
  }

}

export const storeRestaurants = {
  templateUrl: 'app/components/store/restaurants/store.restaurants.html',
  controller: StoreRestaurantsController

};

