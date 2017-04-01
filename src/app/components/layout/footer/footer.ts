import './footer.scss';
/**
 * @ngdoc   object
 * @name    FooterController
 */
class FooterController {
	public data;
	public payments;
	public transfers;
	public categories;
	/** @ngInject */
	constructor(public $state) {
		this.data = {};
		this.data.phones = {
			otherCity: '585334',
			almaty: '77272585334',
			mobile: '7111'
		};
		this.payments = ['mobile','onai','pdd'];
 	}
 	/**
	 * @ngdoc method
	 * @name getPaymentTitle
	 * @methodOf FooterController
	 *
	 * @description
	 * Returns payment's title by shortname
	 *
	 * @param   {string}  shortName   Payment's shortname object
	 * @return  {string}  payment title
	 */
	getPaymentTitle(shortName) {
	}
	/**
	 * @ngdoc method
	 * @name getCategoryTitle
	 * @methodOf FooterController
	 *
	 * @description
	 * Returns category name by shortname
	 *
	 * @param   {string}  shortName   Category's shortname object
	 * @return  {string}  category title
	 */
	getCategoryTitle(shortName) {
	}
	/**
	 * @ngdoc method
	 * @name goToUtilities
	 * @methodOf FooterController
	 *
	 * @description
	 * Method for transitioning user to Utilities Page.
	 */
	goToUtilities(){
		if(this.$state.current.name == 'payments.main'){
			this.$state.go(this.$state.current, {
				openCategory: 'utilities'
			}, {
				reload: true
			});
		}else{
			this.$state.go('payments.main',{
				openCategory: 'utilities'
			})
		}
	}
}

export const footer = {
	templateUrl: 'app/components/layout/footer/footer.html',
	controller: FooterController
};
