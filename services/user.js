(function () {
	class UserService {
		constructor(api) {
			this.api = api;
		}

		getUser(userId) {
			return new Promise((resolve, reject) => {
				let query = '/user/' + userId;
				this.api.get(this.api.url + query, function (data, status) {
					if (status < 400 && data !== undefined) {
						resolve(data);
					} else {
						reject(status, data);
					}
				}.bind(this));
			})
		}
	}

	angular.module('app')
		.service('user', ['api', UserService]);
}());