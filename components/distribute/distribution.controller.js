angular.module('app')
	.controller('DistributionController', ['$mdDialog', '$mdToast', '$translate', 'distribute', '$stateParams', DistributionController]);

function DistributionController($mdDialog, $mdToast, $translate, distribute, $stateParams) {
	var self = this;

	self.send = send;
	self.hide = function() {
		$mdDialog.hide();
	};
	self.status = {
		isAddingClient: false,
		isFormOpen: false
	};
	self.hideAddClient = function () {
		self.status.isAddingClient = false;
	}

	distribute.get($stateParams.id, function (data) {
		console.log(data);
	});

	function send(clientList) {
		var results = 0;
		self.loading = true;

		if (clientList.length === 0) {
			self.loading = false;
			self.hide();
			return false;
		}

		for (var i = 0; i < clientList.length; i++) {
			console.log($stateParams.id, clientList[i]._id)
			distribute.add($stateParams.id, clientList[i]._id, function (addData) {
				console.log(addData);
				if(++results === clientList.length) {
					self.loading = false;
					self.hide();
					var message = $translate.instant('DISTRIBUTE_DONE');
					$mdToast.show(
						$mdToast.simple()
							.textContent(message)
							.toastClass("mojofy-toast")
							.position("fixed-top right")
					);
				}
			});
		}
	}
}