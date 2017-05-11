import './home.scss';

class HomeController {
	public vm;

	/** @ngInject */
	constructor(public $state: ng.ui.IStateService,
				public $scope,
				public NgMap: any) {
		this.vm = {};
		this.vm.types  = "['establishment']";
        // NgMap.initMap().then((NgMap) => {
         //    this.vm = this;
         //    this.vm.types = "['establishment']";
         //    this.vm.placeChanged = () => {
         //        this.vm.place = this.getPlace();
         //        console.log('location', this.vm.place.geometry.location);
         //        this.vm.map.setCenter(this.vm.place.geometry.location);
         //    }
        // });
        //
		this.NgMap.getMap({id:'my_map'}).then((map) => {
		    console.log("Map:", map);
			console.log(map.latitude, map.longitude);
			console.log('markers', map.markers);
			console.log('shapes', map.shapes);
		});
		// this.$state.go('payments.main');
		$(window).resize(() => {
			this.updateArtStyle();
		});
		this.updateArtStyle();
	}
	/**
   * @ngdoc method
   * @name getImgUrl
   * @methodOf HomeController
   *
   * @description
   * Returns img path for view
   */
	getImgUrl() {
		return 'app/components/home/img';
	}
	/**
   * @ngdoc method
   * @name updateArtStyle
   * @methodOf HomeController
   *
   * @description
   * Updates art style
   */
	updateArtStyle() {
		let leftOffset = 0;
		if(document.documentElement.clientWidth < 390){
			leftOffset = (390 - document.documentElement.clientWidth)/-2;
		}
		$('#artMain').css('left', leftOffset)
	}
	public onMapLoaded() {
		let self = this;
		self.NgMap.getMap().then((map) => {
			console.log("Map:", map);
			console.log(map.latitude, map.longitude);

		});
	}

}

export const home = {
	templateUrl: 'app/components/home/home.html',
	controller: HomeController
};
