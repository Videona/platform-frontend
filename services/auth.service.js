// app/auth/auth.service.js

(function () {

	'use strict';

	angular
		.module('app')
		.service('authService', authService);

	authService.$inject = ['$state', 'angularAuth0', '$timeout', 'session'];

	function authService($state, angularAuth0, $timeout, session) {

		function login() {
			angularAuth0.authorize();
		}

		function handleAuthentication() {
			angularAuth0.parseHash(function(err, authResult) {
				if (authResult && authResult.accessToken && authResult.idToken) {
					setSession(authResult);
					const redirectState = session.getRedirectState();
					if (redirectState && redirectState != '') {
						session.setRedirectState();
						$state.go(redirectState);
					} else {
						$state.go('home');
					}
				} else if (err) {
					$timeout(function() {
						$state.go('home');
					});
					console.log(err);
				}
			});
		}

		function setSession(authResult) {
			// Set the time that the Access Token will expire at
			let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
			localStorage.setItem('access_token', authResult.accessToken);
			localStorage.setItem('id_token', authResult.idToken);
			localStorage.setItem('expires_at', expiresAt);

			getProfile(function (err, profile) {
				console.log("Getting profile, err: ", err);
				console.log("profile: ", profile);
				if (!err) {
					session.setUserInfo(profile);
					session.setToken(authResult.accessToken);
					session.setUserId();
				}
			});
		}

		function logout() {
			// Remove tokens and expiry time from localStorage
			localStorage.removeItem('access_token');
			localStorage.removeItem('id_token');
			localStorage.removeItem('expires_at');
			session.remove();
		}

		function isAuthenticated() {
			// Check whether the current time is past the
			// Access Token's expiry time
			let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
			return new Date().getTime() < expiresAt;
		}

		let userProfile;

		function getProfile(cb) {
			const accessToken = localStorage.getItem('access_token');
			if (!accessToken) {
				throw new Error('Access Token must exist to fetch profile');
			}
			angularAuth0.client.userInfo(accessToken, function(err, profile) {
				if (profile) {
					setUserProfile(profile);
				}
				cb(err, profile);
			});
		}

		function setUserProfile(profile) {
			userProfile = profile;
		}

		function getCachedProfile() {
			return userProfile;
		}

		function requireLoggedUser() {
			console.log('User is required for state: ', $state.current.name);
			if (!isAuthenticated()) {
				console.log('No user logged in. Redirecting...');
				session.setRedirectState('upload');
				// $state.go('signin');
				login();
			}
		}

		return {
			login: login,
			handleAuthentication: handleAuthentication,
			logout: logout,
			isAuthenticated: isAuthenticated,
			requireLoggedUser: requireLoggedUser,
		}

	}
})();