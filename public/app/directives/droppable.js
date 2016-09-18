(function() {

    var module = angular.module('app.dashboard');

    module.directive('droppable', function() {
	    
		return {
			restrict: 'A',
            scope: {},
            controllerAs: 'ctrl',
            bindToController: {
                onChange: '&'
            },
            controller: controller,
            link: link
		}

        function controller () {

            var ctrl = this;

            ctrl.change = function(config) {
                ctrl.onChange({databox: config});
            };

        }

        function link (scope, element, attr, ctrl) {

            $(element[0]).droppable({
			accept: ".template-data-object",
			drop: function( event, ui ) {

				var target = $(event.target);

                var config = {
                    type: target.data().type,
                    className: ui.helper[0].dataset.class,
				    fieldName: ui.helper[0].dataset.fieldName
                }

                ctrl.change(config);

			}

		});

        }	
    	
    });
  
})();