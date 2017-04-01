import {IRestaurant, IProductCategory, IProduct} from "../../../../services/shopServices/shop.services";

/**
 * @ngdoc   object
 * @name    StoreRestaurantController
 */

class StoreRestaurantController {
  public restaurantId;
  public restaurant: IRestaurant;
  public categories: Array<IProductCategory>;
  public productsList: Array<IProduct>;

  /** @ngInject */
  constructor() {
  }
}

export const storeRestaurant = {
  templateUrl: 'app/components/store/restaurants/restaurant/store.restaurant.html',
  controller: StoreRestaurantController,
  bindings: {
    restaurantId: '<',
    restaurant: '<',
    categories: '<',
    productsList: '<'
  }
};

