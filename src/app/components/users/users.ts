/**
 * @interface IUsers
 *
 * @description
 * Interface for controllers who work with authorization (login, register or restore)
 */
export interface IUsers {
  loginData?: {
    email: string,
    password: string,
    isPasswordShown: boolean
  }
  warning?;
  isLoading: boolean;
  errors;
}
class UsersController {
  /** @ngInject */
  constructor() {
  }
}

export const users = {
  templateUrl: 'app/components/users/users.html',
  controller: UsersController
};

