(function () {
	angular.module('app').controller('RegisterController', ['register', 'login', 'session', '$state', '$stateParams', '$translate', RegisterController]);

	function RegisterController(register, login, session, $state, $stateParams, $translate) {
		var self = this;

		// Service binding
		self.service = register;

		// Properties
		self.username = '';
		self.email = '';
		self.password = '';
		self.age = '';
		self.terms = false;

		self.error = [];
		self.loading = false;

		self.activeView = {
			credentials: true,
			terms: false,
		};

		// Methods
		self.validateRegister = validateRegister;
		self.submit = submit;

		// On Run...
		if (session.id > 0) {
			// console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}

		// Internal functions
		function validateRegister() {
			self.loading = true;
			self.error = null;

			validateUserCredentials(function (error) {
				if (!error) {
					self.service.validateUsernameAndEmail(self.username, self.email, showCaptchaAndTermsView);
				} else {
					self.loading = false;
				}
			});
		}

		function submit() {
			self.error = [];

			validateTerms(function (isValid) {
				if (isValid) {
					if (self.username !== '' && self.password !== '') {
						self.loading = true;
						self.service.register(self.username, self.email, self.password, self.age, success);
					} else {
						self.error.push($translate.instant('WRONG_REGISTER'));
					}
				}
			});
		}

		function showCaptchaAndTermsView(response) {
			self.loading = false;

			if (response) {
				self.activeView.credentials = false;
				self.activeView.terms = true;

				window.grecaptcha.render(document.getElementById('recaptcha'));
			} else {
				self.error.push($translate.instant('ERROR_EMAIL_ALREADY_IN_USE'));
			}
		}

		function success(result) { // , data) {
			self.loading = false;
			if (result) {
				self.loading = true;
				// console.log('Registered! Logging in...');

				login.login(self.email, self.password, function (loginResult) {
					self.loading = false;
					if (loginResult) {
						$state.go($stateParams.redirect || 'home');
					} else {
						self.error.push($translate.instant('WRONG_LOGIN'));
						$state.go('login');
					}
				});
			} else {
				// console.log('Bad username, email or password...');
				self.error.push($translate.instant('WRONG_REGISTER'));
			}
		}

		function validateUserCredentials(callback) {
			self.error = [];
			var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

			if (self.username === '') {
				self.error.push($translate.instant('ERROR_USERNAME_EMPTY'));
			} else if (self.username.length < 5) {
				self.error.push($translate.instant('ERROR_USERNAME_MIN_LENGTH'));
			} else if (self.username.length > 30) {
				self.error.push($translate.instant('ERROR_USERNAME_MAX_LENGTH'));
			}

			if (self.password === '') {
				self.error.push($translate.instant('ERROR_PASSWORD_EMPTY'));
			} else if (self.password.length < 5) {
				self.error.push($translate.instant('ERROR_PASSWORD_MIN_LENGTH'));
			} else if (self.password.length > 30) {
				self.error.push($translate.instant('ERROR_PASSWORD_MAX_LENGTH'));
			}

			if (self.email === '') {
				self.error.push($translate.instant('ERROR_EMAIL_EMPTY'));
			} else if (self.email.length < 5) {
				self.error.push($translate.instant('ERROR_EMAIL_MIN_LENGTH'));
			} else if (self.email.length > 30) {
				self.error.push($translate.instant('ERROR_EMAIL_MAX_LENGTH'));
			} else if (!EMAIL_REGEXP.test(self.email)) {
				self.error.push($translate.instant('ERROR_EMAIL_NOT_VALID'));
			}

			if (self.error.length === 0) {
				callback(false);
			} else {
				callback(true);
			}
		}

		function validateTerms(callback) {
			self.error = [];

			// if (self.age === '') {
			// 	self.error.push($translate.instant('ERROR_AGE_EMPTY'));
			// } else if (isNaN(parseInt(self.age, 10)) || parseInt(self.age, 10) <= 0) {
			// 	self.error.push($translate.instant('ERROR_AGE_WRONG'));
			// }

			var captchaResponse = window.grecaptcha.getResponse();

			if (!self.terms) {
				self.error.push($translate.instant('ERROR_TERMS_EMPTY'));
			}

			if (!captchaResponse) {
				self.error.push($translate.instant('ERROR_CAPTCHA'));
			}

			if (self.error.length === 0) {
				callback(true);
			} else {
				callback(false);
			}
		}
	}
}());
