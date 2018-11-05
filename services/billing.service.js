// services/billing.service.js
(function () {

	'use strict';

	angular
		.module('app')
		.service('billingService', billingService);

	billingService.$inject = ['api', 'pricing', 'session', '$q'];

	function billingService(api, pricing, session, $q) {

		function getProductFreeTrial(productId) {
			const trialData = {
				productId: productId,
			};
			return $q(resolve => {
				api.post(api.url + '/billing/trial', trialData, function (data) {
					if (data) {
						console.log("retrieved data from backend setting product free trial ", data);
					}
					resolve(data); // TODO(jliarte): 15/10/18 handle error?
				});
			});
		}

		function handleProductPurchase() {
			if (session.getCurrentProduct()) {
				// TODO(jliarte): 15/10/18 redirect to cart or checkout product purchase
				// TODO(jliarte): 15/10/18 if (trialRequested) - now we only support free trial, so....
				const productId = session.getCurrentProduct();
				return $q(resolve => setTimeout(() => resolve(), 600)) // TODO(jliarte): 16/10/18 workarround for sync problems in auth callback, FIXME!
					.then(() => {
						return getProductFreeTrial(productId);
					})
					.then(res => {
						if (res) {
							console.log("remove current product");
							session.setCurrentProduct();
						}
					});
			}
		}

		return {
			getProductFreeTrial: getProductFreeTrial,
			handleProductPurchase: handleProductPurchase,
		};

	}

}());
