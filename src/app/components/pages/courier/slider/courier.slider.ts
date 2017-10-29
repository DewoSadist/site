class CourierSliderController {
  // Sets an interval to cycle through the slides. You need a number bigger than 0 to make the interval work.
  public switchInterval: number;
  // Index of current active slide.
  public activeSlide: number;
  // Slides content to display
  public slides: [any];
  // Disables the looping of slides. Setting false to an expression which evaluates to a truthy value will prevent looping.
  public noWrapSlides: boolean;
  /** @ngInject */
  constructor() {
    this.switchInterval = 3000;
    this.switchInterval = 0;
    this.noWrapSlides = false;
    this.activeSlide = 0;

  }

  /**
   * @ngdoc method
   * @name getImgUrl
   * @methodOf HomeSliderController
   *
   * @description
   * Returns img path for view
   */
  getImgUrl() {
    return 'app/components/pages/courier/slider/img';
  }
}

export const courierSlider = {
  templateUrl :'app/components/pages/courier/slider/courier.slider.html',
  controller: CourierSliderController
};

