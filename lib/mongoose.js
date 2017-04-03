'use strict';

const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
module.exports = mongoose;