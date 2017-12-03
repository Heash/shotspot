'use strict';

/*
 * Dependencies
 */

const express = require('express');
const config = require('./config');
const location = require('./routes/location');
const auth = require('./routes/auth');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

/*
 * Express conf
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

/**
 * Requests
 */

// auth
app.route('/login')
	.post(auth.login);
app.route('/register')
	.post(auth.register);
app.route('/logout')
	.get(auth.logout);
// locations
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

/**
 * Port
 */

app.listen(config.get('server:port') || 3000);

/**
 * Export
 */

module.exports = app;