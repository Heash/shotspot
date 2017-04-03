'use strict';

const Winston = require('winston');

const logger = function(path) {

	const transports = [
		new Winston.transports.Console({
			timestamp: true,
			colorize: true,
			level: 'error'
		}),

		new Winston.transports.File({
			filename: global.config.get('log:path') || '/var/log/shotspot.log',
			level: 'debug'
		})
	];

	return new Winston.Logger({
		transports: transports
	});
}

module.exports = function(module) {
	return logger(module.filename);
}