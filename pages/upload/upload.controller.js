angular.module('app')
	.controller('UploadController', ['api', 'session', '$state', '$translate', UploadController]);

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
			name: $translate.instant('PRODUCT_TYPE_FAKELIVE')
		},
		{
			id: 'raw',
			name: $translate.instant('PRODUCT_TYPE_RAW')
		},
		{
			id: 'spoolers',
			name: $translate.instant('PRODUCT_TYPE_SPOOLERS')
		},
		{
			id: 'total',
			name: $translate.instant('PRODUCT_TYPE_TOTAL')
		},
		{
			id: 'graphic',
			name: $translate.instant('PRODUCT_TYPE_GRAPHIC')
		},
		{
			id: 'pieces',
			name: $translate.instant('PRODUCT_TYPE_PIECES')
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