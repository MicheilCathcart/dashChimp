(function() {

    var module = angular.module('app.dashboard');

    module.directive('dashboard', ['$log','$compile','$timeout','read','update', function($log, $compile, $timeout, read, update) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/dashboard/dashboard.html',
            replace:true,
            controllerAs: 'dashboard',
            bindToController: true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            var dashboard = this;

		}
		
    	
    }]);
  
})();