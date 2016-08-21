(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsSubheader', ['$log', function($log) {

		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/subheader/subheader.html',
			replace: true,
			scope: {},
			require: '^templateArea',
			link: link
		}
		
		function link ($scope, $element, attrs, templateArea) {

			// Import or define attributes

			$scope.model = $scope.$parent.object || {
				title:'This is a subheader'
			};

			$scope.update = function() {
				templateArea.updateTemplate(templateArea.model)
			}

			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

		}
		
    	
    }]);
  
})();