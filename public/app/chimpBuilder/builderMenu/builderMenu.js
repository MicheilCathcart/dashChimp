(function() {

    var module = angular.module('app.dashboard');

    module.directive('builderMenu', ['$log', function($log) {
		
		$log.info('builder-menu')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/chimpBuilder/builderMenu/builderMenu.html',
			link: link,
			controller: controller
		}
		
		function controller ($scope, $element) {
			
		}
		
		
		function link ($scope, $element) {


		}
    	
    }]);
  
})();