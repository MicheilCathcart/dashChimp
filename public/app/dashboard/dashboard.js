(function() {

    var module = angular.module('app.dashboard');

    module.controller('dashboard', ['$scope','$stateParams','$http','$log',
    
        function($scope, $stateParams, $http, $log) {
            
            $log.info("Dashboard Controller");
            
            $log.info($stateParams);

            // Title
            $scope.title = $stateParams.title;
            
            // ID
            $scope.id = $stateParams.id || 'none';
            
            // Expanded
            $scope.expanded = false;

            // Data
            $scope.dataHeadings = [{value:"Heading 1"},{value:"Heading 2"},{value:"Heading 3"},{value:"Heading 4"},{value:null},{value:null},{value:null}]
			
            var now = new Date();
            
			$scope.dataset = [
				[{value:60},{value:120},{value:180},{value:240},{value:null},{value:null},{value:null}],
				[{value:null},{value:null},{value:null},{value:null},{value:null},{value:null},{value:null}],
				[{value:null},{value:null},{value:null},{value:null},{value:null},{value:null},{value:null}],
				[{value:null},{value:null},{value:null},{value:null},{value:null},{value:null},{value:null}],
				[{value:null},{value:null},{value:null},{value:null},{value:null},{value:null},{value:null}],
				[{value:null},{value:null},{value:null},{value:null},{value:null},{value:null},{value:null}]
			]
 
        }
    ]);
})();