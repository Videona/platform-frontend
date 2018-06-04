angular.module('app')
	.controller('DistributionController', ['$mdDialog', 'distribute', '$stateParams', DistributionController]);

function DistributionController($mdDialog, distribute, $stateParams) {
	var self = this;

	self.send = send;
	self.hide = function() {
		$mdDialog.hide();
	};
	self.status = {
		isFormOpen: false
	};
	self.hideAddClient = function () {
		self.status.isFormOpen = false;
	}

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