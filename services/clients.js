(function () {
	angular.module('app')
		.service('clients', ['api', clientervice]);

	function clientervice(api) {
		var client = {
			list: null,
			get: get,
			add: add,
			update: update,
			delete: remove,
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

		function add(name, host, user, pass, secure, folderRaw, folderEdited, id, callback) {
			if (!name || !host || !user || !pass || !folderRaw || !folderEdited) {
				console.error(name, host, user, pass, folderRaw, folderEdited)
				callback(null);
				return false;
			}

			if (typeof id === 'function') {
				callback = id;
				id = undefined;
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
			if (typeof id != 'undefined' && id) {
				data._id = id;
			}
			api.post(api.url + '/client', data, function (data) {
				if(data && typeof data._id !== 'undefined') {
					client.list.push(data);
				}
				callback(data);
			})
		}

		function update(name, host, user, pass, secure, folderRaw, folderEdited, id, callback) {
			if (!name || !host || !user || !pass || !folderRaw || !folderEdited || !id) {
				console.error(name, host, user, pass, folderRaw, folderEdited, id)
				callback(null);
				return false;
			}

			var data = {
				_id: id,
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
			api.put(api.url + '/client', data, function (data) {
				if (data && typeof data._id !== 'undefined') {
					for (var i = 0; i < client.list.length; i++) {
						if (client.list[i]._id === data._id) {
							client.list[i] = data;
							break;
						}
					}
				}
				callback(data);
			});
		}

		function remove(id, callback) {

			console.log('Removing ' + id);

			api.del(api.url + '/client/' + id, {}, function (data) {
				if(data) {
					for (var i = 0; i < client.list.length; i++) {
						if (client.list[i]._id === id) {
							client.list.splice(i, 1);
							break;
						}
					}
				}

				typeof callback === 'function' && callback(data);
			})
		}

		function reset() {
			client.list = null;
		}
	}
}());