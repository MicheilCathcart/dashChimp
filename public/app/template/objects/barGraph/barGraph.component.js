(function() {

    var module = angular.module('app.dashboard');

    module.component('templateObjectsBar', {
		templateUrl: 'app/template/objects/barGraph/barGraph.html',
		controller: templateBarGraphCtrl,
		bindings: {
			templatePart: '<',
			onDelete: '&',
			onUpdate: '&'
		}
	});

	function templateBarGraphCtrl() {

		var ctrl = this;

		// Create a copy so the object is not updated within this component
		ctrl.newTemplatePart = angular.copy(ctrl.templatePart);

		ctrl.delete = function() {
			ctrl.onDelete({templatePart: ctrl.newTemplatePart});
		};

		ctrl.update = function() {
			ctrl.onUpdate({templatePart: ctrl.newTemplatePart});
		};

		$( ".data-box" ).droppable({
				accept: ".template-data-object",
				drop: function( event, ui ) {
					var target = $(event.target);
					var className = ui.helper[0].dataset.class;
					var fieldName = ui.helper[0].dataset.fieldName;
					var template = '<div class="' + className + ' coloured databox-object"><div class="vertical-align">' + fieldName + '</div></div>';
					target.append(template);
				}
			});

		console.log(ctrl);
		
	}
  
})();