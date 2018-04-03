angular.module('app')
	.controller('VideoDetailEditController', ['$stateParams', '$mdConstant', 'session', 'video', 'user', 'gmapsApiKey',
		'$sce', VideoDetailEditController]);

function VideoDetailEditController($stateParams, $mdConstant, session, video, user, gmapsApiKey, $sce) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = true;
	self.loadingAuthor = true;
	self.session = session;
	self.tagsKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
	self.categories = ['Economía', 'Nacional', 'Internacional'].map(function(category) {
		return {name: category};
	});
	self.gmapsApiKey = $sce.trustAsResourceUrl('https://maps.googleapis.com/maps/api/js?key=' + gmapsApiKey);

	self.resetVideoPoster = function () {
		console.log("resetting video poster");
		self.newPoster = undefined;
	};

	self.resetVideoFile = function () {
		console.log("resetting video file");
		self.newFile = undefined;
	};

	self.update = function () {
		console.log("calling update video action");
		self.video.tag = self.tags.join(",");
		console.log("video is ", self.video);
	};

	self.cancel = function () {
		console.log("calling cancel action");
	};

	self.delete = function () {
		console.log("calling delete video action");
	};

	self.videoService = video;
	video.getVideoLangs().then(langs => {
		console.log("setting langs var to ", langs);
		self.langs = langs;
	});
	self.user = user;

	if (self.videoService && self.videoService.data && self.videoService.data.id !== self.id) {
		self.videoService.reset();
	}
	
	// ToDo: Check invalid video :S
	// TODO(jliarte): check if we're allowed to edit this video
	self.videoService.get(self.id, function() {
		self.video = self.videoService.data;

		self.video.quality = self.video.quality || 0;
		self.video.credibility = self.video.credibility || 0;
		self.tags = self.video.tag.trim().split(',').filter(item => item);

		console.log("video is ", self.video);
		self.loading = false;
		self.user.get(self.videoService.data.owner, function() {
			self.loadingAuthor = false;
		});
	});
}
