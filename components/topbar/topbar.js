angular.module('app')
	.directive('topbar', ['search', 'session', Topbar]);

function Topbar(search, session) {
	return {
		templateUrl: 'components/topbar/topbar.view.html',
		link: {
			pre: function (scope) {
				scope.search = search;
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