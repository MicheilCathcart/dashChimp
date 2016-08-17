(function() {

    var module = angular.module('app.dashboard');

    module.controller('template', ['$scope','$stateParams','$http','$log','$compile',
    
        function($scope, $stateParams, $http, $log, $compile) {

            // Title
            $scope.title = 'Template Builder';
 
        }
    ]);
})();