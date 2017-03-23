class MyComponentController {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}

export const myComponent = {
  template: require('./myComponent.html'),
  controller: MyComponentController
};

