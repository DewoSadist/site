'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT;

app.use(express.logger());
app.use(express.compress());

app.use(function (req, res, next) {
	if (/.*\.html/.test(req.path) || req.path === '/') {
		res.charset = 'utf-8';
	} else {
		res.setHeader('Cache-Control', 'max-age=31536000');
	}
	next();
});

app.use(express.static(__dirname + '/public'));
app.listen(port);