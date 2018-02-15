(function () {
	// English
	angular.module('app').config(['$translateProvider', translate]);

	function translate($translateProvider) {
		$translateProvider.translations('en_us', {
			HELLO: 'Hello',
			WORLD: 'world',

			LOADING: 'loading...',

			LOGIN: 'Login',
			REGISTER: 'Register',
			USERNAME: 'Username',
			PASSWORD: 'Password',
			EMAIL: 'Email',
			FORGOTTEN_PASSWORD: 'Forgotten password?',
			LOGIN_ACTION: 'Log in',
			REGISTER_ACTION: 'Register',
			NEXT_ACTION: 'Next',
			WRONG_LOGIN: 'Wrong user or password. Please, try again.',
			WRONG_REGISTER: 'Wrong register data. Check it out, and try again, please.',
			REGISTER_SLOGAN: 'Mobile Journalism app for Breaking\n the video editing barrier on mobile',
			QUESTION_AGE: 'How old are you?',
			ACCEPT_CONDITIONS_1: 'I\'ve read and I accept ',
			CONDITIONS: 'the terms of service',
			ACCEPT_CONDITIONS_2: ' of Vimojo',
			COMPLETED: 'Ready!',
			ERROR_USERNAME_EMPTY: 'The field username is empty.',
			ERROR_USERNAME_MIN_LENGTH: 'The username is less than 5 characters long.',
			ERROR_USERNAME_MAX_LENGTH: 'The username is longer than 30 characters long',
			ERROR_USERNAME_ALREADY_IN_USE: 'The username is already in use. Try a new one.',
			ERROR_PASSWORD_EMPTY: 'The field password is empty.',
			ERROR_PASSWORD_MIN_LENGTH: 'The password is less than 5 characters long.',
			ERROR_PASSWORD_MAX_LENGTH: 'The password is longer than 30 characters long',
			ERROR_EMAIL_EMPTY: 'The field email is empty.',
			ERROR_EMAIL_MIN_LENGTH: 'The email is less than 5 characters long.',
			ERROR_EMAIL_MAX_LENGTH: 'The email is longer than 30 characters long',
			ERROR_EMAIL_NOT_VALID: 'The email is not valid.',
			ERROR_EMAIL_ALREADY_IN_USE: 'The email is already in use. Try a new one',
			ERROR_AGE_EMPTY: 'The field age is empty',
			ERROR_AGE_WRONG: 'The age must be valid',
			ERROR_TERMS_EMPTY: 'You must accept the terms and conditions of the service',
			ERROR_RECAPTCHA_NOT_CHECKED: 'This app only is able to be used by humans. Aren\'t you human?',
			DOWNLOAD_CODE: 'Enter your download code',
			VERIFIED: 'Verified video',
			DOWNLOAD_VIDEO: 'Download Video',
			BACK_TO_GALLERY: 'Back to gallery',
			ERROR_WRONG_DOWNLOAD_CODE: 'Invalid download code'
		});
	}
}());
