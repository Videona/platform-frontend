angular.module('app').directive('distributionList', ['distribute', '$stateParams', distributeDirective]);

function distributeDirective(distribute, $stateParams) {
	return {
		restrict: 'E',
		templateUrl: 'components/distribution-list/distribution-list.view.html',
		scope: {
			id: '='
		},
		link: {
			pre: function (scope) {
				var id = scope.id || $stateParams.id || null;

				scope.list = [];
				
				distribute.get(id, function (data) {
					scope.list = data
				})
			}
		}
	};
}
