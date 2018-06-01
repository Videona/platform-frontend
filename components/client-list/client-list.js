angular.module('app').directive('clientList', ['clients', clientListDirective]);

/*
 - EDIT CUSTOMER BUTTON
 - DELETE CUSTOMER BUTTON
*/

function clientListDirective(clients) {
	return {
		restrict: 'E',
		templateUrl: 'components/client-list/client-list.view.html',
		scope: {
			selection: '='
		},
		link: {
			pre: function (scope) {
				clients.get();
				scope.clients = clients;

				scope.selectClient = selectClient;
				scope.deselectClient = deselectClient;
			}
		}
	};

	function selectClient(client) {
		selection.push(client);
	}

	function deselectClient(client) {
		var i = selection.indexOf(client);
		console.log(i);
	}
}
