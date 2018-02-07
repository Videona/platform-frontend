angular.module('app')
	.service('Gallery', ['api', galleryService]);

function galleryService(api) {
	var gallery = {
		get: get,
	};

	return gallery;


	function get() {
		api.get(api.url + '/gallery', function (data, status) {
			// TO-DO: Complete stuff
		});
	}
}
