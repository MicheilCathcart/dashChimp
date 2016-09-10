// The DashChimp App
var app = angular.module("app", [
	'app.charts',
	'app.dashboard',
	'ui.router',
    'ngSanitize'
]);

// Dependencies 
angular.module('app.charts', []);
angular.module('app.dashboard', ['ngSanitize']);

// Config 

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
            .state('template', {
				url:'/template/',
				template:'<template></template>',
			});
			
			$urlRouterProvider.otherwise('/template/');

	}
])

/* Remove the # from URL's' */

/*app.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);*/