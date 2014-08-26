var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exec = require('child_process').exec;
var crypto = require('crypto');
var app = express();

if (process.env.GIT_PATH === undefined || process.env.GIT_BRANCH === undefined) {
	throw new Error('GIT_PATH and GIT_BRANCH should be defined');
}

app.use(logger('dev'));
app.use(bodyParser.json());

var verifySignature = function (req, res, next) {
    var secret = process.env.GIT_SECRET_TOKEN;
    var hash = crypto.createHmac('sha1', secret).update(JSON.stringify(req.body)).digest('hex');
    var signature = 'sha1=' + hash;

    if (req.headers['x-hub-signature'] !== signature) {
        throw new Error('Signature didn\'t match!');
    }

    next();
};

var executeUpdate = function (req, res, next) {
    var command = exec('cd ' + process.env.GIT_PATH + '; git pull --rebase ' + process.env.GIT_BRANCH , function (error, stdout, stderr) {
        console.log(stdout);
        next();
    });
};

app.post('/', verifySignature, executeUpdate, function (req, res) {
    res.send({ response: true });
});

app.listen(3000, function() {
	console.log('Server listening');
});
