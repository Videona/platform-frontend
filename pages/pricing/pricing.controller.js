angular.module('app')
	.controller('PricingController', ['$mdToast', '$scope', '$translate', 'page', '$location', '$anchorScroll',
		'pricing', '$state', '$analytics', 'session', PricingController]);

function PricingController($mdToast, $scope, $translate, page, $location, $anchorScroll, pricing, $state, $analytics,
                           session) {
	var self = this;
	page.setPageTitle($translate.instant('PRICING_PAGE_WEB_TITLE'));

	let selectedPlan;
	self.plans = pricing.getPlans();
	self.featureTable = pricing.getFeatureTable();
	self.featureTableProducts = [ 'free', 'witness', 'journalist', 'hero', 'superHero' ];

	// selfish Methods
	self.expandPlanInfo = function (productId) {
		console.log("request more info of productId ", productId);
		selectedPlan = productId;
		$analytics.eventTrack('Product Detail', {  productId: productId });

		$location.hash('feature-table-comparison');
		$anchorScroll.yOffset = 20;
		$anchorScroll();
	};

	self.buttonClassForPlanPlan = function (productId) {
		if (productId === 'hero') {
			return 'md-primary';
		}
	};

	self.buyProduct = function (productId) {
		$analytics.eventTrack('Product Subscription Click', {  productId: productId });
		console.log("user product purchase ", productId);
		session.setCurrentProduct(productId);
		$state.go('register', { productId: productId });
	}

	// self.update = function (isValidForm) {
	// 	closeSelectFields();
	// 	if (!isValidForm) {
	// 		return showMessage($translate.instant('VIDEO_EDIT_MSG_INVALID_FORM'));
	// 	}
	// 	self.actionsDisabled = true;
	// 	sanitizeVideoFields();
	// 	console.log("video to update is ", self.video);
	// 	self.videoService.update(self.video).then( result => {
	// 		showMessage($translate.instant('VIDEO_EDIT_MSG_VIDEO_UPDATED'));
	// 		$state.go('videoDetail', {id: self.id});
	// 		// resetForm();
	// 		// self.videoService.reset();
	// 		getVideo();
	// 	}).catch( error => {
	// 		console.log("error in request ", error);
	// 		showMessage($translate.instant('VIDEO_EDIT_MSG_ERROR_UPDATING_VIDEO'));
	// 		resetForm();
	// 	});
	// };

	// init
	// initSelectMaps();
	// getVideo();
	// initGMaps();

	// function showMessage(message) {
	// 	let toastParentElement = angular.element(document.getElementById("toast-container"));
	// 	$mdToast.show(
	// 		$mdToast.simple()
	// 			.textContent(message)
	// 			.parent(toastParentElement)
	// 			.toastClass("mojofy-toast")
	// 			.position("fixed-top right")
	// 	);
	// }

}
