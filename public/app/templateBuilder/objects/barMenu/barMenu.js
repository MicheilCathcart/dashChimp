(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateObjectsBar', ['$log', function($log) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/templateBuilder/objects/barMenu/barMenu.html',
			replace: true,
			scope: false,
			controller: controller,
			link: link,
			controllerAs:'templateObjectsBar',
			bindToController: true,
			require: ['^templateBuilder', 'templateObjectsBar']
		}
		
		function controller ($scope, $element) {
			
			var templateObjectsBar = this;

			console.log('$scope - controller');
			console.log($scope);

		}

		function link ($scope, $element, $attrs, $ctrl) {

			console.log('$scope');
			console.log($scope);

			console.log('$ctrl');
			console.log($ctrl);

			$scope.delete = function (model) {
				$element.remove();
				$scope.$destroy();
				$ctrl.templateBuilder.deleteFromTemplate(model);
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