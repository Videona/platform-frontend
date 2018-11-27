// js/app.run.js

(function () {

	'use strict';

	angular
		.module('app')
		.run(run);

	run.$inject = ['authService', 'ngDrift', 'driftKey'];

	function run(authService, ngDrift, driftKey) {
		// Handle the authentication
		// result in the hash
		authService.handleAuthentication();
		authService.scheduleRenewal();
		if (driftKey) {
			console.log("showing drift");
			ngDrift.show();
		}
	}

})();