angular.module('app')
	.controller('GalleryController', ['$scope', '$document', '$translate', 'flavourFeature', Gallery]);

function Gallery($scope, $document, $translate, flavourFeature) {
	var self = this;

	self.search = '';
	self.topbarTransparent = false;
	self.feature = flavourFeature;

	// Check initial topbar bg
	scrolling();

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
