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
		self.user = {};

		self.videos = {
			tagFilter: [],
		};

		self.userService.getUser(self.userId)
			.then(userDetails => {
				console.log(userDetails);
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
	}
}());
