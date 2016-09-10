(function() {

    var module = angular.module('app.dashboard');

    module.directive('template', ['$log','$compile','$timeout','read','update', function($log, $compile, $timeout, read, update) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/template.html',
            replace:true,
            controllerAs: 'template',
            bindToController: true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            var template = this;

            // Array to object
            function toObject(arr) {
                var rv = {};
                for (var i = 0; i < arr.length; ++i)
                    if (arr[i] !== undefined) rv[i] = arr[i];
                return rv;
            }

            template.title = 'New Template Structure';

            // Read the Template
            
            template.readTemplate = function () {

                read.template().success(function(data){

                    template.model = data[0];

                    // Order Template Before Render
                    template.model.structure = toObject(_.orderBy(template.model.structure, ['order'], ['asc'])); 

                })
            
            }

            template.readTemplate();

            // Update the Template
            
            template.updateTemplate = function () {

                console.log('Successful Scope Change?');
                console.log(template.model);

                update.template(template.model).success(function(data){

                })
            
            }

            // Add Header
            addHeader = function() {
                var index = _.size(template.model.structure);
                template.model.structure[index] = {
                    order: index,
                    type: "Header",
                    title: "New Header"
                }
            }

            // Add Sub Header
            addSubHeader = function() {
                var index = _.size(template.model.structure);
                template.model.structure[index] = {
                    order: index,
                    type: "Sub Header",
                    title: "This is a sub-header, it can also be used to output the result of a function (There will be COUNT(DATA 1) Sales this year)"
                }
            }

            // Add Bar Graph
            addBarGraph = function() {
                var index = _.size(template.model.structure);
                template.model.structure[index] = {
                    order: index,
                    series: [],
                    type: "Bar Graph",
                    title: "Bar Graph Heading - Click to Edit",
                    x: {},
                    y: {}
                }
            }

            // Add Pie Graph
            addPieGraph = function() {
                var index = _.size(template.model.structure);
                template.model.structure[index] = {
                    order: index,
                    series: [],
                    type: "Pie Graph",
                    title: "Pie Graph Heading - Click to Edit"
                }
            }

            // Delete from Template

            template.deleteFromTemplate = function(templatePart) {

                // Delete templatePart from structure
                delete template.model.structure[templatePart.order];
                
                // Update the Database
                template.updateTemplate();
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

                    template.updateTemplate();

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
                        template.model.structure[originalOrder].order = i;
                        
                    })

                    // Re-order the structure by it's new order so it is ordered correctly in the database
                    template.model.structure = toObject(_.orderBy(template.model.structure, ['order'], ['asc']));
                    template.updateTemplate();
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