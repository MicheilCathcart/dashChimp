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

            $ctrl.spreadsheet.columns = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5']

            $ctrl.handsOnTableSettings = {
                rowHeights: 15,
                colWidths: 15,
                //manualColumnResize: false,
                //manualRowResize: false,
                renderAllRows: false,
                stretchH: "all",
                startRows: 5
            }

            $ctrl.upload = function(data) {
                $scope.$apply(function () {
                    $ctrl.spreadsheet = data;
                    console.log(data);
                })
            }

		}
    	
    }]);
  
})();