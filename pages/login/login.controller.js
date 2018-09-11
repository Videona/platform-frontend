(function () {
	angular.module('app').controller('LoginController', ['login', 'session', '$state', '$stateParams', '$translate',
		'page', 'authService', LoginController]);

	function LoginController(login, session, $state, $stateParams, $translate, page, authService) {
		const self = this;

		// Service binding
		self.service = login;

		// Properties
		self.username = '';
		self.password = '';
		self.error = '';
		self.loading = false;

		// Methods
		self.submit = submit;
		
		// Setup page title
		page.setPageTitle($translate.instant('LOGIN'));

		authService.login();

		// // On Run...
		// if (session.id > 0) {
		// 	console.log('Found a session! Redirecting...');
		// 	redirect();
		// }
		//
		//
		// // Internal functions
		// function submit() {
		// 	if (self.username !== '' && self.password !== '') {
		// 		self.loading = true;
		// 		self.error = null;
		// 		console.log('Submiting...');
		// 		self.service.login(self.username, self.password, success);
		// 	} else {
		// 		self.error = $translate.instant('WRONG_LOGIN');
		// 	}
		// }
		//
		// function success(result) {
		// 	self.loading = false;
		// 	if (result) {
		// 		console.log('Logged in! Redirecting...');
		// 		redirect();
		// 	} else {
		// 		console.log('Bad username or password...');
		// 		self.error = $translate.instant('WRONG_LOGIN');
		// 		// self.error = 'Wrong login data. Check it out...';
		// 	}
		// }

		function redirect() {
			$state.go($stateParams.redirect || 'gallery');
		}
	}
}());
