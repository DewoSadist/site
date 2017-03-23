class AboutController {
  public text: string;
  public slogan: string;

  constructor() {
    this.text = 'About Us!';
    this.slogan = 'An Ultimate Delivery Solution Your products. Where you want. When you want.';
  }
}

export const about = {
  templateUrl: 'app/components/pages/about/about.html',
  controller: AboutController
};


