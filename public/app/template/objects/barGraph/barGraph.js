(function() {

    var module = angular.module('app.dashboard');

    module.component('templateObjectsBar', {
		templateUrl: 'app/template/objects/barGraph/barGraph.html',
		controller: templateBarGraphCtrl,
		bindings: {
			templatePart: '<',
			onDelete: '&',
			onChange: '&'
		}
	});

	function templateBarGraphCtrl() {

		var ctrl = this;

		// Create a copy so the object is not updated within this component
		ctrl.newTemplatePart = angular.copy(ctrl.templatePart);

		ctrl.delete = function() {
			ctrl.onDelete({templatePart: ctrl.newTemplatePart});
		};

		ctrl.change = function() {
			console.log('Call Change');
			ctrl.onChange({templatePart: ctrl.newTemplatePart});
		};

		$( ".data-box" ).droppable({
				accept: ".template-data-object",
				drop: function( event, ui ) {
					var target = $(event.target);
					var type = target.data().type;
					var className = ui.helper[0].dataset.class;
					var fieldName = ui.helper[0].dataset.fieldName;

					console.log(type);
					if (type == "series") {
						console.log(ctrl.newTemplatePart.series);
						ctrl.newTemplatePart.series.push({ name: fieldName, color: className})
					} else {
						ctrl.newTemplatePart[type] = { name: fieldName, color: className};
					}

					ctrl.onChange({templatePart: ctrl.newTemplatePart});

					console.log(ctrl.newTemplatePart);
				}
			});

		$( ".databox-object" ).draggable({
                helper: "clone",
                zIndex: 100
            });

		// This will probably be re-thought

		$('.databox').on('click','.databox-object', function() {
			console.log('Do Things');
		})
		
	}
  
})();