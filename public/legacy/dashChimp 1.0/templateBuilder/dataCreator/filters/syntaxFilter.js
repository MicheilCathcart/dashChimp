(function() {
	
var module = angular.module('app.dashboard');
	
	module.filter('syntax', function() {
		
		var syntax = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
		
		return function(input) {
	    	return alphabet[input];
		};
		
	});

})();
