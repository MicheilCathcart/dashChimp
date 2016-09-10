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

		ctrl.delete = function() {
			ctrl.onDelete({object: ctrl.object});
		};

		ctrl.update = function() {
			ctrl.onUpdate({templatePart: ctrl.templatePart});
		};

		console.log(ctrl);
		
	}
  
})();