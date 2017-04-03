'use strict';

// requirimg libs
const config = require('../config');
const mongoose = require('../lib/mongoose');

// mongoose

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now()
	},
	coordinates: {
		longitude: {
			type: String,
			required: true
		},
		latitude: {
			type: String,
			required: true
		}
	}
});

module.exports = mongoose.model('Location', LocationSchema);