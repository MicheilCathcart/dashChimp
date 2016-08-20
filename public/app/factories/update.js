(function() {

    var module = angular.module('app.dashboard');

    module.factory('update', ['$http',
	    
	    function($http) {
			
			 return {
    			template: function(model) {
					return $http({
						url: '/api/template/update',
						method: 'PUT',
						data: model
					})
    			}
 			}
			
	    }
    ]);
    
})();