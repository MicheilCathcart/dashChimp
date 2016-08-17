(function() {

    var module = angular.module('app.dashboard');

    module.factory('update', ['$http',
	    
	    function($http) {
			
			 return {
    			template: function() {
					return $http({
						url: '/api/template/update',
						method: 'POST'
					})
    			}
 			}
			
	    }
    ]);
    
})();