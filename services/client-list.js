(function () {
	angular.module('app')
		.service('clientList', ['api', clientService]);

	function clientService(api) {
		var client = {
			list: null,
			get: get,
			reset: reset
		};

		return client;


		function get(callback) {
			api.get(api.url + '/client', function (data, status) {
				client.list = data;
				if(callback && typeof callback === 'function') {
					callback(data, status);
				}
			});
		}

		function reset() {
			client.list = null;
		}
	}
}());