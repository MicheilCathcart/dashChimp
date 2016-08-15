(function() {

console.log('I Exist');

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsSubheader', ['$log', function($log) {
		
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/subheader/subheader.html',
			replace: true,
			scope: {},
			controller: controller
		}
		
		function controller ($scope, $element) {

			$scope.model = $scope.$parent.object || {
				title:'This is the subheader'
			};

			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

		}
		
    	
    }]);
  
})();