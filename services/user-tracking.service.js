// services/user-tracking.service.js

(function () {

	'use strict';

	angular
		.module('app')
		.service('userTrackingService', userTrackingService);

	userTrackingService.$inject = ['$q', '$analytics'];

	function userTrackingService($q, $analytics) {

		function setAliasUserTracking(user) {
			if (user.id) {
				console.log("setting user alias to ", user.id);
				$analytics.setAlias(user.id);
				$analytics.setUserPropertiesOnce({ userId: user.id });
			}
		}

		function setUserProperties(profile) {
			const userProperties = {};
			if (profile.name) {
                userProperties.name = profile.name;
                userProperties['$name'] = profile.name;
			}
			if (profile.nickname) {
				userProperties.username = profile.nickname;
			}
			if (profile.email) {
                userProperties.email = profile.email;
                userProperties['$email'] = profile.email;
			}
			if (profile.picture) {
				userProperties.pic = profile.picture;
			}
			if (profile.email_verified) {
				userProperties.verified = profile.email_verified;
			}
			$analytics.setUserPropertiesOnce(userProperties);
		}

		return {
			setAliasUserTracking: setAliasUserTracking,
			setUserProperties: setUserProperties,
		}

	}

})();