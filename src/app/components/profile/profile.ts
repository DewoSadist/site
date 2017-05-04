import UserService from "../../services/userService/user.service";
class ProfileController {
  public operation: string;
  public operationText: string;
  public user: Object;

  /** @ngInject */
  constructor(public $state: angular.ui.IStateService, public AuthService, public UserService: UserService) {
    if (this.UserService.user && this.UserService.user.userId) {
      switch (this.operation) {
        case 'register':
          this.operationText ='Регистрация прошла успешно.';
          break;
        case 'restore':
          this.operationText ='Восстановление прошло успешно.';
          break;
        default:
          this.operationText ='Вход прошел успешно.';
          break;
      }
    } else {
      // $state.go('users.login');
    }
  }
}

export const profile = {
  templateUrl: 'app/components/profile/profile.html',
  controller: ProfileController,
  bindings: {
    user: '<',
    operation: '<'
  }
};

