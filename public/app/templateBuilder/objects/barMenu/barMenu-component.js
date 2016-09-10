(function() {

    var module = angular.module('app.dashboard');

    module.component('templateBarGraph', {
		templateUrl: 'templateBarGraph.html',
		controller: templateBarGraphController,
		bindings: {
			object: '>',
			onDelete: '>',
			onChange: '>'
		}
	});
  
})();