// services/assetService.js
"use strict";

angular.module('app')
	.service('assetService', ['api', '$q', assetService]);

function assetService(api, $q) {
	var service = {
		assets: [],
		get: get,
	};

	return service;

	function get() {
		return $q((resolve, reject) => {
			api.get(api.url + '/asset', function (data, status) {
				service.assets = data;
				resolve(data);
			});
		});
	}

}
