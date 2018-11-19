angular.module('app')
	.controller('VideoDetailController', ['$timeout', '$stateParams', '$state', 'session', 'video', 'videoDownload',
		'userService', '$timeout', 'NgMap', 'page', '$mdDialog', 'api', '$mdToast', '$translate', VideoDetail]);

function VideoDetail($timeout, $stateParams, $state, session, videoService, videoDownload, userService, $timeout, NgMap, page,
                     $mdDialog, api, $mdToast, $translate) {
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

	self.videoDownloadService = videoDownload;
	self.videoDownload = goVideoDownload;
	self.showMore = showMore();
	self.mapMarker = [];

	self.refreshDistributionList = function () {
		self.loadDistributionList = false;
		$timeout(function () { 
			self.loadDistributionList = true;
		}, 0);
	};

	self.canEdit = function () {
		return session.id == self.video.owner || session.role == 'editor';
	};

	self.canDelete = function () {
		return session.id == self.video.owner || session.role == 'editor';
	};

	function showMessage(message) {
		let toastParentElement = angular.element(document.getElementById("toast-container"));
		$mdToast.show(
			$mdToast.simple()
				.textContent(message)
				.parent(toastParentElement)
				.toastClass("mojofy-toast")
				.position("fixed-top right")
		);
	}

	let deletionConfirm = $mdDialog.confirm(event)
		.title($translate.instant('VIDEO_DELETE_CONFIRM_TITLE'))
		.textContent($translate.instant('VIDEO_DELETE_CONFIRM_TEXT'))
		.ariaLabel('delete video confirm')
		.targetEvent(event)
		.ok($translate.instant('VIDEO_DELETE_CONFIRM_BUTTON_OK'))
		.cancel($translate.instant('VIDEO_DELETE_CONFIRM_BUTTON_CANCEL'));

	function performVideoDelete() {
		let data = {};
		api.del(api.url + '/video/' + video.data._id, data, function (data, status) {
			if (status == 200) {
				showMessage($translate.instant('VIDEO_DELETE_SUCCESS'));
				setTimeout(function() {
					$state.go('gallery');
				}, 500);
			} else {
				console.log("res deleting video ", data);
				console.log("status ", status);
				showMessage($translate.instant('VIDEO_DELETE_FAILURE' + ' ' + data.error));
			}
		});
	}

	self.delete = function ($event) {
		console.log("calling delete video action");

		$mdDialog.show(deletionConfirm).then(function() {
			console.log("confirms deletion");
			performVideoDelete($event);
		}, function() {
			console.log("rejects deletion");
		});
	};

	if (self.video && self.video.id !== self.id) {
		videoService.reset(); // TODO(jliarte): 12/11/18 refactor this!!! remove cached video instance
	}
	
	videoService.get(self.id, function() {
		self.loading = false;
		self.video = videoService.data; // TODO(jliarte): 12/11/18 refactor this to return video data in get result
		if (self.video != undefined) {
			page.setPageTitle(self.video.title);
			self.showPublishedIcon = showPublishedIcon();
			userService.get(self.video.owner, function(data) {
				self.video.user = data;
				self.loadingAuthor = false;
			});
			$timeout(function() {
				self.showMore = showMore();
			}, 100);

			if (self.video.location) {
				self.mapMarker = [self.video.location.lat, self.video.location.lng];
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
		if ((self.session.role == 'editor') || (self.video.owner == self.session.id) ) {
			return (self.video.published == true || self.video.published == 'true');
		} 
		return false;
	}
	
	function goVideoDownload(params) {
		self.downloading = true;
		$state.go('videoDownload', params);
		isLoading()
	}

	function isLoading() {
		$timeout(function () {
			if(self.videoDownloadService.loading === false) {
				self.downloading = false;
			} else {
				isLoading();
			}
		}, 1000);
	}
}
