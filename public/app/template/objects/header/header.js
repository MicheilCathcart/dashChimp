(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsHeader', ['$log', function($log) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/header/header.html',
			replace: true,
			scope: {},
			require: '^templateArea',
			link: link
		}

		function link ($scope, $element, attrs, templateArea) {

			// Import or define attributes

			$scope.model = $scope.$parent.object || {
				title:'Header'
			};

			// Text Area Automatic Resize

			$scope.update = function() {
				templateArea.updateTemplate();
			}

			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

		}
		
    	
    }]);
  
})();