class AboutController {
  public text: string;

  constructor() {
    this.text = 'About';
  }
}

export const about = {
  templateUrl:'app/components/pages/about/about.html',
  controller: AboutController
};

