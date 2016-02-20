(function() {

    var module = angular.module('app.dashboard');

    module.directive('barChart', ['$log', function($log) {
		
		$log.info('bar-chart')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/charts/bar/bar.html',
			link: link,
			controller: controller
		}
		
		function controller ($scope, $element) {
			

			// Render the Bars on datachange and init

			$scope.renderBars = function() {
				
				$scope.maxValue = _.max($scope.dataset[0], function(data) {
 				 return data.value;
				});
				
				$log.debug('Rendering Bars');
			
				var height = 400;
				
				$log.debug('maxValue');
				$log.debug($scope.maxValue.value);
				
				$scope.scaleX = d3.scale.linear()
					.domain([0, $scope.maxValue.value])
					.range([0, height]);
				
			}
			
			$scope.renderBars();
		}
		
		
		function link ($scope, $element) {


		}
    	
    }]);
  
})();