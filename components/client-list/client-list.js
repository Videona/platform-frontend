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
			selection: '=',
			status: '=',
		},
		link: {
			pre: function (scope) {
				if(typeof scope.selection !== 'object') {
					scope.selection = [];
				}
				if(typeof scope.status !== 'object') {
					scope.status = {};
				}
				scope.selected = {};
				scope.editing = [];

				clients.get(function(data) {
					// Select All
					selectAll(clients.list, scope.selection);
				});
				scope.clients = clients;


				scope.selectClient = selectClient;
				scope.deselectClient = deselectClient;
				scope.select = function (i) {
					var cli = clients.list[i];
					if (scope.selected[cli._id]) {
						deselectClient(cli, scope.selection);
					} else {
						selectClient(cli, scope.selection);
					}
				};
				scope.edit = function (i) {
					scope.editing[i] = true;
					scope.status.isFormOpen = true;
				}
				scope.closeEdit = function (data) {
					var i = search(data, clients.list);
					scope.editing[i] = false;
					scope.status.isFormOpen = false;
				}
		
				function selectAll(data) {
					for (var i = 0; i < data.length; i++) {
						scope.selected[data[i]._id] = true;
						selectClient(data[i], scope.selection);
					}
				}
			}
		}
	};


	function selectClient(client, selection) {
		if(search(client, selection) === -1) {
			selection.push(client);
		}
	}

	function deselectClient(client, selection) {
		console.log('deselecting...')
		var position = search(client, selection);
		if(position !== -1) {
			selection.splice(position, 1);
			console.log('deselected ' + position);
		}
		
	}

	function search(elem, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]._id == elem._id) {
				return i;
			}
		}

		return -1;
	}
}
