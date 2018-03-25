(function () {
	// App
	angular.module('app', ['app.config', 'app.flavour', 'ui.router', 'pascalprecht.translate', 'infinite-scroll', 'ngFileUpload'])
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
				controller: function (session) {},
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
			.state('videoDownload', {
				url: '/download/:id',
				parent: 'root',
				templateUrl: 'pages/video-download/video-download.view.html',
			})
			.state('videoPreview', {
				url: '/video/:id',
				parent: 'root',
				templateUrl: 'pages/video-detail/video-detail.view.html',
			});
	}
}());
