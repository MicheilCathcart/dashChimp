(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsSubheader', ['$log', function($log) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/templateBuilder/objects/subheader/subheader.html',
			replace: true,
			scope: {},
			require: '^templateBuilder',
			link: link
		}

		function link ($scope, $element, attrs, templateBuilder) {

			// Import or define attributes

			$scope.model = $scope.$parent.object || {
				title:'This is the subheader'
			};

			// Text Area Automatic Resize

			$scope.update = function() {
				templateBuilder.updateTemplate();
			}

			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

		}
		
    	
    }]);
  
})();