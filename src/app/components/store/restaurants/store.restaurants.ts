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
              public $state,
              public $cookies) {
      this.isLoading = true;
      this.showAll = false;
      this.ShopServices.getAllRestaurants()
          .then((list) => {
              let p1 = this.$cookies.getObject("uLocation");
              this.list = list;
              for(let i = this.list.length - 1; i >= 0; i--) {
                  if(this.list[i].location != null){
                      let location = this.list[i].location;
                      let distance = this.ShopServices.getDistance(p1, JSON.parse(location));
                      // console.log("distance:", distance);

                      if(distance > 5000) {
                          this.list.splice(i,1);
                      }
                  }

              }
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

