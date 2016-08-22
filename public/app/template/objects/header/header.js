(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsHeader', ['$log', function($log) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/header/header.html',
			replace: true,
			scope: {},
			require: '^templateArea',
			link: link
		}

		function link ($scope, $element, attrs, templateArea) {

			console.log('templateArea');
			console.log(templateArea);

			// Import or define attributes

			$scope.model = $scope.$parent.object || {
				title:'Header'
			};

			// Text Area Automatic Resize

			/*
			function h(e) {
    			$(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
			}
			$('textarea').each(function () {
				h(this);
			}).on('input', function () {
				h(this);
			});*/

			/*
			$('.editable').on('keyup', function(e) {
				$scope.$apply(function() {
					console.log(e.target);
				$scope.model.title = e.target.innerHTML;
				});
			})*/

			$scope.onChange = function() {
				console.log('Changing');
				console.log($scope.model.title);
			}

			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

		}
		
    	
    }]);
  
})();