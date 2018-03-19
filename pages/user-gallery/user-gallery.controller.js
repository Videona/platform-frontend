(function () {
	angular.module('app')
		.controller('UserGalleryController',
			['$stateParams', '$translate', 'galleryServiceFactory', 'user', 'Page', UserGallery]);

	function UserGallery($stateParams, $translate, galleryServiceFactory, userService, Page) {
		Page.setTitle("User gallery - ");

		var self = this;

		self.videos = {
			get: getVideos,
			videoWidth: 0,
			videoHeight: 0,
			videosPerRow: 0,
			isLoading: false,
		};

		self.userService = userService;
		self.userId = $stateParams.userId;
		self.userService.getUser(self.userId)
			.then(userDetails => {
				self.user = userDetails;
				$translate('USER_GALLERY_USER_VIDEOS', {username: self.user.username})
					.then(title => self.userGalleryTitle = title);
				self.gallery = galleryServiceFactory.getInstance([], self.userId);
				Page.setTitle(self.user.username + " User gallery - ");

				setupVideoListDirective();
			})
			.catch((status, data) => {
				// TODO(jliarte): 404?
				console.log("Error " + status + " while getting user details");
				console.log("data is ", data);
			});

		function getVideos() {
			if (!self.videos.isLoading) {
				self.videos.isLoading = true;
				self.gallery.getVideoList(function (success) {
					if (success) {
						self.videos.isLoading = false;
					}
				});
			}
		}

		function setupVideoListDirective() {
			self.videos.videosPerRow = 0;

			if (window.innerWidth > 1920) {
				self.videos.videosPerRow = 7;
			} else if (window.innerWidth > 1024) {
				self.videos.videosPerRow = 6;
			} else if (window.innerWidth > 720) {
				self.videos.videosPerRow = 5;
			} else {
				self.videos.videosPerRow = 3;
			}

			self.videos.videoWidth = (window.innerWidth - parseInt(self.videos.videosPerRow - 1) * 13 - 26) / self.videos.videosPerRow;
			self.videos.videoHeight = (self.videos.videoWidth * 9) / 16;
		}
	}
}());
