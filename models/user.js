'use strict';

/*
 * Dependencies
 */

const mongoose = require('../lib/mongoose');
const crypto = require('crypto');

/*
 * Model body
 */

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now()
	}
});

// Storing password encrypted
UserSchema.methods.encryptedPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

// For second password field
UserSchema.virtual('passwordConfirmation')
	.get(function() {
		return this._passwordConfirmation;
	})
	.set(function(value) {
		this._passwordConfirmation = value;
	});

// Emulating password value
UserSchema.virtual('password')
	.get(() => {
		return this._plainPassword;
	})
	.set(function(password) {
		this._plainPassword = password;
		this.salt = String(Math.random());
		this.hashedPassword = this.encryptedPassword(password);
	});

// Pass validation
UserSchema.path('hashedPassword')
	.validate(() => {
		if (this._plainPassword || this._passwordConfirmation) {
			if (this._plainPassword.length < 6) {
				this.invalidate('password', 'must be at least 6 characters.');
			}
			if (this._plainPassword !== this._passwordConfirmation) {
				this.invalidate('passwordConfirmation', 'must match confirmation.');
			}
		}

		if (this.isNew && !this._plainPassword) {
			this.invalidate('password', 'required');
		}
	}, null);

// Checking password method
UserSchema.methods.checkPassword = function(password) {
	return this.encryptedPassword(password) === this.hashedPassword;
}

module.exports = mongoose.model('User', UserSchema);