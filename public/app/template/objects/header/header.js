(function() {

    var module = angular.module('app.dashboard');

    module.component('templateObjectsHeader', {
		templateUrl: 'app/template/objects/header/header.html',
		controller: templateHeaderCtrl,
		bindings: {
			templatePart: '<',
			onDelete: '&',
			onChange: '&'
		}
	});

	function templateHeaderCtrl() {

		var ctrl = this;

		// Create a copy so the object is not updated within this component
		ctrl.newTemplatePart = angular.copy(ctrl.templatePart);

		ctrl.delete = function() {
			ctrl.onDelete({templatePart: ctrl.newTemplatePart});
		};

		ctrl.change = function() {
			ctrl.onChange({templatePart: ctrl.newTemplatePart});
		};
		
	}
  
})();