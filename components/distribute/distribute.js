angular.module('app').directive('distribute', ['$mdDialog', distributeDirective]);

function distributeDirective($mdDialog) {
	return {
		restrict: 'E',
		templateUrl: 'components/distribute/distribute.view.html',
		scope: {
			onDistribute: '='
		},
		link: {
			pre: function (scope) {
				scope.showAdvanced = function(ev) {
					$mdDialog.show({
						templateUrl: 'components/distribute/distribute-modal.html',
						clickOutsideToClose: true,
						fullscreen: false // Only for -xs, -sm breakpoints.
					})
					.then(function(answer) {
					// 	console.log('You distributed the video!');
						typeof scope.onDistribute === 'function' && scope.onDistribute(true);
					}, function() {
					// 	console.log('You cancelled the dialog.');
						typeof scope.onDistribute === 'function' && scope.onDistribute(false);
					});
				};
			}
		}
	};
}
