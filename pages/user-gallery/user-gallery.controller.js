(function () {
	angular.module('app')
		.controller(
			'UserGalleryController',
			['$stateParams', '$translate', 'user', 'page', UserGallery],
		);

	function UserGallery($stateParams, $translate, userService, page) {
		var self = this;
		self.userService = userService;
		self.userId = $stateParams.userId;

		self.videos = {
			videoWidth: 0,
			videoHeight: 0,
			videosPerRow: 0,
			tagFilter: [],
		};

		setupVideoListDirective();

		self.userService.getUser(self.userId)
			.then((userDetails) => {
				self.user = userDetails;
				page.title = self.user.username + ' User gallery - ';
				$translate('USER_GALLERY_USER_VIDEOS', { username: self.user.username })
					.then(title => self.userGalleryTitle = title);
			})
			.catch((status, data) => {
				page.title = 'User gallery - ';
				// TODO(jliarte): 404?
				console.log('Error ' + status + ' while getting user details');
				console.log('data is ', data);
			});

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
