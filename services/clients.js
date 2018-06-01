(function () {
	angular.module('app')
		.service('clients', ['api', clientervice]);

	function clientervice(api) {
		var client = {
			list: null,
			get: get,
			add: add,
			// update: update,
			// delete: remove,
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

		function add(name, host, user, pass, secure, folderRaw, folderEdited, callback) {
			if(!name || !host || !user || !pass || !folderRaw || !folderEdited) {
				console.log(name, host, user, pass, folderRaw, folderEdited)
				return false;
				callback(null);
			}

			var data = {
				name: name,
				ftp: {
					host: host,
					user: user,
					password: pass,
					secure: secure || false,
					folderRaw: folderRaw,
					folderEdited: folderEdited
				}
			};
			api.post(api.url + '/client', data, function (data) {
				if(data && typeof data._id !== 'undefined') {
					client.list.push(data);
				}
				callback(data);
			})
		}

		function reset() {
			client.list = null;
		}
	}
}());