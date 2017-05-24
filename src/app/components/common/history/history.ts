// import PaymentsService from '../../payments/payments.service';
import { isNullOrUndefined } from "util";
import { IUserService } from "../../../services/userService/user.service";
import { HistoryBaseController } from "./history.base";
import './history.scss';
import {IShopServices} from "../../../services/shopServices/shop.services";
/**
 * @ngdoc object
 * @name HistoryController
 */
class HistoryController extends HistoryBaseController {
	public filteredList: any;
	public categorySelected;
	public categories;
	public historyType;

	/** @ngInject */
	constructor(public $scope: ng.IScope,
	            public $state: angular.ui.IStateService,
	            public $filter: ng.IFilterService,
	            public UserService: IUserService,
	            public ShopServices: IShopServices,
	            public TransfersService,
	            public TemplatorService,
	            public moment) {
		super($scope, $state, $filter, UserService,  TemplatorService, moment);
		this.updateHistory();
		if (this.historyType) {
			switch (this.historyType) {
				case 'payment':
					this.categories = [
						{
							value: 'all',
							label: 'All'
						}, {
							value: 'utilities',
							label: this.TemplatorService.getCategoryTitle('utilities')
						},
						{
							value: 'pdd',
							label: this.TemplatorService.getPaymentTitle('pdd')
						}
					];
					break;
				case 'transfer':
					let transfers = this.TransfersService.getList('external');
					transfers = transfers.filter((item)=> {
						return item.disabled == false;
					});
					this.categories = transfers.map((item)=> {
						return {
							value: item.link,
							label: item.name
						}
					});
					this.categories.unshift({
						value: 'all',
						label: 'Все переводы'
					});
					break;
				default:
					this.categories = [
						{
							value: 'all',
							label: 'Вся выписка'
						},
						{
							value: 'transfer',
							label: 'Все переводы'
						},
						{
							value: 'payment',
							label: 'Все платежи'
						}
					];
					break;
			}
		}
	}

	/**
	 * @ngdoc method
	 * @name updateHistory
	 * @methodOf HistoryController
	 *
	 * @description
	 * Updates the history list from UserService
	 *
	 * @param {string} startDateString  Get history from date. 1 month before today by default.
	 * @param {string} endDateString    Get history to date. Today by default .
	 */
	updateHistory(startDateString: string = null, endDateString: string = null) {
		let endDate, startDate;
		if (startDateString === null && endDateString === null) {
			let momentObject = new this.moment();
			endDate = momentObject.format('YYYY-MM-DD');
			this.endDateString = momentObject.format('DD.MM.YYYY');
			momentObject.subtract({weeks: 1});
			startDate = momentObject.format('YYYY-MM-DD');
			this.startDateString = momentObject.format('DD.MM.YYYY');
		} else {
			let endDateMoment = new this.moment(endDateString, 'DD.MM.YYYY');
			endDate = endDateMoment.format('YYYY-MM-DD');
			let startDateMoment = new this.moment(startDateString, 'DD.MM.YYYY');
			startDate = startDateMoment.format('YYYY-MM-DD');
		}
		this.startLoading();
		this.UserService.getOrderHistory(startDate, endDate)
		.then((list) => {
			this.list = list;
			this.selectCategory(this.categorySelected);
			this.stopLoading();
		})
		.catch((error) => {
			this.stopLoading();
		});
	}



	/**
	 * @ngdoc method
	 * @name selectCategory
	 * @methodOf HistoryController
	 *
	 * @description
	 * Filters all history items by selected category
	 * @param {object} category selected category object
	 */
	selectCategory(category) {
		if (category) {
			this.categorySelected = category;
			if (this.historyType == 'payment') {
				this.filteredList = this.list.filter((item)=> {
					if (category.value == 'pdd') {
						// return this.ShopServices.isPaymentPdd(item.serviceShortName);
					} else if (category.value == 'utilities') {
						// return this.ShopServices.isPaymentUtility(item.serviceShortName);
					} else {
						return item.serviceType == this.historyType;
					}
				});
			} else if (this.historyType == 'transfer') {
				this.filteredList = this.list.filter((item)=> {
					if (category.value != 'all') {
						return item.serviceShortName == category.value;
					} else {
						return item.serviceType == this.historyType;
					}
				});
			} else {
				this.filteredList = this.list.map((item)=> {
					return item;
				});
			}
		} else {
			this.filteredList = this.list;
		}
	}
}

export const history = {
	templateUrl: 'app/components/common/history/history.html',
	controller: HistoryController,
	bindings: {
		list: '<',
		showCount: '<',
		isResponsive: '<',
		showFilter: '<',
		historyType: '<'
	}
};

