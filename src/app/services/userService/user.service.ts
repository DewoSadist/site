import {isNullOrUndefined} from "util";
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
  city:string,
  address: string,
  location: any,
  roles: string,
  firstname?: string,
  secondname?: string,
  lastname?: string,
  user_id: string
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
  setAddress(data:string);
  sendEmail(data:any);
}

/**
 * @ngdoc object
 * @name UserService
 */
class UserService implements IUserService{
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
              public $cookies:ng.cookies.ICookiesService,
              public Restangular,
              public moment,
              public TemplatorService,
              public appConfig) {
    this.userAddress = "";
    this.userLocation = "";
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
            console.log(("userObject:",this.user));
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
  getAllUsers(){
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
  delUser(userId:string){

  }
  /**
   * @ngdoc method
   * @name UserService.updateUser
   * @methodOf UserService
   *
   * @description
   * Update User Details
   */
  updateUser(userId:string) {

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
  getUserLocation(){
    let location = this.$cookies.getObject("uLocation");
    if(location == null) {
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
  setUserLocation(data){
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
  getAddress(){
    let address = this.$cookies.getObject("uAddress");
    if(address == null) {
      address = this.userAddress;
    }
    return address;
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
  setAddress(data:string){
    this.userAddress = data;
    this.$cookies.remove("uAddress");
    this.$cookies.putObject("uAddress", data);
  }

  /**
   * @ngdoc method
   * @name UserService.senEmail
   * @methodOf UserService
   *
   * @description
   * send email for different purposes
   *
   * @param {string}  data  email body
   */
  sendEmail(data) {
    let deferred = this.$q.defer();
    this.Restangular.one('email').customPOST(data)
        .then((response) => {
          deferred.resolve(response);
        })
        .catch((error) => {
          deferred.reject(error);
        });
    return deferred.promise;
  }
}
export default UserService;
