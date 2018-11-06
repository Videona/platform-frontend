(function () {
	// App
	angular.module('app', ['auth0.auth0', 'app.config', 'app.flavour', 'ui.router', 'pascalprecht.translate',
		'infinite-scroll', 'ngFileUpload', 'angularMoment', 'ngMaterial', 'ngMap', 'ngSanitize', 'com.2fdevs.videogular',
		'com.2fdevs.videogular.plugins.controls', 'com.2fdevs.videogular.plugins.overlayplay',
		'com.2fdevs.videogular.plugins.poster', 'md.data.table', 'angulartics', 'angulartics.google.analytics',
		'angulartics.mixpanel'])
		.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', '$mdThemingProvider',
			'$mdDateLocaleProvider', 'angularAuth0Provider', 'auth0ClientId', 'auth0Domain', 'auth0Audience',
			'auth0Redirect_uri', 'auth0Scope', conf]);

	function conf($locationProvider, $stateProvider, $urlRouterProvider, $translateProvider, $mdThemingProvider,
	              $mdDateLocaleProvider, angularAuth0Provider, auth0ClientId, auth0Domain, auth0Audience,
	              auth0Redirect_uri, auth0Scope) {
		// Get browser lang and set this var
		const shortLang = navigator.language.split('-')[0];
		let lang;

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

		moment.locale(navigator.language);
		setupDateLocale(shortLang, $mdDateLocaleProvider);
		setupMaterialTheming($mdThemingProvider);

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
				controller: ['session', function (session) {}],
				abstract: true,
			})
			.state('home', {
				url: '/',
				controller: ['$state', function ($state) { 
					$state.go('gallery'); 
				}],
			})
			.state('authCallback', {
				url: '/authcallback',
				controller: 'AuthCallbackController',
				templateUrl: './pages/auth-callback/auth-callback.view.html',
			})
			.state('signin', {
				url: '/sign-in',
				templateUrl: './pages/home/home.view.html',
			})
			.state('login', {
				url: '/login?:redirect',
				templateUrl: 'pages/login/login.view.html',
			})
			.state('register', {
				url: '/register?product=:productId',
				templateUrl: 'pages/register/register.view.html',
			})
      .state('pricing', {
        url: '/pricing',
        templateUrl: 'pages/pricing/pricing.view.html',
      })
      .state('terms', {
        url: '/terms',
        templateUrl: 'pages/terms/terms.view.html',
      })
			.state('gallery', {
				url: '/gallery',
				templateUrl: 'pages/gallery/gallery.view.html',
			})
			.state('search', {
				url: '/search?:q',
				templateUrl: 'pages/search/search.view.html',
			})
			.state('upload', {
				url: '/upload',
				parent: 'root',
				templateUrl: 'pages/upload/upload.view.html',
			})
			.state('userGallery', {
				url: '/user/:userId/videos',
				parent: 'root',
				templateUrl: 'pages/user-gallery/user-gallery.view.html',
			})
			.state('videoDetail', {
				url: '/video/:id',
				parent: 'root',
				templateUrl: 'pages/video-detail/video-detail.view.html',
			})
			.state('videoDownloadRedirect', {
				url: '/download/:id',
				controller: ['$state', '$stateParams', function ($state, $stateParams) { 
					$state.go('videoDownload', {id: $stateParams.id}); 
				}],
			})
			.state('videoDownload', {
				parent: 'videoDetail',
				url: '/download?:autoDownload',
				views: {
					'download': {
						templateUrl: 'pages/video-download/video-download.view.html',
					}
				}
			})
			.state('videoDetailEdit', {
				url: '/video/:id/edit',
				parent: 'root',
				templateUrl: 'pages/video-detail-edit/video-detail-edit.view.html',
			});

		// Initialization for the angular-auth0 library
		angularAuth0Provider.init({
			clientID: auth0ClientId,
			domain: auth0Domain,
			responseType: 'token id_token',
			audience: auth0Audience,
			redirectUri: auth0Redirect_uri,
			scope: auth0Scope
		});

	}

	function setupMaterialTheming($mdThemingProvider) {
		// TODO(jliarte): define palette for m4n and swicth based on flavor env var
		$mdThemingProvider.definePalette('vimojo', {
			'50': 'f14b51',
			'100': 'F23260',
			'200': 'f14b51',
			'300': 'fac5c7',
			'400': '000400',
			'500': 'f14b51', // primary color
			'600': 'D54348', // primary dark
			'700': '000700',
			'800': 'ffffff', // md-hue-2
			'900': '000900',
			'A100': 'f14b51',
			'A200': '00f200',
			'A400': '00f400',
			'A700': '00f700',
			'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		                                      // on this palette should be dark or light

			'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
				'200', '300', '400', 'A100'],
			'contrastLightColors': undefined    // could also specify this if default was 'dark'
		});

		$mdThemingProvider.theme('default')
			.primaryPalette('blue');
	}

	function setupDateLocale(lang, $mdDateLocaleProvider) {
		const localeDate = moment.localeData(lang);

		$mdDateLocaleProvider.months = localeDate.months();
		$mdDateLocaleProvider.shortMonths = localeDate.monthsShort();
		$mdDateLocaleProvider.days = localeDate.weekdays();
		$mdDateLocaleProvider.shortDays = localeDate.weekdaysShort();
		$mdDateLocaleProvider.firstDayOfWeek = localeDate.firstDayOfWeek();

		$mdDateLocaleProvider.formatDate = function(date) {
			return moment(date).format('DD/MM/YYYY');
		};

		$mdDateLocaleProvider.parseDate = function(dateString) {
			const m = moment(dateString, 'DD/MM/YYYY', true);
			return m.isValid() ? m.toDate() : new Date(NaN);
		};

		// TODO(jliarte): translation cannot be injected in config phase
		// $mdDateLocaleProvider.msgCalendar = $translate.instant('MSG_CALENDAR');
		// $mdDateLocaleProvider.msgOpenCalendar = $translate.instant('MSG_OPEN_CALENDAR');
	}

}());
