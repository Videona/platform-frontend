angular.module('app')
	.controller('VideoDetailEditController', ['$stateParams', '$mdConstant', 'session', 'video', 'gmapsApiKey',
		'$sce', '$state', VideoDetailEditController]);

function VideoDetailEditController($stateParams, $mdConstant, session, video, gmapsApiKey, $sce, $state) {
	var self = this;

	self.session = session;
	self.videoService = video;
	// TODO(jliarte): should move to main controller?
	self.gmapsApiKey = $sce.trustAsResourceUrl('https://maps.googleapis.com/maps/api/js?key=' + gmapsApiKey);
	self.id = $stateParams.id;
	self.loading = true;
	self.actionsDisabled = true;
	self.tagsKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

	// selfish Methods
	self.resetVideoPoster = function () {
		self.newPoster = undefined;
	};

	self.resetVideoFile = function () {
		self.newFile = undefined;
	};

	self.update = function () {
		self.actionsDisabled = true;
		self.video.tag = self.tags.join(",");
		self.video.productType = self.productType.join(",");
		console.log("video to update is ", self.video);
		video.id = self.id;
		video.update(self.video).then( result => {
			self.actionsDisabled = false;
		});
	};

	self.delete = function () {
		console.log("calling delete video action");
	};

	// init
	initSelectMaps();
	getVideo();

	// Private selfish methods
	function checkEditAccess(video) {
		if (video !== undefined && video.owner == self.session.id) {
			// TODO(jliarte): check admin role
			// self.editorRole = true;
			console.log("User is allowed to edit this video");
		} else {
			// TODO(jliarte): should show an error instead of redirecting?
			$state.go("videoPreview", {id: self.id});
		}
	}

	function initSelectMaps() {
		video.getVideoLangs().then(langs => self.langs = langs );
		video.getProductTypes().then(productTypes => self.productTypes = productTypes );
		// TODO(jliarte): get them from backend
		self.categories = ['Economía', 'Nacional', 'Internacional'].map(function (category) {
			return {name: category};
		});
	}

	function getVideo() {
		if (self.videoService && self.videoService.data && self.videoService.data.id !== self.id) {
			self.videoService.reset();
		}

		self.videoService.get(self.id, function () {
			self.video = self.videoService.data;
			checkEditAccess(self.video);

			self.video.quality = self.video.quality || 0;
			self.video.credibility = self.video.credibility || 0;
			// TODO(jliarte): initialize prices also?
			self.tags = self.video.tag.trim().split(',').filter(item => item);
			self.productType = self.video.productType.trim().split(',').filter(item => item);
			// TODO(jliarte): self.categories =

			self.loading = false;
			self.actionsDisabled = false;
		});
	}

}
