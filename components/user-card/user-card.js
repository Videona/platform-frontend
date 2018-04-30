angular.module('app')
	.directive('userCard', ['session', userCardDirective]);

function userCardDirective(session) {
	return {
		templateUrl: 'components/user-card/user-card.view.html',
		scope: {
			user: '='
		},
		replace: true,
	};

	function openMenu($mdMenu, ev) {
		$mdMenu.open(ev);
	}

}