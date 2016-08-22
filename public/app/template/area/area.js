(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateArea', ['$log','$compile','$timeout','read','update', function($log, $compile, $timeout, read, update) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/area/area.html',
            replace:true,
            controllerAs: 'templateArea',
            bindToController: true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            var templateArea = this;

            // Read the Template
            
            templateArea.readTemplate = function () {

                read.template().success(function(data){

                    templateArea.model = data[0];

                    // Order Template Before Render
                    templateArea.model.structure = _.orderBy(templateArea.model.structure, ['order'], ['asc']) 

                })
            
            }

            templateArea.readTemplate();

            // Update the Template
            
            templateArea.updateTemplate = function () {

                console.log('Successful Scope Change?');
                console.log(templateArea.model);

                update.template(templateArea.model).success(function(data){

                })
            
            }

            addHeader = function() {
                var index = _.size(templateArea.model.structure);
                templateArea.model.structure.push({
                    order: index,
                    template: "<template-objects-header></template-objects-header>",
                    title: "New Header Yeah!"
                })
            }

            // Main Area

            $( ".template-area" ).droppable({
                accept: ".template-object",
                drop: function( event, ui ) {

                    // Add Header
                    $scope.$apply(addHeader());

                    // Add Sub-Header
                    $scope.$apply(addSubHeader());

                    // Add Bar Graph
                    $scope.$apply(addSubHeader());

                    // Add Pie Graph
                    $scope.$apply(addSubHeader());

                    templateArea.updateTemplate();

                }
            });

            // Left Menu

            $( ".template-object" ).draggable({
                helper: "clone",
                zIndex: 100
            });

            // Right Menu

            $( ".template-data-object" ).draggable({
                helper: "clone",
                zIndex: 100
            });

            // Array to object
            function toObject(arr) {
                var rv = {};
                for (var i = 0; i < arr.length; ++i)
                    if (arr[i] !== undefined) rv[i] = arr[i];
                return rv;
            }

            // Main Area

            $( ".template-area" ).sortable({
                handle: ".drag",
                helper: "clone",
                forceHelperSize: true,
                forcePlaceholderSize: true,
                items: ".area-object",
                revert: true,
                axis: "y",
                tolerance: "pointer",
                update: function( event, ui ) { 
                    // Update the Model Order
                    _.each($('.area-object'), function (o, i) {

                        // Loops though object in current DOM order

                        // Find objects original order
                        var originalOrder = $(o).data().order;

                        // Find this DOM object in the array and make it's new order the index
                        templateArea.model.structure[originalOrder].order = i;
                        
                    })

                    // Re-order the structure by it's new order so it is ordered correctly in the database
                    templateArea.model.structure = toObject(_.orderBy(templateArea.model.structure, ['order'], ['asc']));
                    templateArea.updateTemplate();
                }
            });
            
            // Example Model 

            var model = {
                0: {
                    template:'<template-objects-header ng-model="object"></template-objects-header>',
                    title:'Best Header Yet',
                    order: 1
                },
                1: {
                    template:'<template-objects-subheader ng-model="object"></template-objects-subheader>',
                    title:'Best Sub Header Yet',
                    order: 2
                },
                2: {
                    template:'<template-objects-bar ng-model="object"></template-objects-bar>',
                    title:'Sales Per Quarter',
                    x: { name: 'DATE', color: 'default'},
                    y: { name: 'DATA 1', color: 'A'},
                    series:[
                        {
                            name:'DATA 7',
                            color:'G'
                        },
                        {
                            name:'DATA 2',
                            color:'B'
                        },
                        {
                            name:'DATA 3',
                            color:'C'
                        }
                    ],
                    order: 3
                },
                3:  {
                    template:'<template-objects-bar ng-model="object"></template-objects-bar>',
                    title:'Sales Per Annum',
                    x: { name: 'DATE', color: 'default'},
                    y: { name: 'DATA 4', color: 'D'},
                    series:[
                        {
                            name:'DATA 3',
                            color:'C'
                        },
                        {
                            name:'DATA 4',
                            color:'D'
                        },
                        {
                            name:'DATA 5',
                            color:'E'
                        },
                        {
                            name:'DATA 1',
                            color:'A'
                        }
                    ],
                    order: 4
                }
            };

            // console.log(JSON.stringify(model));

		}
		
    	
    }]);
  
})();