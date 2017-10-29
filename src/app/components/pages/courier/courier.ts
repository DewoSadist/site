import './courier.scss';
class CourierController {
  public text: string;
  /** @ngInject */
  constructor() {
    this.text = 'My brand new component!';
  }
}

export const courier = {
  templateUrl: 'app/components/pages/courier/courier.html',
  controller: CourierController
};

