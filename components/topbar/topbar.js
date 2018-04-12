angular.module('app')
	.directive('topbar', ['search', Topbar]);

function Topbar(search) {
	return {
		templateUrl: 'components/topbar/topbar.view.html',
		link: {
			pre: function (scope) {
				scope.search = search;
				scope.focus = function () {
					setTimeout(function () {
						document.getElementById('searchField').focus();
					}, 100);
				};
			}
		}
	};
}