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
		self.status = {
			register: true,
			terms: false,
			captcha: false,
		};

		// Methods
		self.list1 = list1;
		self.list2 = list2;
		self.submit = submit;

		// On Run...
		if (session.id > 0) {
			// console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}

		// Internal functions
		function list1() {
			self.loading = true;
			self.error = null;

			validateSlide1(function (error) {
				if (!error) {
					self.service.validateUsernameAndEmail(self.username, self.email, pushList2);
				} else {
					self.loading = false;
				}
			});
		}

		function list2() {
			self.loading = true;

			validateSlide2(function (error) {
				self.loading = false;
				
				if (!error) {
					self.status.terms = false;
					self.status.captcha = true;
				}
			});
		}

		function submit() {
			
			self.error = [];
			
			if (self.username !== '' && self.password !== '') {
				self.loading = true;
				self.service.register(self.username, self.email, self.password, self.age, success);
			} else {
				self.error.push($translate.instant('WRONG_REGISTER'));
			}
		}

		function pushList2(response) {
			self.loading = false;
			
			if (response) {
				self.status.register = false;
				self.status.terms = true;
			}
		}

		function success(result) { // , data) {
			self.loading = false;
			if (result) {
				self.loading = true;
				// console.log('Registered! Logging in...');

				login.login(self.username, self.password, function (loginResult) {
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

		function validateSlide1(callback) {
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

		function validateSlide2(callback) {
			self.error = [];

			if (self.age === '') {
				self.error.push($translate.instant('ERROR_AGE_EMPTY'));
			} else if (isNaN(parseInt(self.age, 10)) || parseInt(self.age, 10) <= 0) {
				self.error.push($translate.instant('ERROR_AGE_WRONG'));
			}

			if (self.terms === false) {
				self.error.push($translate.instant('ERROR_TERMS_EMPTY'));
			}

			if (self.error.length === 0) {
				callback(false);
			} else {
				callback(true);
			}
		}
	}
}());
