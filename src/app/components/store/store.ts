class StoreController {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}

export const store = {
  templateUrl: 'app/components/store/store.html',
  controller: StoreController
};

