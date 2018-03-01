angular.module('app')
	.directive('topbar', Topbar);

function Topbar() {
	return {
		templateUrl: 'components/topbar/topbar.view.html'
	};
}