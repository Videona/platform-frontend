angular.module('app')
	.controller('GalleryController', ['$translate', Gallery]);

function Gallery($translate) {
	var self = this;

	self.search = '';
}
