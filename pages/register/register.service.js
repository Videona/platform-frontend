(function () {
	angular.module('app')
		.factory('register', ['api', registerService]);

	function registerService(api) {
		var register = {
			validateUsernameAndEmail: validateUsernameAndEmail,
			register: send,
			pending: false,
		};

		return register;


		// Internal functions

		function send(name, email, pass, age, cb) {
			var body = {
				name: name,
				email: email,
				password: pass,
				age: age,
			};

			register.pending = true;
			api.post(api.url + '/user', body, function (data, status) {
				register.pending = false;
				var success = true;

				if (status >= 400) {
					console.error('Error while registering');
					success = false;
				}

				cb(success, data);
			});
		}

		function validateUsernameAndEmail(nickname, email, callback) {
			api.get(api.url + '/user/exist?name=' + nickname + '&email=' + email, function (data, status) {
				var success = true;

				if (status >= 400) {
					console.error('Error while registering');
					success = false;
				}

				console.log(data, status);
				callback(success, data);
			});
		}
	}
}());
