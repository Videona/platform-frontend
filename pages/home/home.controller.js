(function () {
	angular.module('app')
		.controller('HomeController', ['session', '$state', '$stateParams', 'flavourString', Home]);

	function Home(session, $state, $stateParams, flavourString) {
		var self = this;

		self.flavour = flavourString;

		var userIsLogged = session.id > 0;

		if (userIsLogged) {
			console.log('Found a session! Redirecting...');
			redirectToGallery();
		}

		function redirectToGallery() {
			$state.go($stateParams.redirect || 'gallery');
		}
	}
}());