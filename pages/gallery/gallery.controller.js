angular.module('app')
	.controller('GalleryController', ['$scope', '$document', '$translate', Gallery]);

function Gallery($scope, $document, $translate) {
	var self = this;

	self.search = '';
	self.topbarTransparent = true;

	// Add a scroll listener to enable the header+topbar effect
	$document.on('scroll', scrolling)

	// Listen controller destroy to remove scroll listener
	$scope.$on("$destroy", function() {
		$document.off('scroll', scrolling)
	});

	function scrolling(e) {
		var offset = 56;
		var header = document.getElementsByClassName('header-box')[0];
		self.topbarTransparent = window.scrollY < (header.scrollHeight - offset);
	}
}
