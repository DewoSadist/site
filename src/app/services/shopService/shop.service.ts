
/* "categories":[{"id":1,"name":"STARTERS","products":[{"id":1,"title":"SZECHUAN CHICKEN LETTUCE WRAPS","img_url":"#","price":16.5,"description":"sweet and spicy szechuan glaze, peanuts, wontons, korean chili sauce, spicy yogurt","tags":"spicy","discount":0,"cus_id":0,"sup_id":1,"type_id":1},{"id":23,"title":"TUNA STACK!","img_url":"#","price":16.0,"description":"ocean wise albacore, citrus tamari vinaigrette, nori, sesame, avocado, micro cilantro, wonton chips","tags":"spicy","discount":0,"cus_id":0,"sup_id":1,"type_id":1}*/
export interface IRestaurant {
  id: string;
  title: string;
  slug: string;
  tags?: string;
  description?: boolean;
  logo_image_url?: boolean,
  header_image_url?: string;
  cover_image_url?: string;
  status: boolean;
  country: number;
  city: string;
  address?: number;
  location: string;
  fax?: boolean;
  phone?: boolean;
  postal_code?: boolean;
  open_id?: boolean;
  ratings: number;
  categories?: Array<Object>;
}


/**
 * @interface IShopService
 */
export interface IShopService {
  getAllRestaurants();
    getRestaurant(resId);
}

/**
 * @ngdoc object
 * @name ShopService
 */
class ShopService implements IShopService {
    public restaurantList: Array<IRestaurant>;
    public  restaurant;

     /** @ngInject */
      constructor(public $q: ng.IQService,
                  public Restangular,
                  public appConfig) {
      }
  /**
   * @ngdoc method
   * @name IShopService.getAllRestaurants
   * @methodOf ShopService
   *
   * @description
   * Requests User object from server to determine if user is logged in.
   * If success, stores user in-memory, otherwise HTTP 401
   *
   * @return  {IPromise}  Request promise
   */
    getAllRestaurants() {
        let deferred = this.$q.defer();
        this.Restangular.one('restaurants').customGET()
            .then((list) => {
              this.restaurantList = list;
              deferred.resolve(this.restaurantList);
            })
            .catch((error) => {
              deferred.reject(error);
            });
        return deferred.promise;
    }

  /**
   * @ngdoc method
   * @name IShopService.getAllRestaurants
   * @methodOf ShopService
   *
   * @description
   * Requests User object from server to determine if user is logged in.
   * If success, stores user in-memory, otherwise HTTP 401
   *
   * @return  {IPromise}  Request promise
   */
    getRestaurant(resId) {
      let deferred = this.$q.defer();
      this.Restangular.one('restaurants/' + resId).customGET()
        .then((list) => {
          this.restaurantList = list;
          deferred.resolve(this.restaurantList);
        })
        .catch((error) => {
          deferred.reject(error);
        });
      return deferred.promise;
    }
}
export default ShopService;

