'use strict';

/*
 * Dependencies
 */

const log = require('../lib/log');
const Location = require('../models/location');

/**
 * Route source.
 */

class LocationRoute {

	handleError(res, reason, message, code = 500) {
		/*
		 * Logging error and responsing to user
		 */
		log.error(reason);
		res.status(code)
			.json({
				error: message
			});
	}

	postLocation(req, res) {
		const newLocation = new Location(req.body);
		newLocation.save((error, location) => {
			if (error) this.handleError(res, error.message, 'Something wrong while post location');
			res.status(201)
				.json({
					message: 'Location successfully added!', location
				});
		});
	}
	
	getLocations(req, res) {
		Location
			.find({})
			.exec((error, locations) => {
				if (error) this.handleError(res, error.message, 'Something wrong while get locations');
				res.json(locations);
			});
	}

	getLocation(req, res) {
		Location.findById(req.params.id, (error, location) => {
			if (error) this.handleError(res, error.message, 'Something wrong while get location');
			res.json(location);
		});
	}

	deleteLocation(req, res) {
		Location.remove({_id : req.params.id}, error => {
			if (error) this.handleError(res, error.message, 'Something wrong while delete location');
			res.json({
				message: 'Location successfully deleted!'
			});
		});
	}

	updateLocation(req, res) {
		// updateing location here
		Location.findById(req.params.id, (error, location) => {
			if (error) this.handleError(res, error.message, 'Something wrong while update location');

			location.set(req.body);
			location.save((err, updatedLocation) => {
				if (error) this.handleError(res, error.message, 'Something wrong while update location');
				res.send(updatedLocation);
			});
		});
	}
}


module.exports = new LocationRoute();