(function () {

	angular.module('app')
		.factory('register', ['api', registerService]);

	function registerService(api) {

		var register = {
			register: send,
			pending: false
		};

		return register;


		// Internal functions

		function send(name, email, pass, cb) {
			
			var body = {
				name: name,
				email: email,
				password: pass
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

	}

}());