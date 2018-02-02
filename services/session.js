(function () {
	angular.module('app')
		.factory('session', ['api', sessionService]);

	function sessionService(api) {
		var session = {
			id: -1,
			name: '',
			email: '',
			role: '',
			verified: false,
			token: null,
			set: setSession,
			get: getSession,
			logout: logout,
			save: save,
		};

		getSession();

		return session;


		function setSession(newSession) {
			session.id = newSession._id || newSession.id || -1;
			session.name = newSession.name || '';
			session.email = newSession.email || '';
			session.role = newSession.role || '';
			session.verified = newSession.verified || false;

			if (newSession.token) {
				setToken(newSession.token, newSession);
			}

			// save(newSession);
			save();
		}

		// function setToken(token, newSession) {
		function setToken(token) {
			session.token = token;
			api.setToken(token);

			// var savedSession = JSON.parse( localStorage.getItem('session') );

			// if(!savedSession) {
			// 	if(typeof(newSession) !== 'undefined') {
			// 		savedSession = newSession;
			// 	} else {
			// 		savedSession = {};
			// 	}
			// }

			// savedSession.token = token;

			// save(savedSession);
			save();
		}

		function save(newSession) {
			var saveSession = newSession;

			// If not session param recieved, save the actual session service.
			if (typeof (saveSession) === 'undefined') {
				// Do both stringify and parse to clone instead of reference object.
				saveSession = JSON.parse(JSON.stringify(session));

				// Remove the functions...
				delete saveSession.set;
				delete saveSession.get;
				delete saveSession.logout;
				delete saveSession.save;
			}

			localStorage.setItem('session', JSON.stringify(saveSession));
		}

		function getSession() {
			var localSession = JSON.parse(localStorage.getItem('session'));

			if (localSession !== null) {
				setSession(localSession);
			} else {
				console.warn('There was no session stored. Logout forzed.');
				logout();
			}
		}

		function logout() {
			console.warn('Clossing session...');

			// Reset the session data
			session.id = -1;
			session.name = '';
			session.email = '';
			session.role = '';
			session.verified = false;

			localStorage.removeItem('session');
		}
	}
}());
