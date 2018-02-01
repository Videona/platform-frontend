angular.module('app')
	.controller('VideoDownloadController', ['$stateParams', 'video', 'videoDownload', VideoDownload]);

function VideoDownload($stateParams, video, videoDownload) {
	var self = this;

	// 
	self.id = $stateParams.id;
	self.code = '';
	
	//
	self.video = video;

	//
	self.download = download;

	self.video.get(self.id);


	function download(document) {
		videoDownload.get(self.id, self.code);

/*		// DocumentResource.download(document).$promise
		videoDownload.get(document).$promise
		// videoDownload.get(self.id, self.code).$promise
			.then(function(result) {
				var url = URL.createObjectURL(new Blob([result.data]));
				var a = document.createElement('a');
				a.href = url;
				a.download = result.filename;
				a.target = '_blank';
				a.click();
			})
			.catch(resourceError)
			.catch(function(error) {
				console.log(error.data); // in JSON
			});*/

	}
}
