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
				serverError: 'An unknown error occurred, please try again.',
				generalPaymentError: 'The payment service is temporarily not available. Please try again later.',
				generalBadRequestError: 'Transaction was declined. Please check your data',
				conflictError: 'A payment with this ID has already been processed. Try to make a new payment.',
				contractAliasEmptyError: 'The payment name can not be empty',
				contractSaveUnknownError: 'An error occurred while saving payment',
				contractUnknownError: 'An error occurred while saving payment',
			},
			email: {
				notSentError: 'Error sending email, please try again',
				emptyError: 'Email can not be empty',
				notValidError: 'Wrong email address entered, please check data'
			},

			auth: {
				nameEmptyError: 'Enter your name',
				emailEmptyError: 'Enter your email',
				numberEmptyError: 'Enter your phone number',
				textEmptyError: 'Fill this field',
				numberInvalidError: 'Enter your phone number',
				emailFailedError: 'An error occurred while processing your email address. Try again.',
				codeEmptyError: 'Enter confirmation code',
				codeNotFoundError: 'Verification code not found, please try again',
				codeCountExceededError: 'You can not request more than one SMS confirmation per minute',
				birthdayValidError: 'Please enter a valid birth date',
				registerUnknownError: 'There was an error registering',
				registerAlreadyExistsError: 'You already have an account in, enter your password and sign in',
				restoreUserNotFoundError: 'An account with this number could not be found.',
				loginFailedError: 'You entered an incorrect number or password',
				loginLockedError: 'The user is blocked! Please use the access recovery service',
				loginDeniedError: 'The user is blocked! Contact, please, in Call-Center',
				restoreUnknownError: 'An error occurred while restoring',
				sessionExpiredError: 'Your session has expired, log in again',
			},
			password: {
				passwordEmptyError: 'Enter your password',
				passwordRepeatError: 'The new password must not be the same as the current one',
				passwordShortError: 'Password must contain at least 8 characters',
				passwordNotMatchError: 'Entered passwords must match',
				passwordWeakError: 'You have entered a weak password. The password must contain letters and numbers.',
				passwordWrongError: 'Incorrect password',
				passwordSaveError: 'An error occurred while saving the password',
				passwordChangedMessage: 'Password successfully changed',
			},
			edit: {
				saveError: 'Error not Saved',
				saveIncorrectValue: 'Error value. please check fields',
				notFilled: 'Some Field not filled'
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

	/**
	 * @ngdoc method
	 * @name ErrorService.getEditSaveError
	 * @methodOf ErrorService
	 *
	 * @description
	 * Return object with all save with error objects
	 * @return {any} - Object with all errors
	 */
	getEditError(): any {
		return this.errors.edit;
	}

}
export default ErrorService;
