(function() {

    var module = angular.module('app.dashboard');

    module.directive('template', ['$log','$compile','$timeout','read','update', function($log, $compile, $timeout, read, update) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/template.html',
            replace:true,
            controllerAs: 'template',
            bindToController: true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            var template = this;

            template.title = 'Template Builder'

		}
		
    	
    }]);
  
})();