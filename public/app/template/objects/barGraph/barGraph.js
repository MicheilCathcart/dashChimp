(function() {

    var module = angular.module('app.dashboard');

    module.component('templateObjectsBar', {
		templateUrl: 'app/template/objects/barGraph/barGraph.html',
		controller: templateBarGraphCtrl,
		bindings: {
			templatePart: '<',
			index: '<',
			onDelete: '&',
			onChange: '&'
		}
	});

	function templateBarGraphCtrl() {

		var ctrl = this;

		console.log('ctrl.templatePart');
		console.log(ctrl.templatePart);

		// Create a copy so the object is not updated within this component
		ctrl.newTemplatePart = angular.copy(ctrl.templatePart);

		console.log('ctrl.newTemplatePart');
		console.log(ctrl.newTemplatePart);

		ctrl.delete = function() {
			ctrl.onDelete({templatePart: ctrl.newTemplatePart, index: ctrl.index});
		};

		ctrl.change = function() {
			ctrl.onChange({templatePart: ctrl.newTemplatePart});
		};

		// Update the template with the returned databox

		ctrl.changeDatabox = function(databox) {

			if (databox.type == "series") {
				ctrl.newTemplatePart.series.push({ name: databox.fieldName, color: databox.className})
			} else {
				ctrl.newTemplatePart[databox.type] = { name: databox.fieldName, color: databox.className};
			}

			ctrl.onChange({templatePart: ctrl.newTemplatePart});
		};
		
	}
  
})();