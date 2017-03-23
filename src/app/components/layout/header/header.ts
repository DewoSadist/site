import './header.scss';
/**
 * @ngdoc   object
 * @name    HeaderController
 */
class HeaderController {
  public text: string;
  public data;

  /** @ngInject */
  constructor() {
    this.data = {};
    this.text = 'My brand new component!';
    console.log('header');
  }
}

export const header = {
  templateUrl: 'app/components/layout/header/header.html',
  controller: HeaderController
};

