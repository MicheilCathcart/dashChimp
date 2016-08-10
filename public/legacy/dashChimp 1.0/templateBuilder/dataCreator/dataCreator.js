(function() {

    var module = angular.module('app.dashboard');

    module.directive('builderData', ['$log', function($log) {
		
		$log.info('dataCreator')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/chimpBuilder/builderData/builderData.html',
			link: link,
			controller: controller
		}
		
		function controller ($scope, $element) {
			$scope.nowTime = new Date();
		}
		
		function link ($scope, $element) {

			$scope.addColumn = function (value) {
				if (value) {
					$log.debug('Has Value');
					$scope.dataHeadings.push({value:null});
					$scope.dataset.forEach(function(row) {
						row.push({value:null});
					})
			}
			
			}
			
			$scope.removeColumn = function (value) {
				if (!value) {
					$log.debug('No Value');
					$scope.dataHeadings.pop();
					$scope.dataset.forEach(function(row) {
						row.pop();
					})
				}
			}

		} 
    	
    }]);
  
})();