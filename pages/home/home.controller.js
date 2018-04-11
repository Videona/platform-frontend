(function () {
	angular.module('app')
		.controller('HomeController', ['session', '$state', '$stateParams', Home]);

	function Home(session, $state, $stateParams) {
		var self = this;

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