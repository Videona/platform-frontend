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
		self.error = '';
		self.loading = false;

		// Methods
		self.submit = submit;


		// On Run...
		if (session._id > 0) {
			console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}


		// Internal functions
		function submit() {
			self.loading = true;
			self.error = null;
			console.log('Submiting...');
			self.service.register(self.username, self.email, self.password, success);
		}

		function success(result, data) {
			console.log(data);
			self.loading = false;
			if (result) {
				self.loading = true;
				console.log('Registered! Logging in...');
				login.login(self.username, self.password, function (success) {
					self.loading = false;
					if (success) {
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
