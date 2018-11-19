angular.module('app')
	.directive('topbar', ['search', 'session', 'decisionsService', Topbar]);

function Topbar(search, session, decisions) {
	return {
		templateUrl: 'components/topbar/topbar.view.html',
		scope: {
			transparent: '='
		},
		link: {
			pre: function (scope) {

				if (typeof scope.transparent === 'undefined') {
					scope.transparent = false;
				}

				// scope.$on('decisions:updated', function(event, data) {
				// 	console.log("decisions updated!");
				// 	console.log("data is ", data);
				// 	console.log("decisions are ", decisions);
				// });

				scope.search = search;
				scope.decisions = decisions;
				scope.session = session;
				scope.focus = function () {
					setTimeout(function () {
						document.getElementById('searchField').focus();
					}, 100);
				};
			}
		}
	};

}