/**
 * @interface IRestaurant
 */
export interface IRestaurant {
    id?: string;
    title: string;
    slug: string;
    tags?: string;
    description?: string;
    logo_image_url?: string;
    header_image_url?: string;
    cover_image_url?: string;
    status: string;
    country: string;
    city: string;
    address?: string;
    location: string;
    fax?: string;
    phone?: string;
    postal_code?: string;
    open_id?: string;
    ratings: number;
    user_id?: string;
    hours?: Array<IHour>;
    tax: number;
    delivery: number;
    service_fee: number;
    small_order_fee: number;
}

export interface IHour {
    open_id?: number;
    day: string;
    open_hour: string;
    close_hour: string;
}

export interface IOrder {
    id?: number;
    res_id: number;
    res_name: string;
    tax: number;
    delivery: number;
    service_fee: number;
    small_order_fee: number;
    quantity: number;
    order_amount: number;
    status: string;
    user_id: string;
    reorder: number;
    order_day: string;
    order_time: string;
    req_day: string;
    req_time: string;
    ship_via: string;
    orderDetails: Array<IOrderDetails>;
    client_name: string;
    client_address: string;
    client_number: string;
    client_email: string;
    payment: string;
}
export interface IOrderDetails {
    id?: number;
    title: string;
    employee_id: number;
    unit_price: number;
    quantity: number;
    note: string;
    additional: string;
}
/**
 * @interface IProductCategory
 */
export interface IProductCategory {
    id?: string;
    name: string;
    res_id: number;
    tags: string;
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
    res_id: string,
    res_name: string,
    id: string;
    name: string;
    isRequired: number;
    isFree: number;
    isOne: number
    prod_id: number;
    checked: string;
    productOptionsItems: Array<IProductOptionItem>;
}
/**
 * @interface IProductOptionItem
 */
export interface IProductOptionItem {
    title: string;
    id: number;
    name: string;
    price: number;
    checked: string;
}

export interface IFormContainer {
    isLoading?: boolean;
    resetErrors();
    startLoading?();
    stopLoading?();
    hasNoErrors(): boolean;
}

/**
 * @interface IShopServices
 */
export interface IShopServices {
    userRestaurantsList;
    getAllRestaurants();
    getUserRestaurants(userId: string);
    getRestaurant(resId: string);
    addRestaurant(resObj: any);
    delRestaurant(resId: string);
    modRestaurant(resObj: any);

    getAllCategories();
    getRestaurantCategories(resId: string);
    saveOrUpdateRestaurant(data);

    getAllProducts();
    getCategoryProducts(catId: string);
    saveOrUpdateCategory(data);
    delCategory(catId: number);

    getProductOptions(prodId: string);

    getOrders();
    getOrder(orderId: number);
    getUserOrders(userId: string);
    getRestaurantOrders(resId: number);
    saveOrUpdateOrder(data);
    getImgCategories();


}

/**
 * @ngdoc object
 * @name ShopServices
 */
class ShopServices implements IShopServices {
    public restaurantsList: Array<IRestaurant>;
    public userRestaurantsList: Array<IRestaurant>;
    public restaurant: IRestaurant;
    public orderList: Array<IOrder>;

    public categoriesList: Array<IProductCategory>;
    public category: IProductCategory;

    public productsList: Array<IProduct>;
    public product: IProduct;

    public productOptionsList: Array<IProductOption>;

