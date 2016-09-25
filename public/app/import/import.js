(function() {

    var module = angular.module('app.dashboard');

    module.directive('import', ['$log','$compile','$timeout','read','update','$stateParams', function($log, $compile, $timeout, read, update, $stateParams) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/import/import.html',
            replace:true,
            controllerAs: '$ctrl',
            bindToController: true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            var $ctrl = this;

            $ctrl.pageClass = $stateParams.movementType;

            $ctrl.spreadsheet = {};

            $ctrl.upload = function(data) {
                $scope.$apply(function () {
                    $ctrl.spreadsheet = data;
                })
                console.log('$ctrl.spreadsheet');
                console.log($ctrl.spreadsheet);
            }

		}
    	
    }]);
  
})();