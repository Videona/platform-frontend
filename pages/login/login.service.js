(function () {
	angular.module('app')
		.factory('login', ['api', 'session', loginService]);

	function loginService(api, session) {
		var login = {
			login: send,
			pending: false,
		};

		return login;

		// Internal functions

		function send(name, pass, cb) {
			var body = {
				// name: name,
				email: name,
				password: pass,
			};

			login.pending = true;
			return api.post(api.url + '/login', body, function (data, status) {
				login.pending = false;
				var success = false;

				if (status >= 400) {
					console.error('Error while logging in');
					success = false;
				} else {
					success = true;
					session.set(data);
				}

				if (typeof (cb) === 'function') {
					cb(success, data);
				} else {
					console.warn('No callback specified for login.');
				}
			});
		}
	}
}());
