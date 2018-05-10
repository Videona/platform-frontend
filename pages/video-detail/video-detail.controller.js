angular.module('app')
	.controller('VideoDetailController', ['$stateParams', '$state', 'session', 'video', 'user', '$timeout', VideoDetail]);

function VideoDetail($stateParams, $state, session, video, user, $timeout) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = true;
	self.loadingAuthor = true;
	self.session = session;
	self.state = $state; 
	self.stateParams = $stateParams; 

	self.video = video;
	self.user = user;

	self.showMore = showMore();
	self.mapMarker = []; 

	if(self.video && self.video.data && self.video.data.id !== self.id) {
		self.video.reset();
	}
	
	self.video.get(self.id, function() {
		self.loading = false;
		if (self.video.data != undefined) {
			self.showPublishedIcon = showPublishedIcon();
			self.user.get(self.video.data.owner, function() {
				self.loadingAuthor = false;
			});
			$timeout(function() {
				self.showMore = showMore();
			}, 100);

			if (self.video.data.location) {
				self.mapMarker = [self.video.data.location.lat, self.video.data.location.lng];
				console.warn(self.mapMarker);
			}
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

	function showPublishedIcon() {
		if ((self.session.role == 'editor') || (self.video.data.owner == self.session.id) ) {
			return (self.video.data.published == true || self.video.data.published == 'true');
		} else {
			return false;
		}
	}
}
