(function () {

	// App
	angular.module('app', ['ui.router', 'pascalprecht.translate'])
		.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', conf]);

	function conf($stateProvider, $urlRouterProvider, $translateProvider) {

		// Get browser lang and set this var
		var lang;
		var shortLang = navigator.language.split('-')[0];

		switch (shortLang) {
		case 'en':
			lang = 'en_us';
			break;

		default:
			lang = 'es_es';
			break;
		}

		$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.preferredLanguage(lang);

		// Router configuration
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'pages/home/view.html'
			})
			.state('login', {
				url: '/login?:redirect',
				templateUrl: 'pages/login/view.html'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'pages/register/view.html'
			});
	}
}());
