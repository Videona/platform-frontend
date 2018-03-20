angular.module('app')
	.service('user', ['api', userService]);

function userService(api) {
	var user = {
		data: null,
		get: get,
		reset: reset
	};

	return user;


	function get(userId, callback) {
		api.get(api.url + '/user/' + userId, function (data, status) {
			user.data = data;
			if(callback && typeof callback === 'function') {
				callback(data, status);
			}
		});
	}

	function reset() {
		user.data = null;
	}
}
