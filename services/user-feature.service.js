// services/user-feature.service.js
(function () {
	'use strict';

	angular.module('app')
		.service('userFeatureService', userFeatureService);

	// userFeatureService.$inject = ['$q'];

	function userFeatureService() {
		let features;

		let service = {
			getFeatures: getFeatures,
			setFeatures: setFeatures,
		};

		function parseFeatures() {
			let features = {};
			console.log("parse features");
			const localSession = JSON.parse(localStorage.getItem('session'));
			if (localSession && localSession.features) {
				features = localSession.features || {};
			}
			console.log("parsed features ", features);
			return features;
		}

		function getFeatures() {
			if (!features) {
				features = parseFeatures() || {};
			}
			return features;
		}

		function setFeatures(data) {
			features = data;
		}

		return service;

	}

}());
