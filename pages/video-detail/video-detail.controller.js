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
	
	// ToDo: Check invalid video :S
	self.video.get(self.id, function() {
		self.loading = false;
		self.user.get(self.video.data.owner, function() {
			self.loadingAuthor = false;
		});
		$timeout(function() {
			self.showMore = showMore();
		}, 100);
	});

	function showMore() {
		var el = document.getElementById('video-description');

		if (el && el.scrollHeight > el.clientHeight) { 
			console.log('is bigger than shown');
			return true;
		} else {
			console.log('full shown');
			return false;
		}
	}
}
