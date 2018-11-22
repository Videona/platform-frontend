// pages/asset/asset.controller.js
"use strict";

angular.module('app')
	.controller('AssetController', ['page', 'assetService', '$mdPanel', AssetController])
	.controller('PlayerPanelController', PlayerPanelController);

let videoToPlay;

function AssetController(page, assetService, $mdPanel) {
	page.setPageTitle('user assets - Vimojo'); // TODO(jliarte): 22/11/18 improve title
	this._mdPanel = $mdPanel;

	var self = this;
	self.assets = [];

	assetService.get()
		.then(assets => {
			// console.log("retrieved assets ", assets);
			self.assets = assets;
		});

	self.showPlayerDialog = showPlayerDialog;

	function showPlayerDialog(asset, event) {
		videoToPlay = asset;
		const position = this._mdPanel.newPanelPosition()
			.absolute()
			.center();

		const config = {
			attachTo: angular.element(document.body),
			controller: PlayerPanelController,
			controllerAs: 'ctrl',
			disableParentScroll: this.disableParentScroll,
			templateUrl: 'pages/asset/player-panel.tmpl.html',
			hasBackdrop: true,
			panelClass: 'player-dialog',
			position: position,
			trapFocus: true,
			zIndex: 150,
			clickOutsideToClose: true,
			escapeToClose: true,
			focusOnOpen: true
		};

		this._mdPanel.open(config);
	}
}

function PlayerPanelController(mdPanelRef) {
	this._mdPanelRef = mdPanelRef;
	this.videoToPlay = videoToPlay;
	console.log("videoToPlay", videoToPlay);
}

PlayerPanelController.prototype.closeDialog = function() {
	const panelRef = this._mdPanelRef;

	panelRef && panelRef.close().then(function() {
		videoToPlay = undefined;
		panelRef.destroy();
	});
};