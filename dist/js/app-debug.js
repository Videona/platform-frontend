(function () {
	// App
	angular.module('app', ['ui.router', 'pascalprecht.translate', 'vcRecaptcha'])
		.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', conf]);

	function conf($stateProvider, $urlRouterProvider, $translateProvider) {
		// Get browser lang and set this var
		var shortLang = navigator.language.split('-')[0];
		var lang;

		switch (shortLang) {
		case 'es':
			lang = 'es_es';
			break;

		case 'en':
			lang = 'en_us';
			break;

		default:
			lang = 'es_es';
		}

		$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.preferredLanguage(lang);

		// Router configuration
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'pages/home/view.html',
			})
			.state('login', {
				url: '/login?:redirect',
				templateUrl: 'pages/login/login.view.html',
			})
			.state('register', {
				url: '/register',
				templateUrl: 'pages/register/register.view.html',
			})
			.state('terms', {
				url: '/terms',
				templateUrl: 'pages/terms/terms.view.html',
			});
	}
}());

(function () {
	// English
	angular.module('app').config(['$translateProvider', translate]);

	function translate($translateProvider) {
		$translateProvider.translations('en_us', {
			HELLO: 'Hello',
			WORLD: 'world',

			LOADING: 'loading...',

			LOGIN: 'Login',
			REGISTER: 'Register',
			USERNAME: 'Username',
			PASSWORD: 'Password',
			EMAIL: 'Email',
			FORGOTTEN_PASSWORD: 'Forgotten password?',
			LOGIN_ACTION: 'Log in',
			REGISTER_ACTION: 'Register',
			NEXT_ACTION: 'Next',
			WRONG_LOGIN: 'Wrong user or password. Please, try again.',
			WRONG_REGISTER: 'Wrong register data. Check it out, and try again, please.',
			REGISTER_SLOGAN: 'Mobile Journalism app for Breaking\n the video editing barrier on mobile',
			QUESTION_AGE: 'How old are you?',
			ACCEPT_CONDITIONS_1: 'I\'ve read and I accept ',
			CONDITIONS: 'the terms of service',
			ACCEPT_CONDITIONS_2: ' of Vimojo',
			COMPLETED: 'Ready!',
		});
	}
}());

(function () {
	// English
	angular.module('app').config(['$translateProvider', translate]);

	function translate($translateProvider) {
		$translateProvider.translations('es_es', {
			HELLO: 'Hola',
			WORLD: 'mundo',

			LOADING: 'cargando...',

			LOGIN: 'Acceder',
			REGISTER: 'Registro',
			USERNAME: 'Usuario',
			PASSWORD: 'Contraseña',
			EMAIL: 'Correo electrónico',
			FORGOTTEN_PASSWORD: '¿Has olvidado tu contraseña?',
			LOGIN_ACTION: 'Inicia sesión',
			REGISTER_ACTION: 'Regístrate',
			NEXT_ACTION: 'Siguiente',
			WRONG_LOGIN: 'Usuario o contraseña incorrectos. Inténtalo de nuevo, por favor.',
			WRONG_REGISTER: 'Los datos de registro son incorrectos. Revísalos, e inténtalo de nuevo, por favor.',
			REGISTER_SLOGAN: 'Mobile Journalism app for Breaking\n the video editing barrier on mobile',
			QUESTION_AGE: '¿Cuántos años tienes?',
			ACCEPT_CONDITIONS_1: 'He leído, entiendo y acepto ',
			CONDITIONS: 'las condiciones del servicio',
			ACCEPT_CONDITIONS_2: ' de Vimojo',
			COMPLETED: '¡Listo!',
		});
	}
}());

