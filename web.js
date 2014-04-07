// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var timestamps;
var contacts = []

app.use(logfmt.requestLogger());

app.post('/', function(req, res) {
  res.send({key:"value"});
  res.end();
});


function timeFn(req, res) {
	console.log("time fn");
	res.header("Access-Control-Allow-Origin", "*");
	console.log(req.params);
	contacts.append(req.param);
	setTimeout(function() { contactFn(res); }, 1000);
}; 

function contactFn(res) {
	var id = res.body.id;
	for (var i = 0; i < contacts.length; i++) {
		if(contacts[i].id !== res.body.id) {
			res.send(contacts[i]);
		}
	}
	res.send({msg: "Could not find Object",
			  dataArr: contacts});
}
app.all('/time', timeFn);


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

