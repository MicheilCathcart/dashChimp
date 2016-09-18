(function() {

    var module = angular.module('app.dashboard');

    module.component('templateObjectsSubheader', {
		templateUrl: 'app/template/objects/subheader/subheader.html',
		controller: templateSubHeaderCtrl,
		bindings: {
			templatePart: '<',
			index: '<',
			onDelete: '&',
			onChange: '&'
		}
	});

	function templateSubHeaderCtrl() {

		var ctrl = this;

		// Create a copy so the object is not updated within this component
		ctrl.newTemplatePart = angular.copy(ctrl.templatePart);

		ctrl.delete = function() {
			ctrl.onDelete({templatePart: ctrl.newTemplatePart, index: ctrl.index});
		};

		ctrl.change = function() {
			ctrl.onChange({templatePart: ctrl.newTemplatePart});
		};
		
	}
  
})();