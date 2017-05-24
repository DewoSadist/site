import UserService from "../../../services/userService/user.service";
class ProfileMainController {
  public user;
  public isAdmin: boolean;
  public text: string;

  public isAuthorized: boolean;

  /** @ngInject */
  constructor(public $state: angular.ui.IStateService,
              public $uibModal,
              public AuthService,
              public UserService: UserService,
              public tinycolor) {
    if (this.UserService.user && this.UserService.user.user_id) {
      this.user = this.UserService.user;
      // this.UserService.getMyContracts()
    //   //     .then((list) => {
    //   //       this.myPayments = list;
    //   //     });
    //   // this.UserService.getSavedCards()
    //   //     .then((list) => {
    //   //       this.cardList = list;
    //   //     });
    } else {
      $state.go('users.login');
    }
    this.isAdmin = true;
    this.text = 'My brand new component!';
    this.isAuthorized = this.UserService.isAuthorized();
    if (this.isAuthorized) {
      this.isAdmin = this.UserService.isAdmin();
    }
  }
}

export const profileMain = {
  templateUrl: 'app/components/profile/main/main.html',
  controller: ProfileMainController,
  bindings: {
    user: '<'
  }
};