    public text: string;
    public imgCategories = [];

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
    getAllCategories() {
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
        this.Restangular.one('restaurants/' + resId + '/categories').get()
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
     * @name IShopServices.saveOrUpdateRestaurant
     * @methodOf ShopServices
     *
     * @description
     * Save Or update Restaurant object
     *
     * @return  {IPromise}  Request restaurant object promise
     */
    saveOrUpdateRestaurant(data){
        let deferred = this.$q.defer();
        this.Restangular.one('restaurants/').customPOST(data)
            .then((object) => {
                deferred.resolve(object);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }
    /**
     * @ngdoc method
     * @name IShopServices.saveOrUpdateCategory
     * @methodOf ShopServices
     *
     * @description
     * Save Or update Category object
     *
     * @return  {IPromise}  Request category object promise
     */
    saveOrUpdateCategory(data) {
        let deferred = this.$q.defer();
        this.Restangular.one('restaurants/categories').customPOST(data)
            .then((object) => {
                deferred.resolve(object);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }
    /**
     * @ngdoc method
     * @name IShopServices.delCategory
     * @methodOf ShopServices
     *
     * @description
     * delete  restaurant
     *
     * @return  {IPromise}  Request promise
     */
    delCategory(catId: number) {
        let deferred = this.$q.defer();
        this.Restangular.one("/restaurants/categories/" + catId).customDELETE()
            .then((responce) => {
                deferred.resolve(responce);
            })
            .catch((error) => {
                deferred.reject(error);
            })
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
    getAllProducts() {
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
    getCategoryProducts(catId: string) {
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
    getProductOptions(prodId: string) {
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

    /**
     * @ngdoc method
     * @name IShopServices.getUserRestaurants
     * @methodOf ShopServices
     *
     * @description
     * Requests user restaurants list object from server.
     *
     * @return  {IPromise}  Request promise
     */
    getUserRestaurants(userId: string) {
        let deferred = this.$q.defer();
        this.Restangular.one("/users/" + userId + "/restaurants").customGET()
            .then((object) => {
                this.userRestaurantsList = object;
                deferred.resolve(this.userRestaurantsList);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name IShopServices.getUserRestaurants
     * @methodOf ShopServices
     *
     * @description
     * Add new restaurant to the server
     *
     * @return  {IPromise}  Request promise
     */
    addRestaurant(resObj: any) {

    }

    /**
     * @ngdoc method
     * @name IShopServices.delRestaurant
     * @methodOf ShopServices
     *
     * @description
     * delete  restaurant
     *
     * @return  {IPromise}  Request promise
     */
    delRestaurant(resId: string) {
        let deferred = this.$q.defer();
        this.Restangular.one("/restaurants/" + resId).customDELETE()
            .then((responce) => {
                deferred.resolve(responce);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name IShopServices.getUserRestaurants
     * @methodOf ShopServices
     *
     * @description
     * modify restaurant.
     *
     * @return  {IPromise}  Request promise
     */
    modRestaurant(resObj: any) {

    }
    /**
     * @ngdoc method
     * @name IShopServices.getOrders
     * @methodOf ShopServices
     *
     * @description
     * get All orders List
     *
     * @return  {IPromise}  Request promise
     */
    getOrders() {
        let deferred = this.$q.defer();
        this.Restangular.one("orders/").customGET()
            .then((list) => {
                this.orderList = list;
                deferred.resolve(this.orderList);
            })
            .catch((error) => {
                    deferred.reject(error);
                }
            );

        return deferred.promise;
    }
    getOrder(orderId: number){
        console.log("orderId:", orderId);
        let deferred = this.$q.defer();
        this.Restangular.one("orders/" + orderId).customGET()
            .then((object) => {
            console.log(object);
            deferred.resolve(object)
        })
        .catch((error) => {
                deferred.reject(error);
            }
        );
        console.log("order:", deferred.promise);
        return deferred.promise;
    }
    /**
     * @ngdoc method
     * @name IShopServices.saveOrUpdateOrder
     * @methodOf ShopServices
     *
     * @description
     * Save Or update Order object
     *
     * @return  {IPromise}  Request order object promise
     */
    saveOrUpdateOrder(data) {
        let deferred = this.$q.defer();
        this.Restangular.one('orders/').customPOST(data)
            .then((object) => {
                deferred.resolve(object);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }
    /**
     * @ngdoc method
     * @name IShopServices.getUserOrders
     * @methodOf ShopServices
     *
     * @description
     * get orders have made  by user
     *
     * @return  {IPromise}  Request promise
     */
    getUserOrders(userId: string) {
        let deferred = this.$q.defer();
        this.Restangular.one("/users/" + userId + "/orders").get()
            .then((object) => {
                this.orderList = object;
                deferred.resolve(this.orderList);
            })
            .catch((error) => {
                    deferred.reject(error);
                }
            );
        return deferred.promise;
    }

    getRestaurantOrders(resId: number) {
        let deferred = this.$q.defer();
        this.Restangular.one("/restaurants/" + resId + "/orders").get()
            .then((object) => {
            this.orderList = object;
            deferred.resolve(this.orderList);
        })
        .catch((error) => {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    setCategories(scope, list) {
        scope.imgCategories = list;
    }
    getImgCategories() {
        let promise = this.Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('');
            RestangularConfigurer.setRequestSuffix('.json');
        }).all('categories').getList();
        return this.promiseWrapper(promise, this.setCategories);
    }
    /**
     * Private method wraps API call promise into another promise, during which we
     * execute callbacks, e.g. locally store the response objects
     *
     * @param {promise} promise - Actual promise
     * @param {function} callback - void function taking two parameters, scope and response object
     * @return {promise} Wrapper promise
     */
    private promiseWrapper(promise, callback) {
        let self = this;
        var deferred = this.$q.defer();
        promise.then(
            (response) => {
                callback(self, response);
                deferred.resolve(response);
            },
            (error) => {
                deferred.reject(error);
            }

        );
        return deferred.promise;
    }
}
export default ShopServices;
