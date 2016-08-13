(function() {

console.log('I Exist');

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsHeader', ['$log', function($log) {
		
		$log.info('templateObjectsHeader')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/header/header.html',
			replace: true,
			controller: controller
		}
		
		function controller ($scope, $element) {
			
            console.log('Header Created');

		}
		
    	
    }]);
  
})();