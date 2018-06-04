angular.module('app').directive('distribute', ['$mdDialog', distributeDirective]);

function distributeDirective($mdDialog) {
	return {
		restrict: 'E',
		templateUrl: 'components/distribute/distribute.view.html',
		link: {
			pre: function (scope) {
				scope.showAdvanced = function(ev) {
					$mdDialog.show({
						templateUrl: 'components/distribute/distribute-modal.html',
						clickOutsideToClose: true,
						fullscreen: false // Only for -xs, -sm breakpoints.
					})
					.then(function(answer) {
						console.log('You distributed the video!');
					}, function() {
						console.log('You cancelled the dialog.');
					});
				};
			}
		}
	};
}
