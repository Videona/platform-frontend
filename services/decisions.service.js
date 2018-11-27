// services/decisions.service.js
(function () {

	'use strict';

	angular
		.module('app')
		.service('decisionsService', decisionsService);

	decisionsService.$inject = ['openGallery', 'userFeatureService', '$rootScope', '$q'];

	function decisionsService(openGallery, userFeatureService, $rootScope, $q) {

		const decisions = {
			topbarSearchIsEnabled: showTopbarSearch(),
			userHasAccessToGallery: galleryAccessEnabled(),
			reEvaluate: reEvaluate,
		};

		function reEvaluate() {
			// console.log("decisions reevaluate");
			decisions.topbarSearchIsEnabled = showTopbarSearch();
			decisions.userHasAccessToGallery = galleryAccessEnabled();
			$rootScope.$broadcast('decisions:updated', decisions);
		}

		function userHasFeature(featureName) {
			const userFeatures = userFeatureService.getFeatures();
			// console.log("userFeatureService", userFeatureService);
			// console.log("userFeatureService featurs", userFeatures);
			if (userFeatures && userFeatures.hasOwnProperty(featureName)) {
				return userFeatures[featureName];
			}
			return false; // TODO(jliarte): 13/11/18 feature defaults??
		}

		function showTopbarSearch() {
			return openGallery || userHasFeature('feature-vimojo-platform');
		}

		function galleryAccessEnabled() {
			return openGallery || userHasFeature('feature-vimojo-platform');
		}

		return decisions;
	}

}());
