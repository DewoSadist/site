import './header.scss';
import {ICartServices} from "../../../services/cartServices/cart.services";
import AuthService from "../../../services/auth/auth.service";
import UserService from "../../../services/userService/user.service";
import TemplatorService from '../../../services/templator/templator.service';
import Map = google.maps.Map;
import {IShopServices} from "../../../services/shopServices/shop.services";


/**
 * @ngdoc   object
 * @name    HeaderController
 */
class HeaderController {
	public isLoading;
	public cartItemsCount;
	public text: string;
	public state;
	public user;
	public isAuthorized;
	public gMap: Map;
	public center;
	public types;
	public uAddress;
	public editAddress;
	public editShow;
	public placeChanged;
	public Map : Map;


	/** @ngInject */
	constructor(public $scope,
				public $rootScope,
				public $state,
				public CartServices: ICartServices,
				public AuthService: AuthService,
				public UserService: UserService,
				public TemplatorService: TemplatorService,
				public ShopServices: IShopServices,
				public NgMap,
				public $cookies: ng.cookies.ICookiesService,
				public $uibModal) {
		this.editShow = false;
		this.isLoading = false;
		this.uAddress = UserService.getAddress();
		this.types = "['geocode']";
		console.log("header---",this.ShopServices.getOrderStatusWeb().name);
		this.cartItemsCount = this.CartServices.getTotalCount();
		this.state = this.$state;
		this.isAuthorized = this.AuthService.isAuthorized();
		this.text = 'MunchRocket';
		$scope.center = this.UserService.getUserLocation();

		this.$scope.$on('LoginEvent', () => {
			this.isAuthorized = true;
			this.user = this.UserService.user;
		});
		this.$scope.$on('LogoutEvent', () => {
			this.isAuthorized = false;
			this.user = null;
		});
		this.$scope.onDragEnd = ($event) => {
			console.log("dragged");
			console.log($event, $event.latLng); // event
			this.center = $event.latLng;
			this.UserService.setUserLocation($event.latLng);
			this.editAddress.position = this.center;
		};

		this.$scope.onMapLoaded = ()=>{
			var self = this;
			self.NgMap.getMap("map").then(function (map) {
				self.gMap = map;
				google.maps.event.trigger(self.gMap, 'resize');
			});
		};

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
			this.uAddress = UserService.getAddress();
			console.log("uAddress",this.uAddress);
			$cookies.putObject("uPosition", this.place.geometry.location);
			UserService.setUserLocation(this.place.geometry.location);
			$rootScope.center = this.place.geometry.location;

		};

		this.NgMap.getMap("map").then((map) => {
			this.Map = map;
			this.Map.setCenter($rootScope.center);
		});
	}
	loadMap(){
		this.uAddress = this.UserService.getAddress();
		this.center = this.UserService.getUserLocation();

		setTimeout(() => {
			this.NgMap.getMap("map").then((map)=> {
				google.maps.event.trigger(map,'resize');
				map.setCenter(this.center);
			})
		}
		, 1000)
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
		let stateParent = this.$state.current.name.split('.');
		return this.TemplatorService.getStateTitle(stateParent[0]);
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
	 * @name selectAddressWeb
	 * @methodOf HeaderController
	 *
	 * @description
	 * select address
	 */
	selectAddressWeb(address){
		this.UserService.selectAddressWeb(address);
		this.uAddress = this.UserService.getAddress();
		this.ShopServices.sortRestaurants();
	}
	/**
	 * @ngdoc method
	 * @name removeAddressWeb
	 * @methodOf HeaderController
	 *
	 * @description
	 * remove address
	 */
	removeAddressWeb(address){
		this.UserService.removeAddressWeb(address);
		this.uAddress = this.UserService.getAddress();
		this.ShopServices.sortRestaurants();
	}
	/**
	 * @ngdoc method
	 * @name editAddressWeb
	 * @methodOf HeaderController
	 *
	 * @description
	 * Show address edit form with marker
	 */
	editAddressWeb(address, index) {
		this.uAddress = this.UserService.getAddress();
		this.editAddress = address;
		this.editAddress.index = index;
		this.editShow = true;

		// console.log(this.UserService.getUserLocation(),this.editAddress.location);

		setTimeout(() => {
				this.NgMap.getMap("map").then((map)=> {
					google.maps.event.trigger(map,'resize');
					map.setCenter(this.editAddress.location);
				})
			}
			, 1000)

	}
	/**
	 * @ngdoc method
	 * @name hideAddressEdit
	 * @methodOf HeaderController
	 *
	 * @description
	 * hide Address edit form
	 */
	hideAddressEdit(){
		this.editShow = false;
	}
	/**
	 * @ngdoc method
	 * @name saveAddressEdit
	 * @methodOf HeaderController
	 *
	 * @description
	 * Save edited address to main Address object
	 */
	saveAddressEdit(){
		console.log("saveAddress start");
		this.isLoading = true;
		this.uAddress = this.UserService.getAddress();
		this.uAddress.forEach((item) => {
			if(this.uAddress.indexOf(item) === this.editAddress.index){
				item.name = this.editAddress.name;
				item.location = this.editAddress.location;
				item.postal = this.editAddress.postal;
				item.delivery_instructions = this.editAddress.delivery_instructions;
			}
		});
		// console.log(this.uAddress,this.editAddress);
		this.UserService.setAddress(this.uAddress);
		this.isLoading = false;
		this.hideAddressEdit();
		// console.log(this.uAddress);
	}

	changeOrderStatus(){
		this.openOrderStatusWeb();
	}

	openOrderStatusWeb() {
		this.$uibModal.open({
			component: 'modalOrderStatus',
			keyboard: false,
			windowClass: 'order-modal'
		});
	}
}

export const header = {
	templateUrl: 'app/components/layout/header/header.html',
	controller: HeaderController
};
