import './home.scss';

class HomeController {
	/** @ngInject */
	constructor(public $state: ng.ui.IStateService, public $scope) {
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

}

export const home = {
	templateUrl: 'app/components/home/home.html',
	controller: HomeController
};
