import moment = require("moment");
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
    logo_image?: any;
    header_image_url?: string;
    cover_image_url?: string;
    status: string;
    country: string;
    city: string;
    address?: string;
    location: {lat:number, lng:number};
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
    is_show?: boolean;
}
/**
 * @interface IHour
 */
export interface IHour {
    open_id?: number;
    day: string;
    open_hour: string;
    close_hour: string;
}
/**
 * @interface IOrder
 */
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
/**
 * @interface IOrderDetails
 */
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
    id?: string;
    title: string;
    img_url: string;
    price: number;
    description: string;
    tags: string;
    discount: string;
    cus_id?: string;
    sup_id?: string;
    type_id?: string;
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

/**
 * @interface IFormContainer
 */
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
    restaurantsList;
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
    getProduct(prodId: number);
    delProduct(prodId: number);
    saveOrUpdateProduct(data);
    getCategoryProducts(catId: string);
    saveOrUpdateCategory(data);
    delCategory(catId: number);

    getProductOptions(prodId: string);
    saveOrUpdateProductOptions(data);

    getOrders();
    getOrder(orderId: number);
    getUserOrders(userId: string);
    getRestaurantOrders(resId: number);
    saveOrUpdateOrder(data);
    getImgCategories();
    rad(x: number);
    getDistance(p1, p2);

    getOrderStatusWeb();
    setOrderStatusWeb(status: any);
    sortRestaurants();
    isResOpen(time);
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
                public appConfig,
                public $cookies,
                public moment) {
        this.text = 'My brand new component!';
        if(this.$cookies.getObject("orderState") == null){
            this.setOrderStatusWeb("ASAP");
        }
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
     * @name IShopServices.saveOrUpdateProduct
     * @methodOf ShopServices
     *
     * @description
     * Save Or update product object
     *
     * @return  {IPromise}  Request product object promise
     */
    saveOrUpdateProduct(data){
        let deferred = this.$q.defer();
        this.Restangular.one('products/').customPOST(data)
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
     * @name IShopServices.getProduct
     * @methodOf ShopServices
     *
     * @description
     * get product by id
     *
     * @return  {IPromise}  Request promise
     */
    getProduct(prodId: number){
        let deferred = this.$q.defer();
        this.Restangular.one('products/'+prodId).get()
            .then((object) => {
                this.product = object;
                deferred.resolve(this.product);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name IShopServices.delProduct
     * @methodOf ShopServices
     *
     * @description
     * delete  restaurant
     *
     * @return  {IPromise}  Request promise
     */
    delProduct(prodId: number) {
        let deferred = this.$q.defer();
        this.Restangular.one("/products/" + prodId).customDELETE()
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
        this.Restangular.one('/categories/'+ catId + '/products' ).post()
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
        this.Restangular.one('products/' + prodId + '/options').get()
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
     * @name IShopServices.saveOrUpdateProductOtions
     * @methodOf ShopServices
     *
     * @description
     * Requests product options object from server.
     *
     * @return  {IPromise}  Request promise
     */
    saveOrUpdateProductOptions(data) {
        let deferred = this.$q.defer();
        this.Restangular.one('options/').customPOST(data)
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

    public rad(x:number){
        return x*Math.PI/180;
    }
    public getDistance(p1, p2) {
        // console.log(p1,p2);
        let R =6378137; //Earth`s mean radius in meter
        let dLat = this.rad(p2.lat-p1.lat);
        let dLng = this.rad(p2.lng-p1.lng);
        let a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(this.rad(p1.lat))*Math.cos(this.rad(p2.lat))*Math.sin(dLng/2)*Math.sin(dLng/2);
        let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1 - a));
        let d = R * c;
        return d;
    }

    /**
     * @ngdoc method
     * @name IShopServices.getOrderStatusWeb
     * @methodOf ShopServices
     *
     *
     * @description          Method to get Order Status
     * @return {string}      orderStatus
     *
     */
    getOrderStatusWeb() {
        let data = this.$cookies.getObject("orderState");
        return JSON.parse(data);
    }

    /**
     * @ngdoc method
     * @name IShopServices.setOrderStatusWeb
     * @methodOf ShopServices
     *
     *
     * @description          Method to set Order Status
     */
    setOrderStatusWeb(orderStatus: any) {
        this.$cookies.remove("orderState");
        if(orderStatus === 'asap') {
            this.$cookies.putObject("orderState", JSON.stringify({name:orderStatus, value: ''}));
        } else {
            this.$cookies.putObject("orderState", JSON.stringify({name:'preorder', value: orderStatus}));

        }
    }

    /**
     * @ngdoc method
     * @name IShopServices.sortRestaurants
     * @methodOf ShopServices
     *
     *
     * @description          Method to sort nearest restaurants
     */
    sortRestaurants(){
        let list_;
        // get date current


        this.getAllRestaurants()
            .then((list) => {
                let p1 = this.$cookies.getObject("uLocation");
                if (p1 != null) {
                    list_ = list;
                    for (let i = list_.length - 1; i >= 0; i--) {
                        if (list_[i].location != null) {
                            let location = list_[i].location;
                            let distance = this.getDistance(p1, JSON.parse(location));
                            // console.log("distance:", distance);

                            if (distance > 5000 && !this.isResOpen(list_[i].hours)) {
                                list_.splice(i, 1);
                                console.log("deleted");
                            }

                        }

                    }
                }

            });
        this.restaurantsList = list_;
    }

    /**
     *
     * @param time
     * @return {number}
     */
    isResOpen(hours) {
        let now = moment();
        let weekday = this.moment().format('dddd');
        let open_time, close_time;
        let OPEN = true;
        if(hours.length>0) {

        hours.forEach((item) => {
        // console.log(weekday.toLowerCase(),item.day.toLowerCase());
            if(item.day === 'EVERYDAY'){
                open_time = item.open_hour;
                close_time = item.close_hour;
            } else if( weekday.toLowerCase() === item.day.toLowerCase()){
                open_time = item.open_hour;
                close_time = item.close_hour;
            }
        });
        }

       if(open_time && close_time) {

           let dateOpen = this.moment(now).format('YYYY-MM-DD') + 'T' + open_time;
           let dateClose = this.moment(now).format('YYYY-MM-DD') + 'T' + close_time;
           // console.log(dateOpen, dateClose);

           let diffOpenMC = this.moment().diff(dateOpen);
           let diffCloseMC = this.moment().diff(dateClose);
           // console.log(diffOpenMC, diffCloseMC);

           let diffOpenH = this.moment.duration(diffOpenMC).asHours();
           let diffCloseH = this.moment.duration(diffCloseMC).asHours();
           // console.log(diffOpenH, diffCloseH);

           if(Math.abs(diffOpenH)< 0.5 || Math.abs(diffCloseH) < 0.5){
               OPEN = false;
           }
       }

        return OPEN;
    }


}
export default ShopServices;
