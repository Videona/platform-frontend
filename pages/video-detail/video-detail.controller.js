angular.module('app')
	.controller('VideoDetailController', ['$timeout', '$stateParams', '$state', 'session', 'video', 'videoDownload',
		'user', '$timeout', 'NgMap', 'page', '$mdDialog', 'api', '$mdToast', '$translate', VideoDetail]);

function VideoDetail($timeout, $stateParams, $state, session, video, videoDownload, user, $timeout, NgMap, page,
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

	self.video = video;
	self.user = user;

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
		return session.id == video.data.owner || session.role == 'editor';
	};

	self.canDelete = function () {
		return session.id == video.data.owner || session.role == 'editor';
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

	let deletionConfirm = $mdDialog.confirm()
		.title('Would you like to delete this video?')
		.textContent('This action is permanent. Your video and all associated data will be deleted forever!')
		.ariaLabel('delete video confirm')
		// .targetEvent(ev)
		.ok('Delete!')
		.cancel('Cancel');

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
			performVideoDelete();
		}, function() {
			console.log("rejects deletion");
		});
	};

	if (self.video && self.video.data && self.video.data.id !== self.id) {
		self.video.reset();
	}
	
	self.video.get(self.id, function() {
		self.loading = false;
		if (self.video.data != undefined) {
			page.setPageTitle(self.video.data.title);
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
