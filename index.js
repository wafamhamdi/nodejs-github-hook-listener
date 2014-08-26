var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var exec = require('child_process').exec;

if (process.env.GIT_PATH === undefined || process.env.GIT_BRANCH === undefined) {
	throw new Error('GIT_PATH and GIT_BRANCH should be defined');
}

app.use(logger('dev'));
app.use(bodyParser.json());

app.post("/", function(req, res) {
	console.log(req.body, req.headers);
	var command = exec("cd " + process.env.GIT_PATH + "; git pull --rebase " + process.env.GIT_BRANCH , function (error, stdout, stderr) {
		console.log(arguments);
		res.send({ response: true });
	});
});

app.listen(3000, function() {
	console.log("Server listening");
});
