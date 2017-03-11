import './home.scss';

class HomeController {
  public text: string;

  constructor() {
    this.text = 'HomePage!';
  }
}

export const home = {
  templateUrl: 'app/components/home/home.html',
  controller: HomeController
  /*Todo bindings: { list: '<', categories: '<',  others:'<'}*/
};

