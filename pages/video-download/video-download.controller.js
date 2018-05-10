angular.module('app')
	.controller('VideoDownloadController', ['$stateParams', 'video', 'videoDownload', '$translate', 'session', VideoDownload]);

function VideoDownload($stateParams, video, videoDownload, $translate, session) {
	var self = this;

	self.id = $stateParams.id;
	self.code = '';
	self.loading = false;
	self.error = null;
	self.session = session;
	self.amIOwner = amIOwner;
	self.$stateParams = $stateParams;

	self.video = video;

	self.download = download;
	self.focus = focus;

	if ($stateParams.autoDownload === 'true') {
		download();
	}

	setTimeout(focus, 500);


	function download() {
		self.error = null;
		self.loading = true;
		videoDownload.get(self.id, self.code, function (status) {
			self.loading = false;
			if (status === 403 && !amIOwner()) {
				self.error = $translate.instant('ERROR_WRONG_DOWNLOAD_CODE');
			} else if(status !== 200) {
				self.error = $translate.instant('ERROR_UNABLE_TO_DOWNLOAD');
			}
		});
	}

	function focus() {
		// Scroll to .download-video-code
		window.scrollTo(0, document.getElementsByClassName('download-page')[0].offsetTop);

		// Focus on input
		document.getElementById('download-code-input').focus();
	}

	function amIOwner() {
		return (self.session.id === self.video.data.owner);
	}
}
