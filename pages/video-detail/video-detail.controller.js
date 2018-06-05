angular.module('app')
	.controller('VideoDetailController', ['$timeout', '$stateParams', '$state', 'session', 'video', 'user', '$timeout', 'NgMap', VideoDetail]);

function VideoDetail($timeout, $stateParams, $state, session, video, user, $timeout, NgMap) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = true;
	self.loadingAuthor = true;
	self.downloading = false;
	self.session = session;
	self.state = $state; 
	self.stateParams = $stateParams;
	self.loadDistributionList = true;

	self.video = video;
	self.user = user;

	self.videoDownload = videoDownload;
	self.showMore = showMore();
	self.mapMarker = [];

	self.refreshDistributionList = function () {
		self.loadDistributionList = false;
		$timeout(function () { 
			self.loadDistributionList = true;
		}, 0);
	}

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
				NgMap.getMap().then(function (map) {
					map.setZoom(6);
				});
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
		} 
		return false;
	}
	
	function videoDownload(params) {
		self.downloading = true;
		$state.go('videoDownload', params);
		$timeout(function () {
			self.downloading = false;
		}, 1000);
	}
}
