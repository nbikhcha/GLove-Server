// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var timestamps = [];
var contacts = [];
var HANDSHAKETIMEOUT = 1000;
var shouldSendOtherContact = false;

app.use(logfmt.requestLogger());

app.post('/', function(req, res) {
  res.send({key:"value"});
  res.end();
});


function timeFn(req, res) {
	console.log("contacts");
	console.log(contacts);
	console.log("req");
	console.log(req.query);
	
	res.header("Access-Control-Allow-Origin", "*");
	contacts.push(req.query);
	timestamps.push((new Date()).getTime());

	setTimeout(function() {
		console.log("calling set timeout");
		contactFn(res, contacts.length-1);
	}, HANDSHAKETIMEOUT);
};

function contactFn(res) {
	/*var id = res.body.id;
	for (var i = 0; i < contacts.length; i++) {
		if(contacts[i].id !== res.body.id) {
			res.send(contacts[i]);
		}
	}*/
	// when popping you get the more recent time, so have to mulitply by -1
	var withinTimeout = timestamps.length == 2 && -1 * (timestamps.pop() - timestamps.pop()) < HANDSHAKETIMEOUT;
	if (shouldSendOtherContact || withinTimeout) {
		if (withinTimeout) {
			shouldSendOtherContact = true;
		} else {
			shouldSendOtherContact = false;
		}
		// Successful handshake. Send the contact info
		console.log("Successful match. sending info");
		// want to send the other persons contact to the person 
		res.send(contacts.pop());
	} else {
		res.send({msg: "Could not find Object",
		  dataArr: contacts});
		contacts = [];
		timestamps = [];
	}
	lastContactReceived = 0;
}
app.all('/time', timeFn);

function pushDummyData() {
	contacts.push({name:"NAME_ON_SERVER", number:"0000000000"});
}

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});

