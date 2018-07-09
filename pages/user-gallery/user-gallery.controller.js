(function () {
	angular.module('app')
		.controller(
			'UserGalleryController',
			['$stateParams', '$translate', 'user', 'page', UserGallery],
		);

	function UserGallery($stateParams, $translate, user, page) {
		var self = this;

		self.userService = user;
		self.userId = $stateParams.userId;
		self.user = {};

		self.videos = {
			tagFilter: [],
		};

		function handleNoUserError() {
			// TODO(jliarte): 404?
		}

		if (self.userId !== undefined && !isNaN(parseInt(self.userId))) {
			self.userService.get(self.userId, function (userDetails) {
				if (userDetails) {
					self.user = userDetails;
					page.setPageTitle(self.user.username)
					self.userGalleryTitle = $translate.instant('USER_GALLERY_USER_VIDEOS', { username: self.user.username })
				} else {
					handleNoUserError();
				}
			});
		} else {
			handleNoUserError();
		}
	}
}());
