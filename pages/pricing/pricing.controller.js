angular.module('app')
	.controller('PricingController', ['$mdToast', '$scope', '$translate', 'page', '$location', '$anchorScroll',
		'pricing', '$state', '$analytics', 'session', '$mdMedia', PricingController]);

function PricingController($mdToast, $scope, $translate, page, $location, $anchorScroll, pricing, $state, $analytics,
                           session, $mdMedia) {
	var self = this;
	$scope.$watch(function() { return $mdMedia('gt-sm'); }, function(big) {
		$scope.smallScreen = !big;
		console.log("small screen is ", !big);
		if (big) {
			self.showTableProduct();
		} else {
			self.showTableProduct('free');
		}
	});

	page.setPageTitle($translate.instant('PRICING_PAGE_WEB_TITLE'));

	let selectedProduct;
	self.plans = pricing.getPlans();
	self.featureTable = pricing.getFeatureTable();
	self.featureTableProducts = [ 'free', 'witness', 'journalist', 'hero', 'superHero' ];

	self.showTableHeader = true;
	self.showTableColumn = {
		free: true,
		witness: true,
		journalist: true,
		hero: true,
		superHero: true
	};

	function hideAllProductsInTable() {
		for (let idx in self.showTableColumn) {
			self.showTableColumn[idx] = false;
		}
	}

	function showFullProductTable() {
		for (let idx in self.showTableColumn) {
			self.showTableColumn[idx] = true;
		}
		self.showTableHeader = true;
	}

// selfish Methods
	self.showTableProduct = function (productId) {
		if (productId) {
			selectedProduct = productId;
			hideAllProductsInTable();
			self.showTableHeader = false;
			self.showTableColumn[productId] = true;
		} else {
			selectedProduct = undefined;
			showFullProductTable();
		}
	};

	self.getClassForProductButton = function (productId) {
		if (productId == selectedProduct) {
			return 'product-selected';
		}
	};

	self.expandPlanInfo = function (productId) {
		console.log("request more info of productId ", productId);
		selectedProduct = productId;
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

}
