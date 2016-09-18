(function() {

    var module = angular.module('app.dashboard');

    module.component('templateObjectsHeader', {
		templateUrl: 'app/template/objects/header/header.html',
		controller: templateHeaderCtrl,
		bindings: {
			templatePart: '<',
			index: '<',
			onDelete: '&',
			onChange: '&'
		}
	});

	function templateHeaderCtrl() {

		var ctrl = this;

		console.log('Header Called');
		console.log(ctrl.templatePart);

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