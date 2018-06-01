(function () {
	angular.module('app')
		.service('distribute', ['api', distributionService]);

	function distributionService(api) {
		var distribution = {
			add: add,
			get: get
		};

		return distribution;


		function add(videoId, clientId, callback) {
			var distData = {
				client: clientId,
				video: videoId,
				// method: 'ftp',
			}

			api.post(api.url + '/distribute', distData, function (data, status) {
				typeof callback === 'function' && callback(data, status);
			});
		}

		function get(id, callback) {
			api.get(api.url + '/distribute/' + id, function (data, status) {
				typeof callback === 'function' && callback(data, status);
			});
		}
	}
}());