(function () {
	// App
	angular.module('app', ['app.config', 'app.flavour', 'ui.router', 'pascalprecht.translate', 'infinite-scroll',
		'ngFileUpload', 'angularMoment', 'ngMaterial', 'ngMap', 'ngSanitize', 'com.2fdevs.videogular',
		'com.2fdevs.videogular.plugins.controls', 'com.2fdevs.videogular.plugins.overlayplay',
		'com.2fdevs.videogular.plugins.poster'])
		.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', '$mdThemingProvider',
			'$mdDateLocaleProvider', conf]);

	function conf($locationProvider, $stateProvider, $urlRouterProvider, $translateProvider, $mdThemingProvider,
	              $mdDateLocaleProvider) {
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
			.state('signin', {
				url: '/sign-in',
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
			.state('videoPreview', {
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
				parent: 'videoPreview',
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
			var m = moment(dateString, 'DD/MM/YYYY', true);
			return m.isValid() ? m.toDate() : new Date(NaN);
		};

		// TODO(jliarte): translation cannot be injected in config phase
		// $mdDateLocaleProvider.msgCalendar = $translate.instant('MSG_CALENDAR');
		// $mdDateLocaleProvider.msgOpenCalendar = $translate.instant('MSG_OPEN_CALENDAR');
	}

}());
