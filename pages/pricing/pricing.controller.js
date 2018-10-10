angular.module('app')
	.controller('PricingController', ['$mdToast', '$scope', '$translate', 'page', '$location', '$anchorScroll',
		'pricing', '$state', PricingController]);

function PricingController($mdToast, $scope, $translate, page, $location, $anchorScroll, pricing, $state) {
	var self = this;
	page.setPageTitle($translate.instant('PRICING_PAGE_WEB_TITLE'));

	let selectedPlan;
	self.plans = pricing.getPlans();
	self.featureTable = pricing.getFeatureTable();
	self.featureTableProducts = [ 'free', 'witness', 'journalist', 'hero', 'superHero' ];

	// selfish Methods
	self.expandPlanInfo = function (plan) {
		console.log("request more info of plan ", plan);
		selectedPlan = plan;
		// TODO(jliarte): 4/10/18 register user event into event tracker
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
		// TODO(jliarte): 4/10/18 track event
		console.log("user product purchase ", productId);
		pricing.setCurrentProduct(productId);
		// TODO(jliarte): 4/10/18 redirect to register page
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
