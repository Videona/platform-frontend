angular.module('app')
	.controller('VideoDetailController', ['$stateParams', 'video', VideoDetail]);

function VideoDetail($stateParams, video) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = true;

	self.video = video;

	if(self.video && self.video.data && self.video.data.id !== self.id) {
		self.video.reset();
	}
	
	// ToDo: Check invalid video :S
	self.video.get(self.id, function() {
		self.loading = false;
	});
}
