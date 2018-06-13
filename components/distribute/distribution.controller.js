angular.module('app')
	.controller('DistributionController', ['$interval', '$mdDialog', '$mdToast', '$translate', 'distribute', '$stateParams', DistributionController]);

function DistributionController($interval, $mdDialog, $mdToast, $translate, distribute, $stateParams) {
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
	self.distributing = 0;
	self.progress = 0;
	self.progressing = {};

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

		self.distributing = clientList.length;
		self.progress = 0;
		self.progressing = {};

		for (var i = 0; i < clientList.length; i++) {

			(function () {
				var client = clientList[i];
				console.log('Fake progress for client:');
				console.log(client);
				fakeProgress(client._id);

				distribute.add($stateParams.id, clientList[i]._id, function (addData) {

					console.log(self.progress);
					console.log('STOP Fake progress for client:');
					console.log(client);
					stopProgress(client._id);

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
			})();
		}
	}

	function fakeProgress(id) {
		var maxProgress = 100 / self.distributing;
		var maxExpectedTime = 90;

		// Init the progress
		self.progressing[id] = { id: id, value: 1 };

		// Prepare update interval
		self.progressing[id].interval = $interval(function () {
			var rand = Math.floor(Math.random() * 10);
			var shallUpdate = (rand % 2 === 0);
			console.log('---------------')
			console.log(self.progressing[id].value)
			console.log(id)
			console.log('---------------')
			if(self.progressing[id].value < maxProgress && shallUpdate) {
				self.progressing[id].value += maxProgress / maxExpectedTime;
				self.progress += self.progressing[id].value;
			}
		}, 1000);

		// Update progress with initial value
		self.progress += self.progressing[id].value;
	}


	function stopProgress(id) {
		console.log('Stop progpagating');
		var maxProgress = 100 / self.distributing;

		// Stop interval
		$interval.cancel(self.progressing[id].interval);
		self.progressing[id].interval = undefined;

		// Update global prorgess with remaining for that request
		var remaining = maxProgress - self.progressing[id].value;
		console.log(remaining);
		console.log(self.progressing[id]);
		self.progress += remaining

		// Update progress value for the request
		self.progressing[id].value = maxProgress;
		console.log(self.progressing[id]);
	}
}