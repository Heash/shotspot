'use strict';

const config = require('../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:uri'), {
    ...config.get('mongoose:options'),
    useMongoClient: true
});
module.exports = mongoose;