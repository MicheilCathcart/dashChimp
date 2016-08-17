(function() {

    var module = angular.module('app.dashboard');

    module.factory('read', ['$http',
	    
	    function($http) {
			
			 return {
    			template: function() {
					return $http({
						url: '/api/template',
						method: 'GET'
					})
    			}
 			}
			
	    }
    ]);
    
})();