class StoreController {
  public text: string;
  /** @ngInject */
  constructor() {
    this.text = 'My brand new component!';
  }
}

export const store = {
  templateUrl: 'app/components/store/store.html',
  controller: StoreController
};

