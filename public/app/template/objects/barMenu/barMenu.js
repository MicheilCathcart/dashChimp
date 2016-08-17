(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsBar', ['$log', function($log) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/objects/barMenu/barMenu.html',
			replace: true,
			scope: {},
			controller: controller
		}
		
		function controller ($scope, $element) {

			$scope.model = $scope.$parent.object || {
				title:'Bar Graph Heading'
			};

			$scope.delete = function () {
				$element.remove();
  				$scope.$destroy();
			}

			// Make Data Box droppable

			$( ".data-box" ).droppable({
				accept: ".template-data-object",
				drop: function( event, ui ) {
					var target = $(event.target);
					var className = ui.helper[0].dataset.class;
					var fieldName = ui.helper[0].dataset.fieldName;
					var template = '<div class="' + className + ' coloured databox-object"><div class="vertical-align">' + fieldName + '</div></div>';
					target.append(template);
				}
			});

			$('.databox').on('click','.databox-object', function() {
				$scope.$apply(function(){
      				// perform any model changes or method invocations here on angular app.

    			});
				
			})


		}
		
    	
    }]);
  
})();