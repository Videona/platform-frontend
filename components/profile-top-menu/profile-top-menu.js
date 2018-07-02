angular.module('app')
	.directive('profileTopMenu', ['session', profileTopMenuDirective]);

function profileTopMenuDirective(session) {
	return {
		templateUrl: 'components/profile-top-menu/profile-top-menu.view.html',
		replace: true,
		controller: profileTopMenuController,
		controllerAs: 'profileCtrl',
		link: {
			pre: function (scope) {
				// TODO:(jliarte) remove this, but can be used to test user img
				// session.pic = "https://avatars0.githubusercontent.com/u/2227736?s=88&v=4";
				scope.session = session;

				scope.openMenu = openMenu;
			}
		}
	};

	function openMenu($mdMenu, ev) {
		$mdMenu.open(ev);
	}

	profileTopMenuController.$inject = ['authService'];

	function profileTopMenuController(authService) {
		const self = this;
		self.auth = authService;
	}

}