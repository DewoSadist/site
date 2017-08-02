import './home.slider.scss';
import Map = google.maps.Map;
import Autocomplete = google.maps.places.Autocomplete;
import UserService from "../../../services/userService/user.service";
import ShopServices from "../../../services/shopServices/shop.services";

class HomeSliderController {
	public place : Autocomplete;
	longitude: number;
	latitude: number;
	public Map : Map;
	public types;
	public placeChanged;
	public address;

	// Sets an interval to cycle through the slides. You need a number bigger than 0 to make the interval work.
	public switchInterval: number;
	// Index of current active slide.
	public activeSlide: number;
	// Slides content to display
	public slides: [any];
	// Disables the looping of slides. Setting false to an expression which evaluates to a truthy value will prevent looping.
	public noWrapSlides: boolean;
	/**
	 * for more options go to the https://angular-ui.github.io/bootstrap/#/carousel
	 * uib-carousel are used for this component
	 */
	/** @ngInject */
	constructor(public UserService: UserService,
				public ShopServices: ShopServices,
				public $scope,
				public $rootScope,
				public NgMap,
				public $cookies: ng.cookies.ICookiesService) {
		this.switchInterval = 3000;
		this.switchInterval = 0;
		this.noWrapSlides = false;
		this.activeSlide = 0;

		console.log(this);
		this.longitude = 9.191383;
		this.latitude =  45.464211;
		this.types = "['geocode']";
		console.log(UserService.getAddress());

		this.placeChanged = function() {
			console.log(this);
			console.log(this.getPlace());
			this.place = this.getPlace();

			this.address = {
				name:this.place.vicinity,
				address:this.place.name,
				location: {
							lat:this.place.geometry.location.lat(),
							lng:this.place.geometry.location.lng()
				},
				choose: true,
			};

			UserService.initUserAddress(this.address);

			$cookies.putObject("uPosition", this.place.geometry.location);
			UserService.setUserLocation(this.place.geometry.location);
			$rootScope.center = this.place.geometry.location;
		};

		this.NgMap.getMap("map").then((map) => {
			this.Map = map;
			this.Map.setCenter($rootScope.center);
		});
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
		return 'app/components/home/img';
	}
}

export const homeSlider = {
	templateUrl: 'app/components/home/slider/home.slider.html',
	controller: HomeSliderController
};

