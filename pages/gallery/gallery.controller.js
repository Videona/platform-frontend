angular.module('app')
	.controller('GalleryController', ['$translate', 'galleryServiceFactory', Gallery]);

function Gallery($translate, galleryServiceFactory) {
	var self = this;

	self.featured = {
		get: getFeaturedVideos,
		videoWidth: 0,
		videoHeight: 0,
		videosPerRow: 0,
		isLoading: false,
	};

	self.notFeatured = {
		get: getNotFeaturedVideos,
		videoWidth: 0,
		videoHeight: 0,
		videosPerRow: 0,
		isLoading: false,
	};

	self.featuredGallery = galleryServiceFactory.getInstance(['featured']);
	self.nonFeaturedGallery = galleryServiceFactory.getInstance(['-featured']);

	self.search = '';

	setupVideoCardSizes();

	function getFeaturedVideos() {
		if (!self.featured.isLoading) {
			self.featured.isLoading = true;
			self.featuredGallery.getVideoList(function (success) {
				if (success) {
					self.featured.isLoading = false;
				}
			});
		}
	}

	function getNotFeaturedVideos() {
		if (!self.notFeatured.isLoading) {
			self.notFeatured.isLoading = true;
			self.nonFeaturedGallery.getVideoList(function (success) {
				if (success) {
					self.notFeatured.isLoading = false;
				}
			});
		}
	}

	function setupVideoCardSizes() {
		self.featured.videosPerRow = 0;
		self.notFeatured.videosPerRow = 0;

		if (window.innerWidth > 1920) {
			self.featured.videosPerRow = 5;
			self.notFeatured.videosPerRow = 7;
		} else if (window.innerWidth > 1024) {
			self.featured.videosPerRow = 4;
			self.notFeatured.videosPerRow = 6;
		} else if (window.innerWidth > 720) {
			self.featured.videosPerRow = 3.2;
			self.notFeatured.videosPerRow = 5;
		} else {
			self.featured.videosPerRow = 2.2;
			self.notFeatured.videosPerRow = 3;
		}

		self.featured.videoWidth = (window.innerWidth - parseInt(self.featured.videosPerRow) * 13) / self.featured.videosPerRow;
		self.featured.videoHeight = (self.featured.wivideoWidthdth * 9) / 16;

		self.notFeatured.videoWidth = (window.innerWidth - parseInt(self.notFeatured.videosPerRow - 1) * 13 - 26) / self.notFeatured.videosPerRow;
		self.notFeatured.videoHeight = (self.notFeatured.videoWidth * 9) / 16;

		self.featured.get();
	}
}
