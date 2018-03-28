(function () {
	angular.module('app')
		.controller(
			'UserGalleryController',
			['$stateParams', '$translate', 'user', 'page', UserGallery],
		);

	function UserGallery($stateParams, $translate, user, page) {
		var self = this;
		page.title = 'User gallery - ';

		self.userService = user;
		self.userId = $stateParams.userId;
		self.user = {};

		self.videos = {
			tagFilter: [],
		};

		function handleNoUserError() {
			page.title = 'User gallery - ';
			// TODO(jliarte): 404?
		}

		if (self.userId !== undefined && !isNaN(parseInt(self.userId))) {
			self.userService.get(self.userId, function (userDetails) {
				if (userDetails) {
					self.user = userDetails;
					page.title = self.user.username + ' ' + page.title;
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
