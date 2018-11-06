(function () {
	angular.module('app').controller('RegisterController', ['register', 'login', 'session', 'nodeEnv', '$state',
		'$stateParams', '$translate', 'flavourString', 'page', 'pricing', 'moment', 'authService', '$analytics',
		RegisterController]);

	function RegisterController(register, login, session, nodeEnv, $state, $stateParams, $translate, flavourString, page,
	                            pricing, moment, authService, $analytics) {
		var self = this;

		self.flavour = flavourString;
		self.currentProduct = $stateParams.productId || 'free';
		self.currentProductDetails = getProductDetails(self.currentProduct); // TODO(jliarte): 9/10/18 if no details, set free plan and details
		self.endOfPromotion = moment(new Date()).add(1, 'months').format('ddd, DD MMM YYYY'); // TODO(jliarte): 9/10/18 improve format - add locale?

		// Methods
		self.getProductDetails = getProductDetails;
		self.createAccount = createAccount;
		
		// Setup page title
		page.setPageTitle($translate.instant('Sign up ') + ' | ' + flavourString);

		// Internal functions
		function getProductDetails(productId) {
			return pricing.getProductDetails(productId);
		}

		function createAccount() {
			$analytics.eventTrack('Create Account Click', {  productId: self.currentProduct });
			authService.login();
		}

		function redirect() {
			$state.go($stateParams.redirect || 'gallery');
		}
	}
}());
