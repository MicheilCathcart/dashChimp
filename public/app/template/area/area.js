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
                    templateArea.template = _.orderBy(templateArea.model.structure, ['order'], ['asc']) 

                    // The same function is called both times.
                    templateArea.addHeader = function (object) {
                        // var index = _.size(templateArea.model.structure);
                        object.template.push({
                            order: 5,
                            template: "<template-objects-header></template-objects-header>",
                            title: "New Header"
                        })
                        console.log('Template');
                        console.log(object);
                    }

                    // This seems to create another version of the controller and updates that? 
                    $( ".template-area" ).droppable({
                        accept: ".template-object",
                        drop: function( event, ui ) {
                            //var target = $(event.target);
                            //var template = ui.helper[0].dataset.template;
                            //var el = $compile(template)($scope);
                            //target.append(el[0]);
                            templateArea.addHeader(templateArea);
                        }
                    });

                    // This works and updates the scope
                    templateArea.addHeader(templateArea);

                })
            
            }

            templateArea.readTemplate();

            // Update the Template
            
            templateArea.updateTemplate = function (model) {

                update.template(model).success(function(data){

                })
            
            }



            /*$scope.$watchCollection('templateArea.template',
                    function(newValue, oldValue ){
                        console.log('Watch Fired');
                        console.log(oldValue);
                        console.log(newValue);
                    });*/

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

            var fun = [{ number: 1 }];

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
                    templateArea.updateTemplate(templateArea.model);

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