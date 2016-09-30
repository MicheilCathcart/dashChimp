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

                // A big list of acceptable date formats will need to be created

                var dateFormats = [
                    'DD/MM/YYYY h:mma', // "14/01/2010, 3:25:50pm"
                    'M/DD/YY', // "1/01/10"
                    'DD/MM/YY', // "14/01/10"
                    'D/MM/YY', // "1/03/10"
                    "dddd, MMMM Do YYYY, h:mm:ss a",  // "Sunday, February 14th 2010, 3:25:50 pm"
                    "dddd, D MMMM YYYY" // "Sunday, February 14th 2010"
                    ];

                if (moment(date, 'DD/MM/YYYY h:mma', true).isValid()) { return { valid: true, format: 'DD/MM/YYYY h:mma'}; }
                else if (moment(date, 'M/DD/YY', true).isValid()) { return { valid: true, format: 'M/DD/YY'}; }
                else if (moment(date, 'DD/MM/YY', true).isValid()) { return { valid: true, format: 'DD/MM/YY'}; }
                else if (moment(date, 'DD/MM/YY', true).isValid()) { return { valid: true, format: 'DD/MM/YY'}; }
                else if (moment(date, 'D/MM/YY', true).isValid()) { return { valid: true, format: 'D/MM/YY'}; }
                else if (moment(date, "dddd, MMMM Do YYYY, h:mm:ss a", true).isValid()) { return { valid: true, format: "dddd, MMMM Do YYYY, h:mm:ss a"}; }
                else if (moment(date, "dddd, D MMMM YYYY", true).isValid()) { return { valid: true, format: "dddd, D MMMM YYYY"}; }
                else return { valid: false };

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

                            var headerNames = XLSX.utils.sheet_to_json(
                                workbook.Sheets[workbook.SheetNames[0]],
                                { header: 1 }
                              )[0];

                            var headers = [];

                            // Check the header row to get Header Names and Types
                            _.each(jsonData[1], function(cell,i) {

                                var type;

                                // Check whether is is a number

                                if (!(isNaN(cell))) {

                                    type = 'Number'

                                } else {

                                type = 'String'

                                    var isDate = (isValidDate(cell));

                                    // Check whether is is a date
                                    if (isDate.valid) type = 'Date';

                                    // Check whether is is a percentage
                                    if (isPercentage(cell)) type = 'Percentage';

                                    // Check whether is is a currency
                                    if (isCurrency(cell)) type = 'Currency';

                                }

                                if ( type === 'Date') {
                                    headers.push({ name: i, type: type, format: isDate.format })
                                } else {
                                    headers.push({ name: i, type: type})
                                }
                                

                            });

                            

                            _.each(headers, function(header, index) {
                                if (header.type === "Currency" || header.type === "Number") {
                                    _.each(jsonData, function(row) { 
                                        row[header.name] = Number(row[header.name].replace(/[^0-9\.]+/g,""));
                                    })
                                }
                                if (header.type === "Percentage") {
                                    _.each(jsonData, function(row) { 
                                        row[header.name] = Number(row[header.name].replace(/[^0-9\.]+/g,"")) / 100;
                                    })
                                }
                                if (header.type === "Date") {
                                    _.each(jsonData, function(row) { 
                                        row[header.name] = moment(row[header.name], header.format);
                                    })
                                }
                            })

                            var spreadsheet = {
                                dates: _.filter(headers, function(o) { return o.type == 'Date' }),
                                headers: headers,
                                data: jsonData
                            }

                            console.log('jsonData');
                            console.log(jsonData);


                            // Upload the Spreadsheet Data
                            ctrl.upload(spreadsheet);
                            
                            element.val(null);

                    };
                    
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });


        }	
    	
    });
  
})();