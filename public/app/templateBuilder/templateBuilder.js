(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateBuilder', ['$log','$compile','$timeout','read','update', function($log, $compile, $timeout, read, update) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/templateBuilder/templateBuilder.html',
            replace:true,
            controllerAs: 'templateBuilder',
            bindToController: true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            var templateBuilder = this;

            // Array to object
            function toObject(arr) {
                var rv = {};
                for (var i = 0; i < arr.length; ++i)
                    if (arr[i] !== undefined) rv[i] = arr[i];
                return rv;
            }

            templateBuilder.title = 'New Template Structure';

            // Read the Template
            
            templateBuilder.readTemplate = function () {

                read.template().success(function(data){

                    templateBuilder.model = data[0];

                    // Order Template Before Render
                    templateBuilder.model.structure = toObject(_.orderBy(templateBuilder.model.structure, ['order'], ['asc'])); 

                })
            
            }

            templateBuilder.readTemplate();

            // Update the Template
            
            templateBuilder.updateTemplate = function () {

                console.log('Successful Scope Change?');
                console.log(templateBuilder.model);

                update.template(templateBuilder.model).success(function(data){

                })
            
            }


            // Add Header
            addHeader = function() {
                var index = _.size(templateBuilder.model.structure);
                templateBuilder.model.structure[index] = {
                    order: index,
                    template: "<template-objects-header></template-objects-header>",
                    title: "New Header"
                }
            }

            // Add Sub Header
            addSubHeader = function() {
                var index = _.size(templateBuilder.model.structure);
                templateBuilder.model.structure[index] = {
                    order: index,
                    template: "<template-objects-subheader></template-objects-subheader>",
                    title: "This is a sub-header, it can also be used to output the result of a function (There will be COUNT(DATA 1) Sales this year)"
                }
            }

            // Add Bar Graph
            addBarGraph = function() {
                var index = _.size(templateBuilder.model.structure);
                templateBuilder.model.structure[index] = {
                    order: index,
                    series: [],
                    template: "<template-objects-bar></template-objects-bar>",
                    title: "Bar Graph Heading - Click to Edit",
                    x: {},
                    y: {}
                }
            }

            // Add Pie Graph
            addPieGraph = function() {
                var index = _.size(templateBuilder.model.structure);
                templateBuilder.model.structure[index] = {
                    order: index,
                    series: [],
                    template: "<template-objects-pie></template-objects-pie>",
                    title: "Pie Graph Heading - Click to Edit"
                }
            }

            // Delete from Template

            templateBuilder.deleteFromTemplate = function(item) {
                console.log('Delete From Template');
                console.log(templateBuilder.model.structure)
            }

            // Main Area

            $( ".template-area" ).droppable({
                accept: ".template-object",
                drop: function( event, ui ) {

                    var objectType = $(ui.helper).data().template;

                    switch (objectType) {
                        case "header":
                            console.log('Header');
                            $scope.$apply(addHeader());
                            break;
                        case "subheader":
                        console.log('sub');
                            $scope.$apply(addSubHeader());
                            break;
                        case "bargraph":
                        console.log('bar');
                            $scope.$apply(addBarGraph());
                            break;
                        case "piegraph":
                        console.log('pie');
                            // $scope.$apply(addPieGraph());
                    }

                    templateBuilder.updateTemplate();

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
                        templateBuilder.model.structure[originalOrder].order = i;
                        
                    })

                    // Re-order the structure by it's new order so it is ordered correctly in the database
                    templateBuilder.model.structure = toObject(_.orderBy(templateBuilder.model.structure, ['order'], ['asc']));
                    templateBuilder.updateTemplate();
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