(function () {
	angular.module('app')
		.factory('api', ['$http', apiService]);

	function apiService($http) {
		var api = {
			url: 'http://localhost:3000',
			token: '',
			get: get,
			post: post,
			del: del,
			setToken: setToken,
		};

		return api;

		function post(url, data, callback) {
			return request('POST', url, data, callback);
		}

		function get(url, callback) {
			return request('GET', url, null, callback);
		}

		function del(url, data, callback) {
			return request('DELETE', url, data, callback);
		}

		function request(type, url, data, callback) {
			var req = {
				method: type,
				headers: {},
				url: url,
			};

			if (api.token !== '') {
				req.headers.authorization = 'Bearer ' + api.token;
			}

			if (type === 'POST' || type === 'DELETE' || type === 'PUT' || type === 'PATCH') {
				req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				req.transformRequest = transformRequest;
				req.data = data;
			}

			return $http(req)
				.then(function (r) {
					onSuccess(r, callback);
				}).catch(function (r) {
					onError(r, callback);
				});
		}

		function transformRequest(obj) {
			var str = [];
			var keys = Object.keys(obj);
			var values = Object.values(obj);

			for (let i = 0; i <= keys.length; i += 1) {
				str.push(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(values[i]));
			}

			return str.join('&');
		}

		function onSuccess(response, callback) {
			var data = response.data;
			var status = response.status;
			// var statusText = response.statusText;
			var headers = response.headers;
			var config = response.config;

			if (typeof (callback) === 'function') {
				callback(data, status, headers, config);
			}
		}

		function onError(response, callback) {
			console.log(response);
			var data = response.data;
			var status = response.status;
			// var statusText = response.statusText;
			var headers = response.headers;
			var config = response.config;

			console.error('Error ' + status + ' in HTTP request');

			if (typeof (callback) === 'function') {
				callback(data, status, headers, config);
			}
		}

		function setToken(token) {
			if (typeof (token) !== 'undefined') {
				api.token = token;
			}
		}
	}
}());

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
			session.id = newSession.id || -1;
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

(function () {
	angular.module('app').controller('LoginController', ['login', 'session', '$state', '$stateParams', '$translate', LoginController]);

	function LoginController(login, session, $state, $stateParams, $translate) {
		var self = this;

		// Service binding
		self.service = login;

		// Properties
		self.username = '';
		self.password = '';
		self.error = '';
		self.loading = false;

		// Methods
		self.submit = submit;


		// On Run...
		if (session.id > 0) {
			console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}


		// Internal functions
		function submit() {
			if (self.username !== '' && self.password !== '') {
				self.loading = true;
				self.error = null;
				console.log('Submiting...');
				self.service.login(self.username, self.password, success);
			} else {
				self.error = $translate.instant('WRONG_LOGIN');
			}
		}

		function success(result) {	// , data) {
			self.loading = false;
			if (result) {
				console.log('Logged in! Redirecting...');
				$state.go($stateParams.redirect || 'home');
			} else {
				console.log('Bad username or password...');
				self.error = $translate.instant('WRONG_LOGIN');
				// self.error = 'Wrong login data. Check it out...';
			}
		}
	}
}());

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

(function () {
	angular.module('app').controller('RegisterController', ['register', 'login', 'session', '$state', '$stateParams', '$translate', RegisterController]);

	function RegisterController(register, login, session, $state, $stateParams, $translate) {
		var self = this;

		// Service binding
		self.service = register;

		// Properties
		self.username = '';
		self.email = '';
		self.password = '';
		self.age = '';
		self.terms = false;
		self.error = '';
		self.loading = false;
		self.status = {
			register: true,
			terms: false,
			captcha: false,
		};

		// Methods
		self.submit = submit;


		// On Run...
		if (session.id > 0) {
			console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}


		// Internal functions
		function submit() {
			if (self.username !== '' && self.password !== '') {
				self.loading = true;
				self.error = null;
				console.log('Submiting...');
				self.service.register(self.username, self.email, self.password, success);
			} else {
				self.error = $translate.instant('WRONG_REGISTER');
			}
		}

		function success(result) { // , data) {
			self.loading = false;
			if (result) {
				self.loading = true;
				console.log('Registered! Logging in...');
				login.login(self.username, self.password, function (loginResult) {
					self.loading = false;
					if (loginResult) {
						$state.go($stateParams.redirect || 'home');
					} else {
						self.error = 'Login error. Please, try again...';
						$state.go('login');
					}
				});
			} else {
				console.log('Bad username, email or password...');
				self.error = $translate.instant('WRONG_REGISTER');
			}
		}
	}
}());

(function () {
	angular.module('app')
		.factory('register', ['api', registerService]);

	function registerService(api) {
		var register = {
			register: send,
			pending: false,
		};

		return register;


		// Internal functions

		function send(name, email, pass, cb) {
			var body = {
				name: name,
				email: email,
				password: pass,
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
