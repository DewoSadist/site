import './header.scss';
import {ICartServices} from "../../../services/cartServices/cart.services";
import AuthService from "../../../services/auth/auth.service";

/**
 * @ngdoc   object
 * @name    HeaderController
 */
class HeaderController {
	public cartItemsCount;
	public text: string;
	public state;
	public user;
	public isAuthorized;
	public showCart;

	/** @ngInject */
	constructor(public $scope,
				public $state,
				public CartServices: ICartServices,
				public AuthService: AuthService
	) {
		this.cartItemsCount = this.CartServices.getTotalCount();
		this.state = this.$state;
		this.isAuthorized = this.AuthService.isAuthorized();
		this.text = 'DEOS';

		this.$scope.$on('LoginEvent', () => {
			this.isAuthorized = true;
			// this.user = this.UserService.user;
		});
		this.$scope.$on('LogoutEvent', () => {
			this.isAuthorized = false;
			// this.user = null;
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
		this.AuthService.logout()
			.then((response) => {
				this.AuthService.logoutEventBroadcast();
				this.$state.go('home');
		})
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
