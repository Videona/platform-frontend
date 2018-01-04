(function(){

	angular.module('app')
		.factory('api', ['$http', apiService]);

	function apiService($http) {

		var api = {
			url: 'https://nemsummit.viday.co',
			token: '',
			get: get,
			post: post,
			del: del,
			setToken: setToken
		};

		return api;

		function post(url, data, callback) {

			$http({
				method: 'POST',
				url: url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded', 'authorization': 'Bearer ' + api.token},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj) {
						str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
					}
					return str.join('&');
				},
				// dataType: 'jsonp',
				data: data
			}).then(function(r) {
				onSuccess(r, callback);
			}).catch(function(r) {
				onError(r, callback);
			});
		}

		function get(url, callback) {
			$http({
				method: 'GET',
				url: url,
				headers: {'authorization': 'Bearer ' + api.token}
			}).then(function(r) {
				onSuccess(r, callback);
			}).catch(function(r) {
				onError(r, callback);
			});
		}

		function del(url, data, callback) {

			$http({
				method: 'DELETE',
				url: url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded', 'authorization': 'Bearer ' + api.token},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj) {
						str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));	
					}
					return str.join('&');
				},
				// dataType: 'jsonp',
				data: data
			}).then(function(r) {
				onSuccess(r, callback);
			}).catch(function(r) {
				onError(r, callback);
			});
		}

		function setToken (token) {
			if(typeof(token) !== 'undefined') {
				api.token = token;
			}
		}

		function onSuccess(response, callback) {
			var data = response.data;
			var status = response.status;
			// var statusText = response.statusText;
			var headers = response.headers;
			var config = response.config;

			if(typeof(callback) === 'function') {
				callback(data, status, headers, config);
			}
		}

		function onError(response, callback) {
			console.log(response);
			var data = response.data;
			var status = response.status;
			// var statusText = response.statusText;
			var headers = response.headers;
			var config = response.config;

			console.error('Error ' + status + ' in HTTP request');

			if(typeof(callback) === 'function') {
				callback(data, status, headers, config);
			}
		}

	}

	
})();
