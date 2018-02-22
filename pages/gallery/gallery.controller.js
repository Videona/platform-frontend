angular.module('app')
	.controller('GalleryController', ['$stateParams', '$translate', 'gallery', Gallery]);

function Gallery($stateParams, $translate, gallery) {
	var self = this;

	self.gallery = gallery;
	
	self.search = '';
	
	self.notFeaturedVideosQuantity = 0;
	self.featuredWidth = 0;
	self.notFeaturedWidth = 0;

	setupFeaturedCard();
	
	self.featured = [];
	self.notFeatured = [];

	getFeaturedVideos();
	getNotFeaturedVideos();
	
	function getFeaturedVideos() {
		self.gallery.getFeaturedVideoList(function (data) {
			self.featured.push(data);
		});
	}
	
	function getNotFeaturedVideos() {
		self.gallery.getNotFeaturedVideoList(function (data) {
			self.notFeatured.push(data);
		});
	}
	
	function setupFeaturedCard() {
		var featuredVideoQuantity = 0;
		var notFeaturedVideoQuantity = 0;
		
		if (window.innerWidth > 1920) {
			featuredVideoQuantity = 5;
			notFeaturedVideoQuantity = 7;
		} else if (window.innerWidth > 1024) {
			featuredVideoQuantity = 4;
			notFeaturedVideoQuantity = 6;
		} else if (window.innerWidth > 720) {
			featuredVideoQuantity = 3.2;
			notFeaturedVideoQuantity = 5;
		} else {
			featuredVideoQuantity = 2.2;
			notFeaturedVideoQuantity = 3;
		}
		
		self.featuredWidth = (window.innerWidth - parseInt(featuredVideoQuantity) * 13) / featuredVideoQuantity;
		
		self.notFeaturedVideosQuantity = notFeaturedVideoQuantity;
		self.notFeaturedWidth = (window.innerWidth - parseInt(notFeaturedVideoQuantity - 1) * 13 - 26) / notFeaturedVideoQuantity;
	}
}
