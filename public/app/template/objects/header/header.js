(function() {

console.log('I Exist');

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsHeader', ['$log', function($log) {
		
		$log.info('templateObjectsHeader')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/header/header.html',
			replace: true,
			scope: {},
			controller: controller
		}
		
		function controller ($scope, $element) {
			
            console.log('Header Created');
			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

		}
		
    	
    }]);
  
})();