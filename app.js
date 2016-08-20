// 
// To start:
// Navigate to the projects folder using command line/terminal
// Type "gulp",
// Dashchimp will run on port:8000
// In your browser go to localhost:8000 
// 


// Get the dependencies

var express = require('express'),
        pg = require('pg'),
        path = require('path'),
        bodyParser = require('body-parser');

// Connect to the database


var connectionString = "pg://localhost:5432/dashchimp",
	db = new pg.Client(connectionString); 

db.connect(function(err,win) {
	// console.log('Connected to:',win.connectionParameters);
  if(err) {
    return console.error('could not connect to dashchimp local database', err);
  }
});

// New instance of Express Dashchimp

var app = express();

// Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; 

// Express is listening on port 3000

app.listen(port, function() {
	console.log('Dashchimp is running on PORT' + port);
})

// Routes

var router = express.Router();

// Set the API address
	
app.use('/api', router);

// GET /style.css etc
app.use(express.static(__dirname + '/public'));

// The root of the site, get the index.html file for the angular app 
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Read The Template

router.route('/template')
	.get(function(req, res) {

                console.log("/template");
		
                var query = db.query("SELECT * FROM template");
                
                query.on("row", function (row, result) {
                result.addRow(row);
                })
                
                query.on("end", function (result) {
                res.json(result.rows, null, "    ");
                })

        })

// Update The Template

router.route('/template/update')
        .put(function(req, res){
                
                console.log("/template/update");
                
                // Get data from http request
                var data = {
                        id: req.body.id,
                        user_id: req.body.user_id, 
                        structure: req.body.structure
                        };

                        console.log(data);
                
                // SQL Query > Update Data
                db.query("UPDATE template SET structure = $1 WHERE id = $2", 
                [data.structure, data.id], 
                function(err, result) {
                        console.log(err);
                        console.log(result);
                        res.json(result.rows, null, "    ");
                }
                );


        });