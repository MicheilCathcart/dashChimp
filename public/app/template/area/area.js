(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateArea', ['$log','$compile','$timeout', function($log, $compile, $timeout) {
		
		$log.info('templateArea')
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/area/area.html',
            replace:true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            // Make Data Box droppable

            function boxDroppable () {
                $( ".data-box" ).droppable({
                    accept: ".template-data-object",
                    drop: function( event, ui ) {
                        var target = $(event.target);
                        var className = ui.helper[0].dataset.class;
                        var fieldName = ui.helper[0].dataset.fieldName;
                        var template = '<div class="' + className + ' coloured databox-object"><div class="vertical-align">' + fieldName + '</div></div>';
                        console.log(className);
                        console.log(fieldName);
                        target.append(template);
                    }
                });
            }

            // Left Menu

            $( ".template-object" ).draggable({
                helper: "clone",
                zIndex: 100
            });

            $( ".template-area" ).droppable({
                accept: ".template-object",
                drop: function( event, ui ) {

                var target = $(event.target);
                var template = ui.helper[0].dataset.template;
                var el = $compile(template)($scope);
                target.append(el[0]);
                boxDroppable();
                }
            });

            // Right Menu

            $( ".template-data-object" ).draggable({
                helper: "clone",
                zIndex: 100
            });

            $timeout(function() {
                boxDroppable();
            })

            // Main Area

            $( ".template-area" ).sortable({
                handle: ".drag",
                helper: "clone",
                forceHelperSize: true,
                forcePlaceholderSize: true,
                items: ".template-objects",
                revert: true,
                axis: "y",
                tolerance: "pointer"
            });

		}
		
    	
    }]);
  
})();