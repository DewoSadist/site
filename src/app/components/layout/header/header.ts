import './header.scss';
import {ICartServices} from "../../../services/cartServices/cart.services";

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
				public CartServices: ICartServices
	) {
		this.cartItemsCount = this.CartServices.getTotalCount();
		this.state = this.$state;
		this.text = 'DEOS';
		this.showCart = false;

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
	/**
	 * @ngdoc method
	 * @name toggleShowCart
	 * @methodOf HeaderController
	 *
	 * @description
	 * Shows/hides cart sidebar
	 */
	toggleShowCart() {
		this.showCart = !this.showCart;
	}
}

export const header = {
	templateUrl: 'app/components/layout/header/header.html',
	controller: HeaderController
};
