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
            
            $scope.templateData = [
                {
                   name: 'Data 1',
                   type: 'Number' 
                },
                {
                   name: 'Data 2',
                   type: 'Number' 
                },
                {
                   name: 'Data 3',
                   type: 'Number' 
                },
                {
                   name: 'Data 4',
                   type: 'Number' 
                },
                {
                   name: null,
                   type: null 
                },
                {
                   name: null,
                   type: null 
                },
                {
                   name: null,
                   type: null 
                }
                ]
		}
		
		function link ($scope, $element) {

			$scope.addColumn = function (value) {
				if (value) {
					$log.debug('Has Value');
					$scope.templateData.push({name:null, type:null});
			}
			
			}
			
			$scope.removeColumn = function (value) {
				if (!value) {
					$log.debug('No Value');
					$scope.templateData.pop();
				}
			}

		} 
    	
    }]);
  
})();