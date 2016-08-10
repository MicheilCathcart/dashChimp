(function() {

    var module = angular.module('app.dashboard');

    module.controller('templateBuilder', ['$scope','$stateParams','$http','$log',
    
        function($scope, $stateParams, $http, $log) {
            
            $log.info("Template Builder Controller");

            // Title
            $scope.title = 'Template Builder';
 
        }
    ]);
})();