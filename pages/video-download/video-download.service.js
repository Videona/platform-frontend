angular.module('app')
	.service('videoDownload', ['api', videoDownloadService]);

function videoDownloadService(api) {
	var video = {
		get: get
	};

	return video;


	function get(videoId, code) {
	
		api.get(api.url + '/video/' + videoId + '/original?code=' + code, function (data, status, getHeaders) {
			
			console.log(' --- >>> status:');
			console.log(status);

			if(status < 400 ) {
				var headers = getHeaders();
				var filename = headers['x-filename'];
				var contentType = headers['content-type'];

				console.log(filename);
				console.log(contentType);
		 
				var linkElement = document.createElement('a');
				try {

					console.log(data);

					var blob = new Blob([data], { type: contentType });
					var url = window.URL.createObjectURL(blob);
		
					console.log(blob.size);
					console.log(url);

					// linkElement.setAttribute('href', url);
					// linkElement.setAttribute('download', filename);

					// var clickEvent = new MouseEvent('click', {
					// 	'view': window,
					// 	'bubbles': true,
					// 	'cancelable': false
					// });
					// linkElement.dispatchEvent(clickEvent);
				} catch (ex) {
					console.log(ex);
				}
			}
		});
	}
}
