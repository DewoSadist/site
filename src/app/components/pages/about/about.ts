import './about.scss';
class AboutController {
  public text: string;

  /** @ngInject */
  constructor() {
    this.text = 'About';
  }
}

export const about = {
  templateUrl:'app/components/pages/about/about.html',
  controller: AboutController
};

