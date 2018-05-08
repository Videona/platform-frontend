angular.module('app')
	.directive('headerBox', [headerBox]);

function headerBox() {
	return {
		templateUrl: 'components/header-box/header-box.view.html',
		link: {
			pre: function (scope) {
				console.log('Header box is here!');
			}
		}
	};
}