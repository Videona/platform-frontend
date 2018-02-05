angular.module('app')
	.controller('GalleryController', ['$stateParams', 'gallery', Gallery]);

function Gallery($stateParams, gallery) {
	var self = this;

	self.gallery = gallery;
}
