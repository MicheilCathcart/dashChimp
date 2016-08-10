(function() {

    var module = angular.module('app.dashboard');

    module.directive('dashboardHeader', ['$log', function($log) {
		
		$log.info('dashboard-header')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/dashboard/dashboard-header/dashboard-header.html',
			link: link,
			controller: controller
		}
		
		function controller ($scope, $element) {
			
		}
		
		
		function link ($scope, $element) {


		}
    	
    }]);
  
})();