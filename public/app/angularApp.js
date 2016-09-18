// The DashChimp App
var app = angular.module("app", [
	'app.charts',
	'app.dashboard',
	'ui.router',
    'ngSanitize',
	'ngAnimate'
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
			})
			.state('dashboard', {
				url:'/dashboard/',
				template:'<dashboard></dashboard>',
			});
			
			$urlRouterProvider.otherwise('/dashboard/');

	}
])

// Listen to UI Router navigation changes



// Rootscope Ctrl 

app.controller('rootscopeCtrl', ['$rootScope','$element', function($rootScope, $element) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
		  console.log('State Changed');

      var animated = $element.find('ui-view');
      animated.removeClass('scrolled');
	  
      var isForward = toState.name > fromState.name;
      if (isForward) {
        $element.removeClass('backward');
      } else {
        $element.addClass('backward');
      }
      animated.addClass('scrolled');
    });
}]);

/* Remove the # from URL's' */

/*app.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);*/