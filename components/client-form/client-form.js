angular.module('app').directive('clientForm', ['clients', clientDirective]);

function clientDirective(clients) {
	return {
		restrict: 'E',
		templateUrl: 'components/client-form/client-form.view.html',
		scope:{
			onExit: '=',
			data: '=',
		},
		link: function (scope) {
			scope.editData = {};
			if(typeof scope.data !== 'undefined') {
				// COPY DATA
				var dataKeys = Object.keys(scope.data);
				for (var i = 0; i < dataKeys.length; i++) {
					scope.editData[dataKeys[i]] = scope.data[dataKeys[i]];
				}
			}

			scope.loading = false;
			scope.add = function () {
				scope.loading = true;

				var action = clients.add;
				if(typeof scope.data._id !== undefined) {
					action = clients.update;
				}
				action(scope.editData.name, scope.editData.ftp.host, scope.editData.ftp.user, scope.editData.ftp.password, scope.editData.ftp.secure, scope.editData.ftp.folderRaw, scope.editData.ftp.folderEdited, function (data) {
					scope.loading = false;
					scope.data = data;
					scope.exit();
				});
			};
			scope.exit = function () {
				// Do things before going out...
				if(typeof scope.onExit === 'function') {
					scope.onExit(scope.data || scope.editData || null);
				}
			};
		}
	};
}
