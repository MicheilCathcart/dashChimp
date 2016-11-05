// The DashChimp App
var app = angular.module("app", [
	'app.charts',
	'app.dashboard',
	'ui.router',
  'ngSanitize',
	'ngAnimate',
	'ngHandsontable'
]);

// Dependencies 
angular.module('app.charts', []);
angular.module('app.dashboard', ['ngSanitize', 'ngHandsontable']);

// Config 

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
        .state('template', {
				url:'/template/',
				template:'<template></template>',
				params: { movementType: null }
			})
			.state('dashboard', {
				url:'/dashboard/',
				template:'<dashboard></dashboard>',
				params: { movementType: null }
			})
			.state('import', {
				url:'/import/',
				template:'<import></import>',
				params: { movementType: null }
			});
			
			$urlRouterProvider.otherwise('/import/');

	}
])

// Listen to UI Router navigation changes



// Rootscope Ctrl 

/*
app.controller('rootscopeCtrl', ['$rootScope','$element', function($rootScope, $element) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
		  console.log('State Changed');

			console.log(toState);
			console.log(fromState);

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

*/

/* Remove the # from URL's' */

/*app.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);*/