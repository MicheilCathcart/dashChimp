(function() {

console.log('I Exist');

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsBar', ['$log', function($log) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/barMenu/barMenu.html',
			replace: true,
			scope: {},
			controller: controller
		}
		
		function controller ($scope, $element) {
			
			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

		}
		
    	
    }]);
  
})();