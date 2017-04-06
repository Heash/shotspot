'use strict';

/*
 * Dependencies
 */

const passport = require('passport');
const log = require('../lib/log');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


class AuthRoute {
	constructor(args) {

		// Passport configuration
		passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		}, (email, password, done) => {

			const query = {
				email
			}

			User.findOne(query, (err, user) => {
				return err 
					? done(err)
					: user
						// checking pass with user method
						? user.checkPassword(password)
							? done(null, user)
							: done(null, false, {
								message: 'Incorrect password.'
							})
						: done(null, false, {
							message: 'Incorrect username.'
						});
			});
		}));
	}

	// Login method
	login(req, res, next) {
		passport.authenticate('local', (error, user, info) => {
			return error 
				? next(error)
				: user
					? req.logIn(user, (error) => {
							return error
								? next(error)
								: res.redirect('/');
						})
					: res.redirect('/login');
		})(req, res, next);
	}

	// Register Method
	register(req, res, next) {
		const user = new User({
			email: req.body.email,
			password: req.body.password
		});
		user.save(function(err) {
			return err
				? next(err)
				: req.logIn(user, function(err) {
					return err
						? next(err)
						: res.redirect('/');
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