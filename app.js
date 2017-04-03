'use strict';

/*
 * Dependencies
 */

const express = require('express');
const config = require('./config');
const location = require('./routes/location');
const app = express();
const bodyParser = require('body-parser');

/*
 * Request presets
 */

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({
	extended: true
}));               

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

/*
 * Requests
 */

app.route('/location')
	.get(location.getLocations)
	.post(location.postLocation);
app.route('/location/:id')
	.get(location.getLocation)
	.delete(location.deleteLocation)
	.put(location.updateLocation);

app.get('/', (req, res) => res.json({
	message: 'Welcome to our LocationStore!'
}));

/*
 * Port
 */

app.listen(config.get('server:port') || 3000);