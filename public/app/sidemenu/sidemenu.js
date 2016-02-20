(function() {

    var module = angular.module('app.menus');

    module.directive('sideMenu', ['$log', function($log) {
		
		$log.info('sideMenu')
	    
		return {
			restrict: 'E',
			scope: { },
			templateUrl: 'app/sidemenu/sidemenu.html',
			link: link,
			controller: controller
		}
		
		function controller ($scope, $element) {
			
			$scope.createdDashboards = [
			{
				id: "1",
				title: "Bar Chart",
				thumbnailURL: "/images/bar-chart.svg"
			},
			{
				id: "2",
				title: "Pie Chart",
				thumbnailURL: "/images/pie-chart.svg"
			}
			]
			
		}
		
		
		function link ($scope, $element) {


		}
    	
    }]);
  
})('sideMenu');