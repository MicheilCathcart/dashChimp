(function() {

    var module = angular.module('app.dashboard');

    module.directive('templateArea', ['$log','$compile','$timeout','read', function($log, $compile, $timeout, read) {
	    
		return {
			restrict: 'E',
			templateUrl: 'app/template/area/area.html',
            replace:true,
			controller: controller
		}
		
		function controller ($scope, $element) {

            // Read the Template
            
            var readTemplate = function () {

                read.template().success(function(data){

                    $scope.model = data[0].structure;

                    // Order Template Before Render
                    $scope.template = _.orderBy($scope.model, ['order'], ['asc']) 

                })
            
            }

            readTemplate();

            // Update the Template
            
            var updateTemplate = function () {

                update.template().success(function(data){

                    $scope.model = data[0].structure;

                    // Order Template Before Render
                    $scope.template = _.orderBy($scope.model, ['order'], ['asc']) 

                })
            
            }

            // Left Menu

            $( ".template-object" ).draggable({
                helper: "clone",
                zIndex: 100
            });

            $( ".template-area" ).droppable({
                accept: ".template-object",
                drop: function( event, ui ) {

                var target = $(event.target);
                var template = ui.helper[0].dataset.template;
                var el = $compile(template)($scope);
                target.append(el[0]);
                }
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
                items: ".template-objects",
                revert: true,
                axis: "y",
                tolerance: "pointer",
                update: function( event, ui ) { console.log('Updating'); }
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