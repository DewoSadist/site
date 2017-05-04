import TemplatorService from '../templator/templator.service';

/**
 * @ngdoc service
 * @name ErrorService
 *
 * @description
 * Service for all Error types and their namings
 *
 */
class ErrorService {
	public errors;
	static emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	/** @ngInject */
	constructor(public TemplatorService: TemplatorService) {
		this.errors = {
			cart:{
				cartRadioEmptyError: 'Please choose at least one item',
				cartCheckboxEmptyError: 'Please choose at least one item',
				cartQuantityEmptyError: 'Please choose at least one item'
			},
			general: {
				serverError: 'Произошла неизвестная ошибка, попробуйте еще раз.',
				generalPaymentError: 'Платежный сервис временно не доступен. Пожалуйста, попробуйте позже.',
				generalBadRequestError: 'Транзакция отклонена. Пожалуйста проверьте ваши данные',
				conflictError: 'Платеж с данным идентификатором уже обработан. Попробуйте сделать новый платеж.',
				contractAliasEmptyError: 'Имя платежа не должно быть пустым',
				contractSaveUnknownError: 'Произошла ошибка при сохранении платежа',
				contractUnknownError: 'Произошла ошибка при сохранении платежа',
			},
			email: {
				notSentError: 'Ошибка при отправке email-адреса, попробуйте еще раз',
				emptyError: 'Email не может быть пустым',
				notValidError: 'Введен неправильный email-адрес, проверьте данные'
			},
			payments: {
				mobile: {
					notFound: 'Такой номер не найден, попробуйте ввести другой.',
					badRequestParametersError: 'Такой номер не найден. Проверьте введенный номер и попробуйте снова',
					notValid: 'Введите правильный номер телефона'
				},
				onai: {
					notFound: 'Билет не найден, попробуйте ввести другой номер.',
					badRequestParametersError: 'Карта Онай с таким номером не найдена. Проверьте введенный номер и попробуйте снова',
					notValid: 'Введите правильный номер билета'
				},
				qiwi: {
					notFound: 'Неверно указаны реквизиты платежа, пожалуйста проверьте номер кошелька.',
					badRequestParametersError: 'Такой номер не найден. Проверьте введенный номер и попробуйте снова',
					notValid: 'Введите правильный номер кошелька'
				},
				pdd: {
					notFoundError: 'Штрафов по параметрам поиска не найдено',
					badRequestParametersError: 'По указанным параметрам информация не найдена. Если вы не можете найти нарушение по данному виду поиска, рекомендуем воспользоваться другим способом поиска.',
					plateNumberEmptyError: 'Введите номер автомобиля',
					titleNumberEmptyError: 'Введите номер техпаспорта автомобиля',
					licenseNumberEmptyError: 'Введите номер удостоверения',
					personalIdEmptyError: 'Введите ИИН нарушителя',
					blankNumberEmptyError: 'Введите номер бланка',
					blankSerialEmptyError: 'Введите номер серии бланка',
					blankDateEmptyError: 'Введите дату составления бланка',
					photoReportEmptyError: 'Введите номер извещения',
					unknownServerError: 'Сервис поиска штрафов временно не доступен, попробуйте чуть позже',
				},
				alseco: {
					notFound: 'Не найдено неоплаченных квитанций',
					badRequestParametersError: 'Лицевой счет с таким номером не найден. Проверьте введенный номер и попробуйте снова',
					unknownServerError: 'Сервис поиска квитанции временно не доступен, попробуйте чуть позже',
					notValid: true
				},
				astanaERC: {
					notFound: 'Не найдено неоплаченных квитанций',
					badRequestParametersError: 'Лицевой счет с таким номером не найден. Проверьте введенный номер и попробуйте снова',
					unknownServerError: 'Сервис поиска квитанции временно не доступен, попробуйте чуть позже',
					notValid: true
				},
				ivc: {
					notFound: 'Не найдено неоплаченных квитанций',
					badRequestParametersError: 'Лицевой счет с таким номером не найден. Проверьте введенный номер и попробуйте снова',
					unknownServerError: 'Сервис поиска квитанции временно не доступен, попробуйте чуть позже',
					notValid: true
				},
				kazakhtelecom: {
					notFound: 'Лицевой счет не найден',
					badRequestParametersError: 'Такой номер не найден. Проверьте введенный номер и попробуйте снова',
					unknownServerError: 'Сервис Казактелеком временно не доступен, попробуйте чуть позже',
					notValid: 'Введите правильный номер лицевого счета'
				}
			},
			transfers: {

			},
			card: {
				cardNumError: 'Введите правильный номер карточки',
				cardNumEmptyError: 'Введите номер карточки',
				cardNumInvalidError: 'Введите правильный номер карточки',
				cardExpDateEmptyError: 'Введите срок действия карточки',
				cardExpDateValidError: 'Вы ввели неверный срок годности',
				cardCvcError: 'Введите верный CVC код',
				cardNotFoundError: 'Карта не найдена. Пожалуйста, проверьте номер карты или используйте другую.',
				cardUnknownError: 'Произошла ошибка при проведении транзакции. Пожалуйста, попробуйте еще раз.',
				cardDeclinedError: 'Транзакция отклонена. Пожалуйста, проверьте реквизиты карты и попробуйте еще раз.',
				cardExpiredError: 'Срок действия вашей карты истек. Пожалуйста, попробуйте использовать другую карту.',
				cardNotPermittedError: 'Отказано держателю карточки. Обратитесь, пожалуйста, в отделения вашего банка.',
				card3dSecureError: 'Вы ввели неправильный 3D-secure пароль',
				cardInsufficientError: 'На вашей карте не достаточно средств, попробуйте использовать другую карту',
				cardAmountExceededError: 'Вы превысили максимальную сумму платежа, попробуйте снова',
				cardAmountInvalidError: 'Вы ввели недопустимую сумму для платежа, попробуйте снова',
				card3dSecureNotAllowedError: 'Данный вид оплаты не поддерживает 3D-secure, попробуйте использовать другую карту',
				cardAliasEmptyError: 'Имя карточки не должно быть пустым',
				cardSaveUnknownError: 'Произошла ошибка при сохранении карточки',
			},
			auth: {
				emailEmptyError: 'Enter your email',
				numberEmptyError: 'Введите ваш номер телефона',
				numberInvalidError: 'Введите ваш номер телефона',
				emailFailedError: 'Произошла ошибка при обработке вашего email. Попробуйте еще раз.',
				codeEmptyError: 'Введите код подтверждения',
				codeNotFoundError: 'Код подтверждения не найден, попробуйте еще раз',
				codeCountExceededError: 'Вы не можете запрашивать больше одного SMS подтверждения в минуту',
				birthdayValidError: 'Введите правильную дату рождения',
				registerUnknownError: 'Произошла ошибка при регистрации',
				registerAlreadyExistsError: 'У вас уже есть аккаунт в Homebank, введите пароль и войдите',
				restoreUserNotFoundError: 'Аккаунт с данным номером не найден. Вы можете зарегистрироваться в Homebank.',
				loginFailedError: 'Вы ввели неверный номер или пароль',
				loginLockedError: 'Пользователь заблокирован! Воспользуйтесь, пожалуйста, услугой восстановления доступа',
				loginDeniedError: 'Пользователь заблокирован! Обратитесь, пожалуйста, в Call-Center',
				restoreUnknownError: 'Произошла ошибка при восстановлении',
				sessionExpiredError: 'Время вашей сессии истекло, авторизуйтесь снова',
			},
			password: {
				passwordEmptyError: 'Enter your password',
				passwordRepeatError: 'Новый пароль не должен совпадать с текущим',
				passwordShortError: 'Пароль должен содержать не менее 8 знаков',
				passwordNotMatchError: 'Введенные пароли должны совпадать',
				passwordWeakError: 'Вы ввели слабый пароль. Пароль должен содержать буквы и цифры.',
				passwordWrongError: 'Incorrect password',
				passwordSaveError: 'Произошла ошибка при сохранении пароля',
				passwordChangedMessage: 'Password successfully changed',
			}
		};
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getCartErrors
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns General cart error message
	 *
	 * @returns {{cartRadioEmptyError, cartCheckboxEmptyError, cartQuantityEmptyError}|any}
	 */
	getCartErrors(): any {
		return this.errors.cart;
	}
	/**
	 * @ngdoc method
	 * @name ErrorService.getPaymentErrors
	 * @methodOf ErrorService
	 *
	 * @description
	 * @param   {string} serviceName    Service name e.g. "kcell"
	 * @return  {Object} Error Object
	 */
	getPaymentErrors(serviceName: string) {
		if (this.TemplatorService.isMobile(serviceName)) {
			serviceName = 'mobile';
		}
		return this.errors.payments[serviceName];
	}



	/**
	 * @ngdoc method
	 * @name ErrorService.getServerError
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns General Server error message
	 *
	 * @return {string} 500 server error message
	 */
	getServerError(): string {
		return this.errors.general.serverError;
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getGeneralPaymentError
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns General payment error message
	 *
	 * @return {string} 500  error message
	 */
	getGeneralPaymentError(): string {
		return this.errors.general.generalPaymentError;
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getGeneralBadRequestError
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns General  400 error message
	 *
	 * @return {string} 400 error message
	 */
	getGeneralBadRequestError(): string {
		return this.errors.general.generalBadRequestError;
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getConflictPaymentError
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns General 409 error during payment
	 *
	 * @return {string} 409 server error message
	 */
	getConflictPaymentError(): string {
		return this.errors.general.conflictError;
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getAliasEmptyError
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns Empty Card Name error
	 *
	 * @return {string} Error message
	 */
	getAliasEmptyError(): string {
		return this.errors.card.cardAliasEmptyError;
	}

	getContractUnknownError(): string {
		return this.errors.general.contractUnknownError;
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getCardSaveError
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns Card Name Save error
	 *
	 * @return {string} Error message
	 */
	getCardSaveError(): string {
		return this.errors.card.cardSaveUnknownError;
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getEmailNotSentError
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns General error during email sending
	 *
	 * @return {string} Server error message
	 */
	getEmailNotSentError(): Object {
		return this.errors.email.notSentError;
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getStandardErrorsForPayment
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns a standard Error object for Check request in payments
	 *
	 * @param   {string}    serviceName   Service name, e.g. "onai"
	 * @param   {Object}    error         Error object that came from Restangular
	 * @return  {Object}    Error object for payment
	 */
	getStandardErrorsForPayment(serviceName: string, error: any): any {
		switch (error.status) {
			case 400:
				return this.getPaymentErrors(serviceName).badRequestParametersError;
			case 403:
			case 404:
				return this.getPaymentErrors(serviceName).notFound;
			case 409:
				return this.getConflictPaymentError();
			default:
				return this.getServerError();
		}
	}


	/**
	 * @ngdoc method
	 * @name ErrorService.getErrorsForEmail
	 * @methodOf ErrorService
	 *
	 * @description
	 * Takes an email value and validates it returning an error object
	 *
	 * @param {string}  email   Email string value
	 * @return {string} Error string
	 */
	getErrorsForEmail(email: string): string {
		if (!email || email.length === 0) {
			return this.errors.email.emptyError;
		} else if (email && !email.match(ErrorService.emailRegex)) {
			return this.errors.email.notValidError;
		} else {
			return null;
		}
	}
	/**
	 * @ngdoc method
	 * @name ErrorService.getErrorsForPassword
	 * @methodOf ErrorService
	 *
	 * @description
	 * Returns the error in any password-connected response
	 *
	 * @param {object}  error   Error response object
	 * @return {string} Error string
	 */
	getErrorsForPassword(error) {
		if (error.status === 400 && error.data.code === 'illegal_password') {
			return this.getPasswordErrors().passwordWeakError;
		} else {
			return this.getPasswordErrors().passwordSaveError;
		}
	}

	/**
	 * @ngdoc method
	 * @name ErrorService.getAuthErrors
	 * @methodOf ErrorService
	 *
	 * @description
	 * Return object with all auth error objects
	 * @return {any} - Object with all errors
	 */
	getAuthErrors(): any {
		return this.errors.auth;
	}
	/**
	 * @ngdoc method
	 * @name ErrorService.getPasswordErrors
	 * @methodOf ErrorService
	 *
	 * @description
	 * Return object with all password error objects
	 * @return {any} - Object with all errors
	 */
	getPasswordErrors(): any {
		return this.errors.password;
	}

}
export default ErrorService;
