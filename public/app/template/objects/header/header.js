(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsHeader', ['$log', function($log) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/header/header.html',
			replace: true,
			scope: {},
			controller: controller
		}
		
		function controller ($scope, $element) {

			// Import or define attributes

			$scope.model = $scope.$parent.object || {
				title:'Header'
			};

			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

		}
		
    	
    }]);
  
})();