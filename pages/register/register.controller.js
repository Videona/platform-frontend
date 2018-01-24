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
		self.error = '';
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
			console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}

		// Internal functions
		function list1() {
			self.loading = true;
			self.error = null;
			console.log('Verifying...');
			validateSlide1(function (error, message) {
				if (!error) {
					self.service.validateUsernameAndEmail(self.username, self.email, pushList2);
				} else {
					self.error = message;
					self.loading = false;
				}
			});
		}

		function list2() {
			self.loading = true;
			self.error = null;
			console.log('Verifying...');
			validateSlide2(function (error, message) {
				if (!error) {
					self.status.terms = false;
					self.status.captcha = true;
				} else {
					self.error = message;
				}
				self.loading = false;
			});
		}

		function submit() {
			if (self.username !== '' && self.password !== '') {
				self.loading = true;
				self.error = null;
				console.log('Submiting...');
				self.service.register(self.username, self.email, self.password, self.age, success);
			} else {
				self.error = $translate.instant('WRONG_REGISTER');
			}
		}

		function pushList2(response, message) {
			if (response) {
				self.status.register = false;
				self.error = null;
				self.status.terms = true;
			} else {
				self.error = message;
			}
			self.loading = false;
		}

		function success(result) { // , data) {
			self.loading = false;
			if (result) {
				self.loading = true;
				console.log('Registered! Logging in...');
				login.login(self.username, self.password, function (loginResult) {
					self.loading = false;
					if (loginResult) {
						$state.go($stateParams.redirect || 'home');
					} else {
						self.error = 'Login error. Please, try again...';
						$state.go('login');
					}
				});
			} else {
				console.log('Bad username, email or password...');
				self.error = $translate.instant('WRONG_REGISTER');
			}
		}

		function validateSlide1(callback) {
			var errors = '';
			var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

			if (self.username === '') {
				errors += '<li>' + $translate.instant('ERROR_USERNAME_EMPTY') + '</li>';
			} else if (self.username.length < 5) {
				errors += '<li>' + $translate.instant('ERROR_USERNAME_MIN_LENGTH') + '</li>';
			} else if (self.username.length > 30) {
				errors += '<li>' + $translate.instant('ERROR_USERNAME_MAX_LENGTH') + '</li>';
			}

			if (self.password === '') {
				errors += '<li>' + $translate.instant('ERROR_PASSWORD_EMPTY') + '</li>';
			} else if (self.password.length < 5) {
				errors += '<li>' + $translate.instant('ERROR_PASSWORD_MIN_LENGTH') + '</li>';
			} else if (self.password.length > 30) {
				errors += '<li>' + $translate.instant('ERROR_PASSWORD_MAX_LENGTH') + '</li>';
			}

			if (self.email === '') {
				errors += '<li>' + $translate.instant('ERROR_EMAIL_EMPTY') + '</li>';
			} else if (self.email.length < 5) {
				errors += '<li>' + $translate.instant('ERROR_EMAIL_MIN_LENGTH') + '</li>';
			} else if (self.email.length > 30) {
				errors += '<li>' + $translate.instant('ERROR_EMAIL_MAX_LENGTH') + '</li>';
			} else if (EMAIL_REGEXP.test(self.email) === false) {
				errors += '<li>' + $translate.instant('ERROR_EMAIL_NOT_VALID') + '</li>';
			}

			if (errors === '') {
				callback(false);
			} else {
				callback(true, errors);
			}
		}

		function validateSlide2(callback) {
			var errors = '';

			if (self.age === '') {
				errors += '<li>' + $translate.instant('ERROR_AGE_EMPTY') + '</li>';
			} else if (isNaN(parseInt(self.age, 10)) || parseInt(self.age, 10) <= 0) {
				errors += '<li>' + $translate.instant('ERROR_AGE_WRONG') + '</li>';
			}

			if (self.terms === false) {
				errors += '<li>' + $translate.instant('ERROR_TERMS_EMPTY') + '</li>';
			}

			if (errors === '') {
				callback(false);
			} else {
				callback(true, errors);
			}
		}
	}
}());
