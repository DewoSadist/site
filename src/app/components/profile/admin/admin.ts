class AdminController {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}

export const admin = {
  template: require('./admin.html'),
  controller: AdminController
};

