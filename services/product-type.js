(function() {

	angular.module('app')
	.service('productType', ['$translate', productTypeService]);
	
	function productTypeService($translate) {
	
		var productType = [
		//var productType = {
		//	data: [
				{
					id: 'LIVE_ON_TAPE',
					name: $translate.instant('PRODUCT_TYPE_LIVE_ON_TAPE')
				},
				{
					id: 'B_ROLL',
					name: $translate.instant('PRODUCT_TYPE_B_ROLL')
				},
				{
					id: 'NAT_VO',
					name: $translate.instant('PRODUCT_TYPE_NAT_VO')
				},
				{
					id: 'INTERVIEW',
					name: $translate.instant('PRODUCT_TYPE_INTERVIEW')
				},
				{
					id: 'GRAPHICS',
					name: $translate.instant('PRODUCT_TYPE_GRAPHICS')
				},
				{
					id: 'PIECE',
					name: $translate.instant('PRODUCT_TYPE_PIECE')
				},
			{
				id: 'MOJOMASTERS_COMPETITION',
				name: $translate.instant('PRODUCT_TYPE_MOJOMASTERS_COMPETITION')
			}
		//	]
		//};
		];

		return productType;
	}

}());