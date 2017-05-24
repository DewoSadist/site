import {IRestaurant} from "../../../../services/shopServices/shop.services";
class RestaurantItemController {
  public restaurant: IRestaurant;
  public text: string;
  /** @ngInject */
  constructor(public $state) {

  }
  editLink(){
    this.$state.go('profile.restaurant-edit', {restaurant: this.restaurant});
  }
}

export const restaurantItem = {
  templateUrl: 'app/components/profile/restaurants/item/restaurant.item.html',
  controller: RestaurantItemController,
  bindings: {
    restaurant: '<'
  }
};

