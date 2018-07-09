angular.module('app')
	.directive('topbar', ['search', 'session', Topbar]);

function Topbar(search, session) {
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