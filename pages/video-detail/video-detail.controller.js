angular.module('app')
	.controller('VideoDetailController', ['$stateParams', 'video', 'user', VideoDetail]);

function VideoDetail($stateParams, video, user) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = true;
	self.loadingAuthor = true;

	self.video = video;
	self.user = user;

	if(self.video && self.video.data && self.video.data.id !== self.id) {
		self.video.reset();
	}
	
	// ToDo: Check invalid video :S
	self.video.get(self.id, function() {
		self.loading = false;
		self.user.get(self.video.data.owner, function() {
			self.loadingAuthor = false;
		});
	});
}
