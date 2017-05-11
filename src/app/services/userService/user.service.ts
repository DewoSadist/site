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
  getUser();
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

  /** @ngInject */
  constructor(public $q: ng.IQService,
              public $state: ng.ui.IStateService,
              public $filter,
              public $cookies,
              public Restangular,
              public moment,
              public TemplatorService,
              public appConfig) {
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
    return this.user && this.user.roles && (this.user.roles.indexOf("ADMIN") >-1);
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
    if (userId && this.$cookies.get('user_token')) {
      this.Restangular.withConfig(
          (RestangularConfigurer) => {
            RestangularConfigurer.setBaseUrl(this.appConfig.apiUrl + '/oauth/');
          }).one('/users/' + userId).get()
          .then((userObject) => {
            this.user = userObject;
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
}
export default UserService;
