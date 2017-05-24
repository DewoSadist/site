import './admin.scss';
import UserService from "../../../services/userService/user.service";
class AdminController {
  public user;
  public text: string;
  public dynamic: boolean;
  public isAdmin: boolean;

  constructor(public UserService:UserService) {
    this.dynamic = true;
    this.isAdmin = this.UserService.isAdmin();
    this.user = this.UserService.user;
    this.text = 'My brand new component!';
  }
}

export const admin = {
  templateUrl: 'app/components/profile/admin/admin.html',
  controller: AdminController,
  bindings: {
    user: '<'
  }
};

