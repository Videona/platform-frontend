(function () {
	angular.module('app').factory('Page', function () {
		let title = 'Vimojo Platform';
		return {
			title: function () {
				return title;
			},
			setTitle: function (newTitle) {
				title = newTitle;
			}
		};
	});
}());