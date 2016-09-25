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

                            /*
                            workbook.SheetNames.forEach(function (sheetName) {
                                // Get headers.
                                var headers = [];
                                var sheet = workbook.Sheets[sheetName];
                                var range = XLSX.utils.decode_range(sheet['!ref']);
                                var C, R = range.s.r;
                                /* start in the first row */
                                /* walk every column in the range */
                                /*
                                for (C = range.s.c; C <= range.e.c; ++C) {
                                    var cell = sheet[XLSX.utils.encode_cell({c: C, r: R})];
                                    /* find the cell in the first row */
                                    /*
                                    var hdr = 'No Value' + C; // <-- replace with your desired default
                                    if (cell && cell.t) {
                                        hdr = XLSX.utils.format_cell(cell);
                                    }
                                    headers.push(hdr);
                                }
                                // For each sheets, convert to json.
                                var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                                if (roa.length > 0) {
                                    roa.forEach(function (row) {
                                        // Set empty cell to ''.
                                        headers.forEach(function (hd) {
                                            if (row[hd] == undefined) {
                                                row[hd] = '';
                                            }
                                        });
                                    });
                                }

                                console.log(roa);

                            });*/

                            
                            var jsonData = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);

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