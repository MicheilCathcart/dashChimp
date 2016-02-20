var express = require('express'),
	path = require('path');


// 
// To start:
// Navigate to the projects folder using command line/terminal, in this case Dashchimp
// Type "gulp"
// Dashchimp will run on port:8000
// In your browser go to localhost:8000 
// 

var app = express();

var port = process.env.PORT || 3000; 


app.listen(port, function(){
	console.log('Dashchimp is running on port:' + port);
})

// GET /style.css etc
app.use(express.static(__dirname + '/public'));

// The root of the site, get the index.html file for the angular app 
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(function(req, res) {
    res.sendFile(__dirname + '/Public/index.html');
});