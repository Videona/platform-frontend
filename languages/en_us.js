// English
angular.module('app')
	.config(function ($translateProvider) {
		$translateProvider.translations('en_us', 
			{
				HELLO: 'Hello',
				WORLD: 'world',

				LOADING: 'loading...',

				LOGIN: 'Login',
				REGISTER: 'Register',
				USERNAME: 'username',
				PASSWORD: 'password',
				EMAIL: 'email',
				LOGIN_ACTION: 'Log in',
				REGISTER_ACTION: 'Create account',
				WRONG_LOGIN: 'Wrong user or password. Please, try again.',
				WRONG_REGISTER: 'Wrong register data. Check it out, and try again, please.'
			}
		);
	});