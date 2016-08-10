(function() {
	
var module = angular.module('app.dashboard');
	
	module.filter('syntax', function() {
        
		var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        
		return function(input, dataNames) {

            var newString = input;

            // Try and find the data name within the string, if it exists, wrap it in a span class
            
            if (input !== null ) {

            newString = newString.replace(/ /g, '&nbsp;');

            _(dataNames).forEach(function(dataName, index) {
                var dataNameLong = dataName.toUpperCase().replace(/ /g, '&nbsp;');
                var inString = newString.indexOf(dataNameLong);
                if (inString > -1 ) {
                    newString = newString.slice(0, inString) + "<span class='syntax " + alphabet[index] + "'>" + dataNameLong + "</span>" + newString.slice(inString + dataNameLong.length);
                }

            });

            newString += "<span class='fake-cursor'></span>";

            }
            
	    	return newString;
		};
		
	});

})();
