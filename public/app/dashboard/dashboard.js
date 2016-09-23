(function() {

    var module = angular.module('app.dashboard');

    module.directive('dashboard', ['$log','$compile','$timeout','read','update','$stateParams', function($log, $compile, $timeout, read, update, $stateParams) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/dashboard/dashboard.html',
            replace:true,
            controllerAs: '$ctrl',
            bindToController: true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            var $ctrl = this;

            console.log($stateParams);

            $ctrl.pageClass = $stateParams.movementType;

		}
    	
    }]);
  
})();