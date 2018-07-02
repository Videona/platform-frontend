(function () {
	angular.module('app')
		.factory('session', ['api', '$translate', sessionService]);

	function sessionService(api, $translate) {
		const session = {
			id: -1,
			name: '',
			username: '',
			email: '',
			role: 'norole',
			verified: false,
			token: null,
			currentLang: $translate.use(),
			set: setSession,
			get: getSession,
			setUserInfo: setUserInfo,
			remove: remove,
			setToken: setToken,
			setUserId: setUserId,
			setRedirectState: setRedirectState,
			getRedirectState: getRedirectState,
		};

		getSession();

		return session;

		function getSession() {
			const localSession = JSON.parse(localStorage.getItem('session'));
			console.log("session get with local storage session ", localSession);

			if (localSession !== null) {
				setSession(localSession);
			} else {
				console.warn('There was no session stored. Logout forzed.');
				// logout();
			}
		}

		function setSession(sessionData) {
			session.id = sessionData.id  || -1;
			session.name = sessionData.name || '';
			session.username = sessionData.username || sessionData.name || '';
			session.email = sessionData.email || '';
			session.role = sessionData.role || '';
			session.pic = sessionData.pic || '';
			session.verified = sessionData.verified || false;

			if (sessionData.token) {
				setToken(sessionData.token, sessionData);
			}

			save();
		}

		function setUserInfo(profileData) {
			console.log("set session with session: ", profileData);
			session.authId = profileData.sub || -1;
			session.name = profileData.name || '';
			session.username = profileData.nickname || profileData.name || '';
			session.email = profileData.email || '';
			session.role = profileData.role || '';
			session.pic = profileData.picture || '';
			session.verified = profileData.email_verified || false;

			if (profileData.token) {
				setToken(profileData.token, profileData);
			}

			save();
		}

		function setToken(token) {
			session.token = token;
			// TODO(jliarte): 27/06/18 let the api get the token from the session? revert dependency
			api.setToken(token);
			save();
		}

		function setUserId() {
			api.get(api.url + '/user/getId', function(user) {
				if (user) {
					console.log("retrieved user id from backend is", user);
					session.id = user.id || -1;
					save();
				}
			});
		}

		function save(newSession) {
			console.log("saving sesssion ", newSession);
			let saveSession = newSession;

			// If not session param recieved, save the actual session service.
			if (typeof (saveSession) === 'undefined') {
				// Do both stringify and parse to clone instead of reference object.
				saveSession = JSON.parse(JSON.stringify(session));
				console.log("save session ", saveSession);

				// Remove the functions...
				delete saveSession.set;
				delete saveSession.get;
				delete saveSession.setUserInfo;
				delete saveSession.remove;
				delete saveSession.setToken;
				delete saveSession.setRedirectState;
				delete saveSession.getRedirectState;
			}

			localStorage.setItem('session', JSON.stringify(saveSession));
		}

		function remove() {
			// Reset the session data
			session.id = -1;
			session.name = '';
			session.email = '';
			session.role = '';
			session.pic = '';
			session.verified = false;

			localStorage.removeItem('session');
		}

		function setRedirectState(state) {
			if (state && state != '') {
				localStorage.setItem('stateRedirect', state);
			} else {
				localStorage.removeItem('stateRedirect');
			}
		}

		function getRedirectState() {
			return localStorage.getItem('stateRedirect');
		}
	}
}());
