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
		});
	}
}());
