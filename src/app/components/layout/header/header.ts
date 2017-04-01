import './header.scss';

/**
 * @ngdoc   object
 * @name    HeaderController
 */
class HeaderController {
	public text: string;
	public state;
	public user;
	public isAuthorized;

	/** @ngInject */
	constructor(public $scope, public $state) {
		this.state = this.$state;
		this.text = 'DEOS';

		this.$scope.$on('LoginEvent', () => {
		});
		this.$scope.$on('LogoutEvent', () => {
		});
	}
	/**
	 * @ngdoc method
	 * @name logout
	 * @methodOf HeaderController
	 *
	 * @description
	 * Logs out user via AuthService
	 */
	logout() {
		this.$state.go('home');
	}
	/**
	 * @ngdoc method
	 * @name disableEvent
	 * @methodOf HeaderController
	 *
	 * @description
	 * Disables any triggering event
	 * @param {Object}  $event  Event object
	 */
	disableEvent($event){
		$event.preventDefault();
		$event.stopImmediatePropagation();
	}
	/**
	 * @ngdoc method
	 * @name getStateTitle
	 * @methodOf HeaderController
	 *
	 * @description
	 * Returns current page's name as in breadcrumbs
	 */
	getStateTitle() {
	}
	/**
	 * @ngdoc method
	 * @name getImgUrl
	 * @methodOf HeaderController
	 *
	 * @description
	 * Returns img path for view
	 */
	getImgUrl(){
		return 'app/components/layout/header/img';
	}

}

export const header = {
	templateUrl: 'app/components/layout/header/header.html',
	controller: HeaderController
};
