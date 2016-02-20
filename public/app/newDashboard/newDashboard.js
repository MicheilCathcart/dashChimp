(function() {

    var module = angular.module('app.dashboard');

    module.controller('newDashboard', ['$scope','$stateParams','$http','$log',
    
        function($scope, $stateParams, $http, $log) {
            
            $log.info("New Dashboard Controller");

            // Title
            $scope.title = 'New Dashboard';
 
        }
    ]);
})();