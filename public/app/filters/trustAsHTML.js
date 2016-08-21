(function() {
	
var module = angular.module('app.dashboard');
	
	module.filter('trustAsHtml', [
    '$sce',
    function($sce) {
      return function(input) {
        // Defaults to treating trusted text as `html`
        return $sce.trustAsHtml(input);
      }
    }
  ])

})();
