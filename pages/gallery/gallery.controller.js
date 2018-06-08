angular.module('app')
	.controller('GalleryController', ['$scope', '$document', '$translate', 'flavourFeature', 'page', Gallery]);

function Gallery($scope, $document, $translate, flavourFeature, page) {
	var self = this;

	self.search = '';
	self.topbarTransparent = flavourFeature.header;
	self.feature = flavourFeature;
	
	// Setup page title
	page.setPageTitle();

	// Check initial topbar bg
	// scrolling();

	// Add a scroll listener to enable the header+topbar effect
	$document.on('scroll', scrolling)

	// Listen controller destroy to remove scroll listener
	$scope.$on("$destroy", function() {
		$document.off('scroll', scrolling)
	});

	function scrolling() {
		var offset = 56;
		var header = document.getElementsByClassName('header-box')[0];
		if(!header) {
			self.topbarTransparent = false;
		} else {
			self.topbarTransparent = window.scrollY < (header.scrollHeight - offset);
		}
	}
}
