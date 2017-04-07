
/**
 * @interface IRestaurant
 */
export interface IRestaurant {
  id: string;
  title: string;
  slug: string;
  tags?: string;
  description?: boolean;
  logo_image_url?: boolean;
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
  hours: Array<IHour>;
}

export interface IHour {
    open_id: number;
    day: string;
    open_hour: string;
    close_hour: string;
}

/**
 * @interface IProductCategory
 */
export interface IProductCategory {
  id: string;
  name: string;
  res_id: string;
}

/**
 * @interface IProduct
 */
export interface IProduct {
  id: string;
  title: string;
  img_url: string;
  price: number;
  description: string;
  tags: string;
  discount: string;
  cus_id: string;
  sup_id: string;
  type_id: string;
  cat_id: string;
}

/**
 * @interface IProductOption
 */
export interface IProductOption {
    id: string;
    name: string;
    isRequired: number;
    isFree: number;
    isOne: number
    prod_id: number;
    productOptionsItems: Array<IProductOptionItem>;
}
/**
 * @interface IProductOptionItem
 */
export interface IProductOptionItem {
    id: number;
    name: string;
    price: number;
}

/**
 * @interface IShopServices
 */
export interface IShopServices {
  getAllRestaurants();
  getRestaurant(resId: string);

  getAllCategories();
  getRestaurantCategories(resId: string);

  getAllProducts();
  getCategoryProducts(catId: string);

  getProductOptions(prodId: string);


}
/**
 * @ngdoc object
 * @name ShopServices
 */
class ShopServices implements  IShopServices {
  public restaurantsList: Array<IRestaurant>;
  public restaurant: IRestaurant;

  public categoriesList: Array<IProductCategory>;
  public category: IProductCategory

  public productsList: Array<IProduct>;
  public product: IProduct;

  public productOptionsList: Array<IProductOption>;

  public text: string;

  /** @ngInject */
  constructor(public $q: ng.IQService,
              public Restangular,
              public appConfig) {
    this.text = 'My brand new component!';
  }

  /**
   * @ngdoc method
   * @name IShopServices.getAllRestaurants
   * @methodOf ShopServices
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
          this.restaurantsList = list;
          deferred.resolve(this.restaurantsList);
        })
        .catch((error) => {
          deferred.reject(error);
        });
    return deferred.promise;
  }

  /**
   * @ngdoc method
   * @name IShopServices.getAllRestaurants
   * @methodOf ShopServices
   *
   * @description
   * Requests User object from server to determine if user is logged in.
   * If success, stores user in-memory, otherwise HTTP 401
   *
   * @return  {IPromise}  Request promise
   */
  getRestaurant(resId: string) {
    let deferred = this.$q.defer();
    this.Restangular.one('restaurants/' + resId).post()
        .then((object) => {
          this.restaurant = object;
          deferred.resolve(this.restaurant);
        })
        .catch((error) => {
          deferred.reject(error);
        });
    return deferred.promise;
  }
  /**
 * @ngdoc method
 * @name IShopServices.getAllCategories
 * @methodOf ShopServices
 *
 * @description
 * Requests User object from server to determine if user is logged in.
 * If success, stores user in-memory, otherwise HTTP 401
 *
 * @return  {IPromise}  Request promise
 */
    getAllCategories(){
      let deferred = this.$q.defer();
      this.Restangular.one('restaurants/categories').get()
          .then((object) => {
              this.categoriesList = object;
              deferred.resolve(this.categoriesList);
          })
          .catch((error) => {
              deferred.reject(error);
          });
      return deferred.promise;
  }

    /**
     * @ngdoc method
     * @name IShopServices.getRestaurantCategories
     * @methodOf ShopServices
     *
     * @description
     * Requests User object from server to determine if user is logged in.
     * If success, stores user in-memory, otherwise HTTP 401
     *
     * @return  {IPromise}  Request promise
     */
    getRestaurantCategories(resId: string) {
        let deferred = this.$q.defer();
        this.Restangular.one('restaurants/' + resId + '/categories').post()
            .then((object) => {
                this.categoriesList = object;
                deferred.resolve(this.categoriesList);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name IShopServices.getAllProducts
     * @methodOf ShopServices
     *
     * @description
     * Requests User object from server to determine if user is logged in.
     * If success, stores user in-memory, otherwise HTTP 401
     *
     * @return  {IPromise}  Request promise
     */
    getAllProducts(){
        let deferred = this.$q.defer();
        this.Restangular.one('products/').get()
            .then((object) => {
                this.productsList = object;
                deferred.resolve(this.productsList);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name IShopServices.getCategoryProducts
     * @methodOf ShopServices
     *
     * @description
     * Requests productCategories object from server .
     *
     * @return  {IPromise}  Request promise
     */
    getCategoryProducts(catId: string){
        let deferred = this.$q.defer();
        this.Restangular.one('restaurants/categories' + catId).post()
            .then((object) => {
                this.categoriesList = object;
                deferred.resolve(this.categoriesList);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name IShopServices.getProductOptions
     * @methodOf ShopServices
     *
     * @description
     * Requests product options object from server.
     *
     * @return  {IPromise}  Request promise
     */
    getProductOptions(prodId: string){
        let deferred = this.$q.defer();
        this.Restangular.one('products/' + prodId + '/options').post()
            .then((object) => {
                this.productOptionsList = object;
                deferred.resolve(this.productOptionsList);
            })
            .catch((error) => {
            deferred.reject(error);
            });
        return deferred.promise;
    }

}
export default ShopServices;
