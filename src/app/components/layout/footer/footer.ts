import './footer.scss';
/**
 * @ngdoc   object
 * @name    FooterController
 */
class FooterController {
	public data;
	public pages;
	public features;
	public categories;
	/** @ngInject */
	constructor(public $state) {
		this.data = {};
		this.data.phones = {
			otherCity: '585334',
			almaty: '77272585334',
			mobile: '7111'
		};
		this.pages = [
			{id:'home', link:'home', name:'Home'},
			{id:'restaurants', link:'store.restaurants',name:'Restaurants'},
			{id:'about', link:'about', name:'About'},
			{id:'contacts', link:'contacts', name:'Contacts'}
		];
		this.features = [
			{id:'login', link:'users.login', name:'Login'},
			{id:'registration', link:'registration', name:'Registration'},
			{id:'email', link:'email', name:'Email'},
			{id:'terms', link:'terms', name:'Terms of service'}
		];
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
