'use strict';

/*
 * Dependencies
 */

const log = require('../lib/log');
const mongoose = require('mongoose');
const Location = require('../models/location');

/**
 * Route source.
 */

class LocationRoute {

	constructor() {

	}

	postLocation(req, res) {
		let newLocation = new Location(req.body);
		newLocation.save((error, location) => {
			let message;
			if(error) {
				log.error(error);
			}
			else {
				message = 'Location successfully added!', location;
			}
			res.json({
				error,
				message
			});
		});
	}
	
	getLocations(req, res) {
		Location
			.find({})
			.exec((error, locations) => {
				console.log(locations);
				if(error) log.error(error);
				res.json({
					error,
					locations
				});
			});
	}

	getLocation(req, res) {
		Location.findById(req.params.id, (error, location) => {
			if(error) log.error(error);
			res.json({
				error,
				location
			});
		});
	}

	deleteLocation(req, res) {
		Location.remove({_id : req.params.id}, (error, result) => {
			let message;
			if(error) {
				log.error(error);
			} else {
				message = 'Location successfully deleted!';
			}
			// if no errors - send to client
			res.json({
				error,
				message,
			});
		});
	}

	updateLocation(req, res) {
		
	}
}


exports = module.exports = new LocationRoute();