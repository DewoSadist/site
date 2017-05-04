class RegisterController {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}

export const register = {
  template: require('./register.html'),
  controller: RegisterController
};

