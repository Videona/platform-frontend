(function () {
	angular.module('app')
		.controller('HomeController', ['session', '$state', '$stateParams', 'flavourString', 'authService',
			'decisionsService', '$scope', Home]);

	function Home(session, $state, $stateParams, flavourString, authService, decisionsService, $scope) {
		var self = this;

		self.flavour = flavourString;
		$scope.$on('decisions:updated', function (event, data) {
			handleRedirect();
		});

		handleRedirect();

		function handleRedirect() {
			if (authService.isAuthenticated()) {
				console.log('Found a session! Redirecting...');
				redirectToLoggedHome();
			}
		}

		function redirectToLoggedHome() {
			if (decisionsService.userHasAccessToGallery) {
				console.log("redirect to gallery");
				$state.go($stateParams.redirect || 'gallery');
			} else {
				console.log("redirect to user home");
				// TODO(jliarte): 16/11/18 go to user home/profile
			}
		}
	}
}());