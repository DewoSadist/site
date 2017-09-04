import {IShopServices} from '../../../services/shopServices/shop.services';

/**
 * @ngdoc   object
 * @name    StoreRestaurantsController
 */

class StoreRestaurantsController {
    public list;
    public showSuccess;
    public isLoading: boolean;
    public showAll: boolean;

    /** @ngInject */
    constructor(public $scope: ng.IScope,
                public ShopServices: IShopServices,
                public $state,
                public $cookies) {
        this.initRestaurants();
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

    initRestaurants(){
        this.isLoading = true;
        this.showAll = false;
        this.list = this.ShopServices.sortRestaurants();
            this.isLoading = false;

    }

    getDistance(location){
        return this.ShopServices.getDistanceKM(location);
    }

}

export const storeRestaurants = {
    templateUrl: 'app/components/store/restaurants/store.restaurants.html',
    controller: StoreRestaurantsController

};

