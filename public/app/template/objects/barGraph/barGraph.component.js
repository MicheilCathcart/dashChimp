(function() {

    var module = angular.module('app.dashboard');

    module.component('templateBarGraph', {
		templateUrl: 'templateBarGraph.html',
		controller: templateBarGraphCtrl,
		bindings: {
			object: '>',
			onDelete: '>',
			onChange: '>'
		}
	});

	function templateBarGraphCtrl() {
		
	}
  
})();