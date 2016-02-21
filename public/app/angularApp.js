// The DashChimp App
var app = angular.module("app", [
	'app.charts',
	'app.dashboard',
	'app.menus',
	'ui.router'
]);

// Dependencies 
angular.module('app.charts', []);
angular.module('app.dashboard', []);
angular.module('app.menus', []);

// Config 

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('dashboard', {
				url:'/dashboard/:id/:title/',
				templateUrl:'../app/dashboard/dashboard.html',
				controller: 'dashboard'
			})
			.state('newDashboard', {
				url:'/new-dashboard/',
				templateUrl:'../app/newDashboard/newDashboard.html',
				controller: 'newDashboard'
			})
            .state('chimpBuilder', {
				url:'/chimp-builder/',
				templateUrl:'../app/chimpBuilder/chimpBuilder.html',
				controller: 'chimpBuilder'
			});
			
			$urlRouterProvider.otherwise('/chimp-builder/');

	}
])

app.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);