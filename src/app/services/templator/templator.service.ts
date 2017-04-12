import { isNullOrUndefined } from "util";

/**
 * @typedef TextLocalized - Localization string
 */
type TextLocalized = {
	ru: string,
	en: string,
	kz: string
}

/**
 * @typedef VisualObject - Visual object that gets passed to one of paymentControllers to render forms
 */
export type VisualObject = {
	title: TextLocalized 		// Payment section title or header
	name: TextLocalized, 		// service name included in invoices
	subtitle?: TextLocalized, 	// payment section subtitle
	enterLabel?: TextLocalized, // label for payment contract number input
	placeholder?: string, 		// contract number input placeholder
	mask?: string, 				// UI mask, if contract input is using Angular mask
	errors?: { [property: string]: Object } // error dictionary indexed by index types
};

export interface ITemplatorService {
	visuals: { [property: string]: VisualObject };
	categories;
	cities;
	states;
	titles;
	getVisualsForPayment(shortName: string);
	isMobile(shortName: string);
	getPaymentMask(shortName: string);
}
class TemplatorService implements ITemplatorService {
	public visuals: { [property: string]: VisualObject };
	public categories;
	public cities;
	public states;
	public titles;
	public currencies;

	constructor() {
		this.states = {
			payments: 'Услуги и платежи',
			transfers: 'Переводы',
			mobile: 'Мобильная связь',
			users: 'Вход и регистрация',
			profile: 'Мой Homebank',
			account: 'Мой Homebank',
			virtual: 'Мой Homebank',
		};
		this.currencies = {
			KZT: 'тг.',
			USD: '$',
			EUR: '€'
		};
		this.cities = {
			almaty: 'Алматы',
			astana: 'Астана',
			almatyRegion: 'Алматинская обл.',
			akmolaRegion: 'Акмолинская обл.',
			aktobeRegion: 'Актюбинская обл.',
			atyrauRegion: 'Атырауская обл.',
			eastKazakhstanRegion: 'Восточно-Казахстанская обл.',
			jambylRegion: 'Жамбылская обл.',
			westKazakhstanRegion: 'Западно-Казахстанская обл.',
			karagandaRegion: 'Карагандинская обл.',
			kostanayRegion: 'Костанайская обл.',
			kyzylordaRegion: 'Кызылординская обл.',
			mangystauRegion: 'Мангистауская обл.',
			pavlodarRegion: 'Павлодарская обл.',
			northKazakhstanRegion: 'Северо-Казахстанская обл.',
			southKazakhstanRegion: 'Южно-Казахстанская обл.'
		};
		this.titles = {
			categories: {
				mobile: 'Мобильная связь',
				internet: 'Интернет',
				creditsAndDeposits: 'Кредиты, депозиты',
				utilities: 'Коммунальные услуги',
				landline: 'Телефония',
				tv: 'Телевидение',
				qiwi: 'Онлайн сервисы',
				transport: 'Городской транспорт',
				pdd: 'Штрафы ПДД',
			},
			payments: {
				altel: 'Аltel 4G',
				kcell: 'Kcell',
				beeline: 'Beeline',
				activ: 'Activ',
				tele2: 'Tele2',
				city: 'City',
				mobile: 'Мобильная связь',
				alseco: 'Алсеко',
				astanaERC: 'Астана ЕРЦ',
				ivc: 'ИВЦ',
				onai: 'Карта Онай',
				tv: 'Телевидение',
				qiwi: 'Qiwi кошелек',
				almatv: 'Алма ТВ',
				caspiohd: 'CaspioHD ТВ',
				kazakhtelecom: 'Казахтелеком',
				hcsbkPayLoan: 'Погашение кредита ЖССБК',
				hcsbkMakeDeposit: 'Пополнение депозита ЖССБК',
				pdd: 'Штрафы ПДД',
			},
			transfers: {
				international: 'На зарубежную карту',
				cash: 'С карты на банкомат',
				homebank: 'На Homebank друга',
				default: 'С карты на карту',
			}
		}
		this.visuals = {
			mobile: {
				title: {
					ru: 'Оплата мобильной связи',
					kz: 'Оплата мобильной связи',
					en: 'Оплата мобильной связи',
				},
				name: {
					ru: 'Мобильная связь',
					kz: 'Мобильная связь',
					en: 'Мобильная связь'
				},
				subtitle: {
					ru: 'Начните вводить номер и оператор определится автоматически',
					kz: 'Начните вводить номер и оператор определится автоматически',
					en: 'Начните вводить номер и оператор определится автоматически'
				},
				enterLabel: {
					ru: 'Введите номер телефона',
					kz: 'Введите номер телефона',
					en: 'Введите номер телефона'
				},
				placeholder: '+7 700-123-45-67',
				mask: '+7 999-999-99-99'
			},
			onai: {
				name: {
					ru: 'Карта Онай',
					kz: 'Карта Онай',
					en: 'Карта Онай',
				},
				title: {
					ru: 'Оплата транспортной карты Онай',
					kz: 'Оплата транспортной карты Онай',
					en: 'Оплата транспортной карты Онай'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				},
				enterLabel: {
					ru: 'Введите номер билета',
					kz: 'Введите номер билета',
					en: 'Введите номер билета'
				},
				placeholder: '',
				mask: '9999 99 99999  9999 9999'
			},
			kazakhtelecom: {
				name: {
					ru: 'Казахтелеком',
					kz: 'Казахтелеком',
					en: 'Казахтелеком',
				},
				title: {
					ru: 'Казахтелеком',
					kz: 'Казахтелеком',
					en: 'Казахтелеком'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				},
				enterLabel: {
					ru: 'Введите номер телефона',
					kz: 'Введите номер телефона',
					en: 'Введите номер телефона'
				},
				placeholder: '+7 727-123-45-67',
				mask: '+7 999-999-99-99'
			},
			hcsbkPayLoan: {
				name: {
					ru: 'Погашение кредита в АО "Жилстройсбербанк"',
					kz: 'Погашение кредита в АО "Жилстройсбербанк"',
					en: 'Погашение кредита в АО "Жилстройсбербанк"',
				},
				title: {
					ru: 'Погашение кредита в АО "Жилстройсбербанк"',
					kz: 'Погашение кредита в АО "Жилстройсбербанк"',
					en: 'Погашение кредита в АО "Жилстройсбербанк"'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				},
				enterLabel: {
					ru: 'Введите номер счета',
					kz: 'Введите номер счета',
					en: 'Введите номер счета'
				},
				placeholder: '',
				mask: ''
			},
			hcsbkMakeDeposit: {
				name: {
					ru: 'Пополнение депозита в АО "Жилстройсбербанк"',
					kz: 'Пополнение депозита в АО "Жилстройсбербанк"',
					en: 'Пополнение депозита в АО "Жилстройсбербанк"',
				},
				title: {
					ru: 'Пополнение депозита в АО "Жилстройсбербанк"',
					kz: 'Пополнение депозита в АО "Жилстройсбербанк"',
					en: 'Пополнение депозита в АО "Жилстройсбербанк"'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				},
				enterLabel: {
					ru: 'Введите номер счета',
					kz: 'Введите номер счета',
					en: 'Введите номер счета'
				},
				placeholder: '',
				mask: ''
			},
			qiwi: {
				name: {
					ru: 'Qiwi кошелек',
					kz: 'Qiwi кошелек',
					en: 'Qiwi кошелек'
				},
				title: {
					ru: 'Пополнение Qiwi кошелька',
					kz: 'Пополнение Qiwi кошелька',
					en: 'Пополнение Qiwi кошелька'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				},
				enterLabel: {
					ru: 'Введите номер кошелька',
					kz: 'Введите номер кошелька',
					en: 'Введите номер кошелька'
				},
				placeholder: '+7 700-123-45-67',
				mask: '+7 999-999-99-99'
			},
			pdd: {
				name: {
					ru: 'Оплата штрафов ПДД',
					kz: 'Оплата штрафов ПДД',
					en: 'Оплата штрафов ПДД'
				},
				title: {
					ru: 'Оплата штрафов ПДД',
					kz: 'Оплата штрафов ПДД',
					en: 'Оплата штрафов ПДД'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				},
				errors: {
					notFound: {
						form: 'Штрафов по параметрам поиска не найдено'
					},
					notValid: {
						input: 'Введите параметры поиска'
					}
				}
			},
			alseco: {
				name: {
					ru: 'Алсеко',
					kz: 'Алсеко',
					en: 'Алсеко'
				},
				title: {
					ru: 'Оплата Алсеко',
					kz: 'Оплата Алсеко',
					en: 'Оплата Алсеко'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				}
			},
			ivc: {
				name: {
					ru: 'ИВЦ',
					kz: 'ИВЦ',
					en: 'ИВЦ'
				},
				title: {
					ru: 'Оплата услуг ИВЦ',
					kz: 'Оплата услуг ИВЦ',
					en: 'Оплата услуг ИВЦ'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				}
			},
			astanaERC: {
				name: {
					ru: 'Астана ЕРЦ',
					kz: 'Астана ЕРЦ',
					en: 'Астана ЕРЦ'
				},
				title: {
					ru: 'Оплата услуг Астана ЕРЦ',
					kz: 'Оплата услуг Астана ЕРЦ',
					en: 'Оплата услуг Астана ЕРЦ'
				},
				subtitle: {
					ru: '',
					kz: '',
					en: ''
				}
			}
		};
	}

