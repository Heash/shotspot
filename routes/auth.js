'use strict';

/*
 * Dependencies
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


class AuthRoute {
	constructor() {

		// Passport configuration
		passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		}, (email, password, done) => {

			const query = {
				email
			};

			User.findOne(query, (error, user) => {
				if (error) return done(error);
				if (!user) return done(null, false, {
					message: 'Incorrect username.'
				});
				
				if (user.checkPassword(password)) {
					return done(null, user);
				} else {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}
			});
		}));
	}

	// Login method
	login(req, res, next) {
		passport.authenticate('local', (error, user) => {
			if (error) return next(error);
			if (user) return res.redirect('/login');
			req.logIn(user, error => {
				if (error) return next(error);
				res.redirect('/');
			});
		})(req, res, next);
	}

	// Register Method
	register(req, res, next) {
		const user = new User({
			email: req.body.email,
			password: req.body.password
		});
		user.save(error => {
			if (error) return next(error);
			req.logIn(user, error => {
				if (error) return next(error);
				res.redirect('/');
			});
		});
	}

	// Logout
	logout(req, res) {
		req.logout();
		res.redirect('/');
	}
}

exports = module.exports = new AuthRoute();