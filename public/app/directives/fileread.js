// I have added the below update to xlsx.full.min.js in the sheet_to_json function
// until this becomes available as an argument
// https://github.com/SheetJS/js-xlsx/issues/159
// {row[hdr[C]] = "";continue;}

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
                    'M/DD/YY',
                    'DD/MM/YY',
                    'D/MM/YY'
                    ];

                var valid = moment(date, dateFormats, true).isValid();

                return valid;

            }

            function isPercentage(cell) {

                if (cell) {
                    var percentage = cell.indexOf('%') !== -1;
                    return percentage;
                } else {
                    return false
                }

            }

            function isCurrency(cell) {

                if (cell) {
                    var currency = cell.indexOf('$') !== -1;
                    return currency;
                } else {
                    return false
                }

            }
            
            element.on('change', function (changeEvent) {

                    var reader = new FileReader();
                    
                    reader.onload =function (event) {

                            

                            var data = event.target.result;
                            
                            var workbook = XLSX.read(data, {type: 'binary', cellDates: true});

                            
                            var jsonData = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { blankValue: null});

                            console.log(jsonData);

                            var headerNames = XLSX.utils.sheet_to_json(
                                workbook.Sheets[workbook.SheetNames[0]],
                                { header: 1 }
                              )[0];

                              console.log(workbook);

                            var headers = [];

                            // Check the header row to get Header Names and Types
                            _.each(jsonData[1], function(cell,i) {

                                var type;

                                // Check whether is is a number

                                if (!(isNaN(cell))) {

                                    type = 'Number'

                                } else {

                                type = 'String'

                                    // Check whether is is a date
                                    if (isValidDate(cell)) type = 'Date';

                                    // Check whether is is a percentage
                                    if (isPercentage(cell)) type = 'Percentage';

                                    // Check whether is is a currency
                                    if (isCurrency(cell)) type = 'Currency';

                                }

                                headers.push({ name: i, type: type})

                            });
                            
                            // Post processing loop to create empty cells 
                            /*for(var i = 0; i != jsonData.length; ++i) {
                                for(var j = 0; j != jsonData[i].length; ++j) {
                                    if(typeof jsonData[i][j] === 'undefined') jsonData[i][j] = "";
                                }
                            }*/

                            var spreadsheet = {
                                dates: _.filter(headers, function(o) { return o.type == 'Date' }),
                                headers: headers,
                                data: jsonData
                            }

                            // Upload the Spreadsheet Data
                            ctrl.upload(spreadsheet);
                            
                            element.val(null);

                    };
                    
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });


        }	
    	
    });
  
})();