(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateBuilderData', ['$log', function($log) {
		
		$log.info('dataCreator')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/templateBuilder/templateBuilderData/templateBuilderData.html',
			link: link,
			controller: controller
		}
		
		function controller ($scope, $element) {
            
            // Example data template to get started
            
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
            
            // Create an array of the data names to use with syntax highlighting
                
            $scope.dataNames = function() {
                return _.remove(_.map($scope.templateData, 'name'), function(n){ return n !== null });
            };
            
            // Show the type options as selectables whenever a key is pressed
                
            $scope.showTypeOptions = function() {
                $log.debug('Show Type Options');
            }
            
		}
		function link ($scope, $element) {


            $scope.changing = function() {
                $log.debug('I am changing');
            }

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