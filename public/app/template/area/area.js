(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateArea', ['$log','$compile', function($log,$compile) {
		
		$log.info('templateArea')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/area/area.html',
            replace:true,
			controller: controller
		}
		
		function controller ($scope, $element) {


            $( ".template-object" ).draggable({
                connectToSortable: "#sortable",
                helper: "clone"
            });

            $( ".template-area" ).droppable({
                accept: ".template-object",
                drop: function( event, ui ) {

                var target = event.target;
                var template = ui.helper[0].dataset.template;
                var el = $compile(template)($scope);
                target.append(el[0]);

                /*
                angular.element(target).injector().invoke(function($compile) {
                    var $scope = angular.element(target).scope();
                    target.append($compile(template)($scope));
                    // Finally, refresh the watch expressions in the new element
                    $scope.$apply();
                });*/

                }
            });        

		}
		
    	
    }]);
  
})();