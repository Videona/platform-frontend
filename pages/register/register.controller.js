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
		self.submit = submit;


		// On Run...
		if (session.id > 0) {
			console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}


		// Internal functions
		function submit() {
			if (self.username !== '' && self.password !== '') {
				self.loading = true;
				self.error = null;
				console.log('Submiting...');
				self.service.register(self.username, self.email, self.password, success);
			} else {
				self.error = $translate.instant('WRONG_REGISTER');
			}
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
	}
}());
