(function () {
	// App
	angular.module('app', ['ui.router', 'pascalprecht.translate'])
		.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', conf]);

	function conf($locationProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
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

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false,
		});

		// Router configuration
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('root', {
				controller: function(session) {},
				abstract: true,
			})
			.state('home', {
				url: '/',
				templateUrl: './pages/home/home.view.html',
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
			})
			.state('gallery', {
				url: '/gallery',
				templateUrl: 'pages/gallery/gallery.view.html',
			})
			.state('videoDownload', {
				url: '/download/:id',
				parent: 'root',
				templateUrl: 'pages/video-download/video-download.view.html',
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
			ERROR_USERNAME_EMPTY: 'The field username is empty.',
			ERROR_USERNAME_MIN_LENGTH: 'The username is less than 5 characters long.',
			ERROR_USERNAME_MAX_LENGTH: 'The username is longer than 30 characters long',
			ERROR_USERNAME_ALREADY_IN_USE: 'The username is already in use. Try a new one.',
			ERROR_PASSWORD_EMPTY: 'The field password is empty.',
			ERROR_PASSWORD_MIN_LENGTH: 'The password is less than 5 characters long.',
			ERROR_PASSWORD_MAX_LENGTH: 'The password is longer than 30 characters long',
			ERROR_EMAIL_EMPTY: 'The field email is empty.',
			ERROR_EMAIL_MIN_LENGTH: 'The email is less than 5 characters long.',
			ERROR_EMAIL_MAX_LENGTH: 'The email is longer than 30 characters long',
			ERROR_EMAIL_NOT_VALID: 'The email is not valid.',
			ERROR_EMAIL_ALREADY_IN_USE: 'The email is already in use. Try a new one',
			ERROR_AGE_EMPTY: 'The field age is empty',
			ERROR_AGE_WRONG: 'The age must be valid',
			ERROR_TERMS_EMPTY: 'You must accept the terms and conditions of the service',
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
			REGISTER_SLOGAN: 'Aplicación de periodismo móvil\nRompiendo la barrera de edición en móvil.',
			QUESTION_AGE: '¿Cuántos años tienes?',
			ACCEPT_CONDITIONS_1: 'He leído, entiendo y acepto ',
			CONDITIONS: 'las condiciones del servicio',
			ACCEPT_CONDITIONS_2: ' de Vimojo',
			COMPLETED: '¡Listo!',
			ERROR_USERNAME_EMPTY: 'El nombre de usuario no puede estar vacío.',
			ERROR_USERNAME_MIN_LENGTH: 'El nombre de usuario necesita ser mas largo.',
			ERROR_USERNAME_MAX_LENGTH: 'El nombre de usuario necesita ser menos largo',
			ERROR_USERNAME_ALREADY_IN_USE: 'El nombre de usuario ya está en uso. Prueba con uno nuevo.',
			ERROR_PASSWORD_EMPTY: 'La contraseña no puede estar vacía.',
			ERROR_PASSWORD_MIN_LENGTH: 'La contraseña necesita ser mas larga.',
			ERROR_PASSWORD_MAX_LENGTH: 'La contraseña necesita ser menos larga.',
			ERROR_EMAIL_EMPTY: 'El email no puede estar vacío.',
			ERROR_EMAIL_MIN_LENGTH: 'El email necesita ser mas largo.',
			ERROR_EMAIL_MAX_LENGTH: 'El email necesita ser menos largo.',
			ERROR_EMAIL_NOT_VALID: 'El email no es válido.',
			ERROR_EMAIL_ALREADY_IN_USE: 'El email ya está en uso. Prueba con uno nuevo.',
			ERROR_AGE_EMPTY: 'La edad no puede estar vacía.',
			ERROR_AGE_WRONG: 'La edad tiene que ser válida.',
			ERROR_TERMS_EMPTY: 'Tienes que aceptar los términos y condiciones de uso.',
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
			download: download,
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

		function download(url, callback) {

			var req = {
				method: 'GET',
				headers: {},
				url: url,
				responseType: 'arraybuffer'
			};

			if (api.token !== '') {
				req.headers.authorization = 'Bearer ' + api.token;
			}

			return $http(req)
				.then(function (response) {
					var data = response.data;
					var headers = response.headers();
					var filename = headers['x-filename'];
					var contentType = headers['content-type'];
			 
					var linkElement = document.createElement('a');
					try {
						var blob = new Blob([data], { type: contentType });
						var url = window.URL.createObjectURL(blob);
		
						linkElement.setAttribute('href', url);
						linkElement.setAttribute('download', filename);

						var clickEvent = new MouseEvent('click', {
							'view': window,
							'bubbles': true,
							'cancelable': false
						});
						linkElement.dispatchEvent(clickEvent);
					} catch (ex) {
						console.log(ex);
					}
					onSuccess(response, callback);
				}).catch(function (response) {
					onError(response, callback);
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

angular.module('app')
	.service('video', ['api', videoService]);

function videoService(api) {
	var video = {
		data: null,
		get: get,
		reset: reset
	};

	return video;


	function get(videoId) {
		api.get(api.url + '/video/' + videoId, function (data) {
			video.data = data;
		});
	}

	function reset() {
		video.data = null;
	}
}

angular.module('app')
	.controller('GalleryController', ['$stateParams', 'gallery', Gallery]);

function Gallery($stateParams, gallery) {
	var self = this;

	self.gallery = gallery;
}

angular.module('app')
	.service('Gallery', ['api', galleryService]);

function galleryService(api) {
	var gallery = {
		get: get,
	};

	return gallery;


	function get() {
		api.get(api.url + '/gallery', function (data, status) {
			// TO-DO: Complete stuff
		});
	}
}

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
		self.error = [];
		self.loading = false;
		self.status = {
			register: true,
			terms: false,
			captcha: false,
		};

		// Methods
		self.list1 = list1;
		self.list2 = list2;
		self.submit = submit;

		// On Run...
		if (session.id > 0) {
			// console.log('Found a session! Redirecting...');
			$state.go($stateParams.redirect || 'home');
		}

		// Internal functions
		function list1() {
			self.loading = true;
			self.error = null;

			validateSlide1(function (error) {
				if (!error) {
					self.service.validateUsernameAndEmail(self.username, self.email, pushList2);
				} else {
					self.loading = false;
				}
			});
		}

		function list2() {
			self.loading = true;

			validateSlide2(function (error) {
				self.loading = false;
				
				if (!error) {
					self.status.terms = false;
					self.status.captcha = true;
				}
			});
		}

		function submit() {
			
			self.error = [];
			
			if (self.username !== '' && self.password !== '') {
				self.loading = true;
				self.service.register(self.username, self.email, self.password, self.age, success);
			} else {
				self.error.push($translate.instant('WRONG_REGISTER'));
			}
		}

		function pushList2(response) {
			self.loading = false;
			
			if (response) {
				self.status.register = false;
				self.status.terms = true;
			}
		}

		function success(result) { // , data) {
			self.loading = false;
			if (result) {
				self.loading = true;
				// console.log('Registered! Logging in...');

				login.login(self.username, self.password, function (loginResult) {
					self.loading = false;
					if (loginResult) {
						$state.go($stateParams.redirect || 'home');
					} else {
						self.error.push($translate.instant('WRONG_LOGIN'));
						$state.go('login');
					}
				});
			} else {
				// console.log('Bad username, email or password...');
				self.error.push($translate.instant('WRONG_REGISTER'));
			}
		}

		function validateSlide1(callback) {
			self.error = [];
			var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

			if (self.username === '') {
				self.error.push($translate.instant('ERROR_USERNAME_EMPTY'));
			} else if (self.username.length < 5) {
				self.error.push($translate.instant('ERROR_USERNAME_MIN_LENGTH'));
			} else if (self.username.length > 30) {
				self.error.push($translate.instant('ERROR_USERNAME_MAX_LENGTH'));
			}

			if (self.password === '') {
				self.error.push($translate.instant('ERROR_PASSWORD_EMPTY'));
			} else if (self.password.length < 5) {
				self.error.push($translate.instant('ERROR_PASSWORD_MIN_LENGTH'));
			} else if (self.password.length > 30) {
				self.error.push($translate.instant('ERROR_PASSWORD_MAX_LENGTH'));
			}

			if (self.email === '') {
				self.error.push($translate.instant('ERROR_EMAIL_EMPTY'));
			} else if (self.email.length < 5) {
				self.error.push($translate.instant('ERROR_EMAIL_MIN_LENGTH'));
			} else if (self.email.length > 30) {
				self.error.push($translate.instant('ERROR_EMAIL_MAX_LENGTH'));
			} else if (!EMAIL_REGEXP.test(self.email)) {
				self.error.push($translate.instant('ERROR_EMAIL_NOT_VALID'));
			}

			if (self.error.length === 0) {
				callback(false);
			} else {
				callback(true);
			}
		}

		function validateSlide2(callback) {
			self.error = [];

			if (self.age === '') {
				self.error.push($translate.instant('ERROR_AGE_EMPTY'));
			} else if (isNaN(parseInt(self.age, 10)) || parseInt(self.age, 10) <= 0) {
				self.error.push($translate.instant('ERROR_AGE_WRONG'));
			}

			if (self.terms === false) {
				self.error.push($translate.instant('ERROR_TERMS_EMPTY'));
			}

			if (self.error.length === 0) {
				callback(false);
			} else {
				callback(true);
			}
		}
	}
}());

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

angular.module('app')
	.controller('VideoDownloadController', ['$stateParams', 'video', 'videoDownload', VideoDownload]);

function VideoDownload($stateParams, video, videoDownload) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';

	self.video = video;

	self.download = download;

	self.video.get(self.id);


	function download() {
		videoDownload.get(self.id, self.code);
	}
}

angular.module('app')
	.service('videoDownload', ['api', videoDownloadService]);

function videoDownloadService(api) {
	var video = {
		get: get
	};

	return video;


	function get(videoId, code) {
		api.download(api.url + '/video/' + videoId + '/original?code=' + code, function (data, status, headers) {
			if(status >= 400 ) {
				console.error('Unable to download file.');
			}
		});
	}
}
