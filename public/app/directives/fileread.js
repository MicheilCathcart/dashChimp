(function() {

    var module = angular.module('app.dashboard');

    module.directive('fileRead', function() {
	    
		return {
			restrict: 'A',
            scope: {},
            controllerAs: 'ctrl',
            bindToController: {
                onUpload: '&'
            },
            controller: controller,
            link: link
		}

        function controller () {

            var ctrl = this;

            ctrl.upload = function(spreadsheet) {
                ctrl.onUpload({data: spreadsheet});
            };

        }

        function link (scope, element, attr, ctrl) {

            function isValidDate(date) {

                var dateFormats = [
                    'DD/MM/YYYY h:mma',
                    'DD/MM/YY'
                    ];

                var valid = _.each(function(format) {
                    var check = moment(date, format, true).isValid();
                    if (check) return true;
                })

                return valid ? true : false;

            }
            
            element.on('change', function (changeEvent) {

                    var reader = new FileReader();
                    
                    reader.onload =function (event) {

                            var data = event.target.result;
                            
                            var workbook = XLSX.read(data, {type: 'binary', cellDates: true});
                            
                            var headerNames = XLSX.utils.sheet_to_json(
                                                workbook.Sheets[workbook.SheetNames[0]],
                                                { header: 1 }
                                            )[0];
                            
                            var jsonData = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 , raw: true});

                            var dates = [];

                            _.each(jsonData[1], function(o,i) {
                                var isDate = isValidDate(o);
                                console.log(o);
                                if (isDate) dates.push(headerNames[i]);
                            });

                            var spreadsheet = {
                                dates: dates,
                                headers: headerNames,
                                data: jsonData
                            }

                            ctrl.upload(spreadsheet);
                            
                            element.val(null);

                    };
                    
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });


        }	
    	
    });
  
})();