	/**
	 * Method for retrieving visual package for payment
	 * @param shortName {string} - Service short name, e.g. kcell
	 * @return {any} Visual object
	 */
	getVisualsForPayment(shortName: string) {
		if (this.isMobile(shortName)) {
			return this.visuals['mobile'];
		} else {
			return this.visuals[shortName];
		}
	}
	getCategoryTitle(shortName: string) {
		return this.titles.categories[shortName];
	}
	getPaymentTitle(shortName: string) {
		return this.titles.payments[shortName];
	}
	getCityTitle(shortName: string) {
		return this.cities[shortName];
	}
	getPaymentMask(shortName: string){
		if (this.isMobile(shortName)) {
			return this.visuals['mobile']['mask'];
		} else {
			if(!isNullOrUndefined(this.visuals[shortName]) && !isNullOrUndefined(this.visuals[shortName]['mask'])){
				return this.visuals[shortName].mask;
			}
		}
	}
	getStateTitle(stateName: string) {
		if (this.states[stateName]) {
			return this.states[stateName];
		} else {
			return stateName;
		}
	}
	getCurrency(currency){
		return this.currencies[currency];
	}
	/**
	 * Defines titles to each of the breadcrumbs link
	 * @param breadcrumbs {object[]} - array of breadcrumbs
	 * @param stateParams {object} - $stateParams object, uses for taking parameters for the last route
	 * @return breadcrumbs {object[]} returns the modified breadcrumbs back
	 */
	setBreadcrumbs(breadcrumbs, stateParams){
		let parent;
		if(breadcrumbs[0]){
			parent = breadcrumbs[0];
			let names = parent.route.split('.');
			let name = names[0];
			parent.title = this.getStateTitle(name);
		}
		if(breadcrumbs[0] && breadcrumbs[1]){
			let child = breadcrumbs[1];
			if(child.route === 'payments.form'){
				let shortName = stateParams.shortName;
				if(this.isMobile(shortName)){
					child.title = this.getPaymentTitle('mobile');
				}else{
					child.title = this.getPaymentTitle(shortName);
				}
			}else{
				let names = child.route.split('.');
				let name = names[names.length-1];
				child.title = this.titles[parent.route][name];
			}
		}
		return breadcrumbs;
	}
	/**
	 * Determines if service name is one of mobile payments
	 * @param shortName {string} - Service short name, e.g. kcell
	 * @return {boolean} return true if short name belongs to some mobile payment
	 */
	public isMobile(shortName: string) {
		return shortName === 'kcell' ||
			shortName === 'activ' ||
			shortName === 'beeline' ||
			shortName === 'city' ||
			shortName === 'altel' ||
			shortName === 'tele2' ||
			shortName === 'mobile';
	}
}

export default TemplatorService;


