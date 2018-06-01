angular.module('app')
	.controller('DistributionController', ['distribute', '$stateParams', DistributionController]);

function DistributionController(distribute, $stateParams) {
	var self = this;

	self.send = send;

	distribute.get($stateParams.id, function (data) {
		console.log(data);
	});

	function send(clientList) {
		for (var i = 0; i < clientList.length; i++) {
			distribute.add($stateParams.id, clientList[i]._id, function (addData) {
				console.log(addData);
			});
		}
	}
}