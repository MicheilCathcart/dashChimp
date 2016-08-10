(function() {

    var module = angular.module('app.dashboard');

    module.controller('chimpBuilder', ['$scope','$stateParams','$http','$log',
    
        function($scope, $stateParams, $http, $log) {
            
            $log.info("Chimp Builder Controller");

            // Title
            $scope.title = 'Template Builder';
 
        }
    ]);
})();