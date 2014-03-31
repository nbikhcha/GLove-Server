// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var timestamps;
var contacts = []

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send({key:"value"});
  res.end();
});


function timeFn(req, res) {
	console.log("time fn");
	res.header("Access-Control-Allow-Origin", "*");
	res.send( {hello:"yooyma"} );
	contacts.append(req.body.contact);
}; 

app.get('/time', timeFn);


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

