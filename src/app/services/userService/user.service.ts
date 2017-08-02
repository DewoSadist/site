import {isNullOrUndefined} from "util";
import {type} from "os";
/**
 * @interface IUserObject
 */
export interface IUserObject {
    username: string,
    enabled: string,
    email: string,
    phone?: string,
    postal_code?: string,
    country: string,
    city: string,
    address: string,
    location: any,
    roles: string,
    firstname?: string,
    secondname?: string,
    lastname?: string,
    user_id: string
}
export interface ILocation {
    lat: string,
    lng: string
}
export interface IUserAddress {
    name: string,
    address: string,
    location: ILocation,
    postal?: string,
    delivery_instructions?: string,
    choose?: boolean
}
export interface IUserService {
    user;
    isAuthorized();
    getUser(userId);
    getUser();
    getAllUsers();
    delUser(userId: string);
    updateUser(userId: string);
    getOrderHistory(startDate, endDate);
    getUserLocation();
    setUserLocation(data);
    getAddress();
    setAddress(data:any);
    sendEmail(data: any);
    initUserAddress(init_address);
    selectAddressWeb(address);
    removeAddressWeb(address);
    getSelectedAddress();
    getSelectedAddressObj();
    updateUserAddress()
    getDay();
}

/**
 * @ngdoc object
 * @name UserService
 */
class UserService implements IUserService {
    /**
     * @ngdoc       property
     * @name        UserService#user
     * @propertyOf  UserService
     * @returns     {IUserObject}    User object stored constantly in this service
     */
    public user: IUserObject;
    public usersList;
    public userAddress;
    public userLocation;

    /** @ngInject */
    constructor(public $q: ng.IQService,
                public $state: ng.ui.IStateService,
                public $filter,
                public $cookies: ng.cookies.ICookiesService,
                public Restangular,
                public moment,
                public TemplatorService,
                public appConfig) {
        this.userAddress = "";
        this.userLocation = "";
        this.getDay();
    }

    /**
     * @ngdoc method
     * @name UserService.isAuthorized
     * @methodOf UserService
     *
     * @description
     * Returns true if User Object has been instantiated in UserService,
     * meaning that user is logged in
     *
     * @return {boolean}    true if user object is present
     */
    isAuthorized() {
        return !isNullOrUndefined(this.user && this.user.user_id);
    }

    /**
     * @ngdoc method
     * @name UserService.isAdmin
     * @methodOf UserService
     *
     * @description
     * Returns true if user has banking role
     *
     * @return {IUserObject|string|boolean}
     */

    isAdmin() {
        return this.user && this.user.roles && (this.user.roles.indexOf("ADMIN") > -1);
    }

