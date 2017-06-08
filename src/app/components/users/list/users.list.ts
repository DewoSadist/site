import './users.list.scss';
import {IUserService} from "../../../services/userService/user.service";
import {IShopServices} from "../../../services/shopServices/shop.services";

class UsersListController {
  public list;
  public showAll: boolean;

  /** @ngInject */
  constructor(public $scope: ng.IScope,
              public UserService: IUserService,
              public ShopServices: IShopServices) {
      this.showAll = false;
      if (this.UserService.isAuthorized()) {
          this.UserService.getAllUsers()
              .then((list) => {
                this.list = list;
              });
      }
  }
    /**
     * @ngdoc method
     * @name toggleShowAll
     * @methodOf AccountListController
     *
     * @description
     * Shows/hides list of all accounts
     */
    toggleShowAll() {
        this.showAll = !this.showAll;
    }
}

export const usersList = {
  templateUrl: 'app/components/users/list/users.list.html',
  controller: UsersListController
};

