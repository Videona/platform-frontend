angular.module('app')
	.controller('VideoDetailController', ['$stateParams', 'session', 'video', 'user', '$timeout', VideoDetail]);

function VideoDetail($stateParams, session, video, user, $timeout) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = true;
	self.loadingAuthor = true;
	self.session = session; 

	self.video = video;
	self.user = user;

	self.showMore = showMore();

	if(self.video && self.video.data && self.video.data.id !== self.id) {
		self.video.reset();
	}
	
	self.video.get(self.id, function() {
		self.loading = false;
		if (self.video.data != undefined) {
			self.user.get(self.video.data.owner, function() {
				self.loadingAuthor = false;
			});
			$timeout(function() {
				self.showMore = showMore();
			}, 100);
		}
	});

	/**
	 * Detects if description field needs the "show more +" functionality
	 * and set the variables to make it possible
	 */
	function showMore() {
		var el = document.getElementById('video-description');

		if (el && el.scrollHeight > el.clientHeight) { 
			return true;
		} else {
			return false;
		}
	}
}
