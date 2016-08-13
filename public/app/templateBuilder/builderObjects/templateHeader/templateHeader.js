(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateHeader', ['$log', function($log) {
		
		$log.info('templateHeader')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/templateBuilder/builderObjects/builderObjects/templateHeader.html',
			link: link,
			controller: controller
		}
		
		function controller ($scope, $element) {
			
            console.log('Header Created');

		}
		
    	
    }]);
  
})();