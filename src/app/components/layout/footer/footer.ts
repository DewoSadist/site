import './footer.scss';
/**
 * @ngdoc   object
 * @name    FooterController
 */
class FooterController {
  public text: string;
  public data;
  /** @ngInject */
  constructor() {
    this.data = {};
    this.text = 'My brand new component!';
  }
}

export const footer = {
  templateUrl: 'app/components/layout/footer/footer.html',
  controller: FooterController
};

