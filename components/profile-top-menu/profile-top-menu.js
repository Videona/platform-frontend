angular.module('app')
	.directive('profileTopMenu', ['session', '$mdPanel', profileTopMenuDirective]);

function profileTopMenuDirective(session, $mdPanel) {

	var panelRef;

	return {
		templateUrl: 'components/profile-top-menu/profile-top-menu.view.html',
		replace: true,
		link: {
			pre: function (scope) {
				scope.session = session;

				scope.open = openPanel;
				scope.close = closePanel;
				scope.switch = switchPanel;
			}
		}
	};

	function createPanel() {
		var panelPosition = $mdPanel.newPanelPosition()
			.absolute()
			.top('16px')
			.right('8px');

		var config = {
			// attachTo: angular.element(document.getElementById('openProfileTopMenuItem')),
			attachTo: angular.element(document.body),
			position: panelPosition,
			// animation: panelAnimation,
			// targetEvent: $event,
			controller: ['$scope', ProfileTopPanelController],
			templateUrl: 'components/profile-top-menu/dialog.html',
			clickOutsideToClose: true,
			escapeToClose: true,
			focusOnOpen: true
		};

		$mdPanel.open(config).then(function(result) {
			panelRef = result;
			console.log(panelRef);
		});
	}

	function switchPanel() {
		if(panelRef && panelRef.isAttached) {
			closePanel();
		} else {
			openPanel();
		}
	}

	function openPanel() {
		if(!panelRef) {
			createPanel();
		} else {
			panelRef.open();
		}
	}

	function closePanel() {
		if(panelRef) {
			panelRef.close();
		}
	}

	function ProfileTopPanelController($scope) {
		$scope.session = session;
		$scope.close = closePanel;
	}
}