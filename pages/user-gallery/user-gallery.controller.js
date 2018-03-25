(function () {
	angular.module('app')
		.controller(
			'UserGalleryController',
			['$stateParams', '$translate', 'user', 'page', UserGallery],
		);

	function UserGallery($stateParams, $translate, userService, page) {
		var self = this;
		page.title = 'User gallery - ';

		self.userService = userService;
		self.userId = $stateParams.userId;
		self.userService = userService;
		self.user = {};

		self.videos = {
			tagFilter: [],
		};

		// self.userService.getUser(self.userId)
		// 	.then(userDetails => {
		// 		self.user = userDetails;
		// 		if (typeof self.user !== 'undefined') {
		// 			page.title = self.user.username + ' ' + page.title;
		// 			$translate('USER_GALLERY_USER_VIDEOS', { username: self.user.username })
		// 				.then(title => self.userGalleryTitle = title);
		// 		}
		// 	})
		// 	.catch((status, data) => {
		// 		page.title = 'User gallery - ';
		// 		// TODO(jliarte): 404?
		// 		console.log('Error ' + status + ' while getting user details');
		// 		console.log('data is ', data);
		// 	})
		// ;
		page.title = 'User gallery - ';

		self.userService.get(self.userId, function () {
			// TODO(jliarte): how to check if user exists??
			self.user = self.userService.data;
			if (typeof self.user !== 'undefined') {
				page.title = self.user.username + ' ' + page.title;
				$translate('USER_GALLERY_USER_VIDEOS', { username: self.user.username })
					.then(title => self.userGalleryTitle = title);
			}
		})
	}
}());
