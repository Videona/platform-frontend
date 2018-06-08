angular.module('app')
	.controller('TermsController', ['page', TermsController]);

function TermsController(page) {
	var self = this;
	
	// Setup page title
	page.setPageTitle($translate.instant('TERMS'));
}