    /**
     * @ngdoc method
     * @name UserService.getUser
     * @methodOf UserService
     *
     * @description
     * Requests User object from server to determine if user is logged in.
     * If success, stores user in-memory, otherwise HTTP 401
     *
     * @param   {string}    userId   user ID from server
     * @return  {IPromise}  Request promise
     */
    getUser(userId = null) {
        let deferred = this.$q.defer();
        if (!userId && this.user && this.user.user_id) {
            userId = this.user.user_id; // take existing one from User service
        } else if (!userId) {
            userId = this.$cookies.get('user_id'); // take existing one from cookies
        }

        // send only if both User ID and user token is known
        if (userId) {
            this.Restangular.withConfig(
                (RestangularConfigurer) => {
                    RestangularConfigurer.setBaseUrl(this.appConfig.apiUrl + '/api/');
                }).one('/users/' + userId).get()
                .then((userObject) => {
                    this.user = userObject;
                    console.log(("userObject:", this.user));
                    deferred.resolve(userObject);
                })
                .catch((error) => {
                    // this.AuthService
                    deferred.reject(error);
                });
        } else {
            deferred.resolve(null);
        }
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name UserService.flushUser
     * @methodOf UserService
     *
     * @description
     * Flushes current user
     */
    flushUser() {
        this.user = null;
    }

    /**
     * @ngdoc method
     * @name UserService.getAllUsers
     * @methodOf UserService
     *
     * @description
     * Return all users
     */
    getAllUsers() {
        let deferred = this.$q.defer();
        this.Restangular.one('users/list').customGET()
            .then((list) => {
                this.usersList = list;
                deferred.resolve(this.usersList);
            })
            .catch((error) => {
                deferred.reject(error);
            });
        return deferred.promise;

    }

    /**
     * @ngdoc method
     * @name UserService.delUser
     * @methodOf UserService
     *
     * @description
     * delete  current user or make it inactive
     */
    delUser(userId: string) {

    }

    /**
     * @ngdoc method
     * @name UserService.updateUser
     * @methodOf UserService
     *
     * @description
     * Update User Details
     */
    updateUser(userId: string) {

    }

    /**
     * @ngdoc method
     * @name UserService.updateUserAddress
     * @methodOf UserService
     *
     * @description
     * Update User Address
     */
    updateUserAddress(){
            let userId = this.$cookies.get('user_id');
            let deferred = this.$q.defer();
            if (!userId && this.user && this.user.user_id) {
                userId = this.user.user_id; // take existing one from User service
            } else if (!userId) {
                userId = this.$cookies.get('user_id'); // take existing one from cookies
            }
            let data = {address: JSON.stringify(this.getAddress())};
            // send only if both User ID and user token is known
            if (userId) {
                this.Restangular.withConfig(
                    (RestangularConfigurer) => {
                        RestangularConfigurer.setBaseUrl(this.appConfig.apiUrl + '/api/');
                    }).one('/users/' + userId + "/address").customPOST(data)
                    .then((responce) => {
                        deferred.resolve(responce);
                    })
                    .catch((error) => {
                        deferred.reject(error);
                    });
            } else {
                deferred.resolve(null);
            }
            return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name UserService.getPaymentHistory
     * @methodOf UserService
     *
     * @description
     * Gets the History list from API
     *
     * @param {string}  startDate   get history from date
     * @param {string}  endDate     get history to date
     * @return {IPromise<any>|IPromise<T>} - Promise with response
     */
    getOrderHistory(startDate: string, endDate: string) {
        var deferred = this.$q.defer();

        let promise =
            this.Restangular.all('/users/' + this.user.user_id + '/history?startDate=' + startDate + '&endDate=' + endDate)
                .withHttpConfig({ignoreLoadingBar: true})
                .getList();

        promise
            .then((response) => {
                deferred.resolve(this.processHistoryList(response, startDate, endDate));
            })
            .catch((error) => {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    private processHistoryList(orders, startDate: string, endDate: string) {
        orders.startDate = startDate;
        orders.endDate = endDate;
        // orders.map((order) => {
        //   return this.processHistoryItem(order);
        // });
        return orders;
    }

    /**
     * @ngdoc method
     * @name UserService.getUserLocation
     * @methodOf UserService
     *
     * @description
     * Gets the user Location from cookies
     *
     * @return location {lat:"",lng:""}
     */
    getUserLocation() {
        let location = this.$cookies.getObject("uLocation");
        if (location == null) {
            location = this.userLocation;
        }
        return location;
    }

    /**
     * @ngdoc method
     * @name UserService.setUserLocation
     * @methodOf UserService
     *
     * @description
     * set user Location object into the cookie
     *
     * @param {data}  location {lat:"",lng:""}
     */
    setUserLocation(data) {
        this.userLocation = data;
        this.$cookies.remove("uLocation");
        this.$cookies.putObject("uLocation", data);
    }

    /**
     * @ngdoc method
     * @name UserService.getAddress
     * @methodOf UserService
     *
     * @description
     * Gets the user Address from cookies
     *
     * @return map address
     */
    getAddress() {
        let address = this.$cookies.getObject("uAddress");
        if (address == null || address == 'undefined' || address == '') {
            if(this.userAddress != null && this.userAddress != 'undefined' && this.userAddress != '')
            if(typeof this.userAddress === 'string'){
                address = JSON.parse(this.userAddress);
            } else {
                address = this.userAddress;
            }

        } else {
            if(typeof address ==='string')
                address = JSON.parse(address);
        }
        return address;
    }

    /**
     * @ngdoc method
     * @name UserService.getSelectedAddress
     * @methodOf UserService
     *
     * @description
     * Get selected user Address from cookies or variable
     *
     * @return  address
     */
    getSelectedAddress() {
        let name = "";
        if (this.userAddress != null && this.userAddress.length > 0) {
            console.log(this.userAddress);
            if(typeof this.userAddress === 'string'){
                this.userAddress = JSON.parse(this.userAddress);
            }
            this.userAddress.forEach((item) => {
                if (item.choose == true) {
                    name = item.address;
                }
            })
        } else {
            let address = this.$cookies.getObject("uAddress");
            if (address != null || address != 'undefined') {
                if(typeof address === 'string'){
                    address = JSON.parse(address);
                }
                address.forEach((item) => {
                    if (item.choose == true) {
                        name = item.address;
                    }
                })
            }
        }
        return name;
    }

    /**
     * @ngdoc method
     * @name UserService.getSelectedAddressObj
     * @methodOf UserService
     *
     * @description
     * Get selected user Address from cookies or variable
     *
     * @return object address
     */
    getSelectedAddressObj() {
        let obj = {};
        if (this.userAddress != null && this.userAddress.length > 0) {
            console.log(this.userAddress);
            if(typeof this.userAddress === 'string'){
                this.userAddress = JSON.parse(this.userAddress);
            }
            this.userAddress.forEach((item) => {
                if (item.choose == true) {
                    obj = item;
                }
            })
        } else {
            let address = this.$cookies.getObject("uAddress");
            if (address != null || address != 'undefined') {
                if(typeof address === 'string'){
                    address = JSON.parse(address);
                }
                address.forEach((item) => {
                    if (item.choose == true) {
                        obj = item;
                    }
                })
            }
        }
        return obj;
    }
    /**
     * @ngdoc method
     * @name UserService.setAddress
     * @methodOf UserService
     *
     * @description
     * set user address to cookies
     *
     * @param {string}  data   formatted address
     */
    setAddress(data) {
        this.userAddress = data;
        this.$cookies.remove("uAddress");
        this.$cookies.putObject("uAddress", data);
        if(this.isAuthorized()) {
            this.updateUserAddress();
        }
    }

    /**
     * @ngdoc method
     * @name UserService.sendEmail
     * @methodOf UserService
     *
     * @description
     * send email for different purposes
     *
     * @param {string}  data  email body
     */
    sendEmail(data) {
        let deferred = this.$q.defer();
        this.Restangular.one('email/').customPOST(data)
            .then((object) => {
                deferred.resolve(object);
            })
            .catch((error) => {

                deferred.reject(error);
            });
        return deferred.promise;
    }

    initUserAddress(init_address) {
        let cookieObj = this.$cookies.getObject("uAddress");
        if (!this.isAuthorized()) {
            /* check for existing uAddress in cookies, if we have then add to existing and mark as default */

            if (cookieObj != null && cookieObj != '' && typeof(cookieObj) != 'undefined') {


                cookieObj.forEach((item) => {
                    item.choose = false;
                });

                cookieObj.push(init_address);

                this.setAddress(cookieObj);

            } else {

                let array = [];
                array.push(init_address);

                this.setAddress(array);
            }
        } else {
            if (cookieObj != null && cookieObj != '' && typeof(cookieObj) != 'undefined') {

                let uAddress;
                if(typeof this.user.address === 'string'){
                    uAddress = JSON.parse(this.user.address);
                } else {
                    uAddress = this.user.address;
                }

                // cookieObj.forEach((item) => {
                //     uAddress.push(item);
                // });

                uAddress.forEach((item) => {
                    item.choose = false;
                });

                uAddress.push(init_address);

                this.setAddress(uAddress);
            } else {
                let sAddress;

                if (typeof this.user.address === 'string'){
                    sAddress = JSON.parse(this.user.address)
                } else {
                    sAddress = this.user.address;
                }

                sAddress.push(init_address);

                this.setAddress(sAddress);

            }
        }
    }

    selectAddressWeb(address){
        let addressList = this.getAddress();
        addressList.forEach((item) => {
            item.choose = false;
            if(item.address == address){
                item.choose = true;
                this.setUserLocation(item.location);
            }
        });
        this.setAddress(addressList);
    }

    removeAddressWeb(address){
        let addressList = this.getAddress();
        for (let i = addressList.length - 1; i >= 0; i--) {
            if (addressList[i].address == address) {
                addressList.splice(i, 1);
            }
        }
        this.setAddress(addressList);
    }
    getDay(){
        var d = new Date();
        console.log(d.getUTCFullYear(),
        d.getUTCDate(),
        d.getMonth()+1,
        d.getDay(),
        d.getUTCDay(),
        d.getHours(),":",d.getMinutes());
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; //the hour '0' should be '12'
        let strMinutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + strMinutes + ' ' + ampm;
        console.log(strTime);

    }
}
export default UserService;
