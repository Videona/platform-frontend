angular.module('app')
	.controller('UploadController', ['api', UploadController]);

function UploadController(api) {
	var self = this;

	self.file;
	self.data
	self.productTypes = [
		{
			id: 'fakeLive',
			name: 'Fake live'
		},
		{
			id: 'test',
			name: 'Test type'
		},
		{
			id: 'steak',
			name: 'crudo'
		},
		{
			id: 'hello',
			name: 'Hello world'
		},
		{
			id: 'anotherType',
			name: 'Another type'
		}
	];

	self.send = send;

	function send() {
		console.log('sending...');

		var data = {};

		if (true) { //	(self.data && self.file) {
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

			api.upload(api.url + '/video', self.file, data, function() {
				console.log('done!!');
			});
		} else {
			self.error = 'No video selected or data is not set';
		}
	}
}