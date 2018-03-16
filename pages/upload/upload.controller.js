angular.module('app')
	.controller('UploadController', ['api', 'session', '$state', UploadController]);

function UploadController(api, session, $state, $translate) {
	var self = this;

	// On Run...
	if (session.id <= 0) {
		console.log('Session not found! Redirecting...');
		$state.go('home');
	}

	self.file;
	self.data
	self.loading = false;
	self.productTypes = [
		{
			id: 'fakeLive',
			name: 'Fake live'
		},
		{
			id: 'raw',
			name: 'Raw videos'
		},
		{
			id: 'spoolers',
			name: 'Spoolers'
		},
		{
			id: 'total',
			name: 'Total'
		},
		{
			id: 'graphic',
			name: 'Graphic'
		},
		{
			id: 'pieces',
			name: 'Pieces'
		}
	];

	self.send = send;

	function send() {
		console.log('sending...');

		var data = {};

		if (!self.loading && self.data && self.file) {
			data.title = self.data.title || undefined;
			data.description = self.data.description || undefined;
			data.tag = [];
			
			if (self.data.productType) {
				for (var type in self.data.productType) {
					if(self.data.productType[type]) {
						data.tag.push(type);
					}
				}
			}

			data.tag = data.tag.toString();

			self.loading = true;
			api.upload(api.url + '/video', self.file, data, function() {
				self.loading = false;
				$state.go('gallery');
			});
		} else {
			self.error = 'No video selected or data is not set';
		}
	}
}