'use strict';

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const Location = require('../models/location');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
// const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('Locations', () => {
	before(done => {
		// Before each test we empty the database
		Location.remove({}, err => done());
	});

	let location = {
		name: 'DNIPRO',
		coordinates: {
			longitude: 11.222,
			latitude: 12.222
		}
	};
	
	describe('/GET location', () => {
		it('it should GET all the locations', done => {
			chai.request(app)
				.get('/location')
				.end((err, res) => {
					assert.propertyVal(res, 'status', 200);
					assert.isArray(res.body);
					assert.equal(res.body.length, 0);
					done();
				});
		});
	});
	
	describe('/POST location', () => {
		it('it should POST new location', done => {
			chai.request(app)
				.post('/location')
				.send(location)
				.end((err, res) => {
					assert.propertyVal(res, 'status', 201);
					assert.isObject(res.body);
					assert.property(res.body, 'message');
					assert.property(res.body, 'location');

					location = res.body.location;
					done();
				});
		});
	});

	describe('/GET/:id location', () => {
		it('it should GET one location', done => {
			chai.request(app)
				.get(`/location/${location._id}`)
				.end((err, res) => {
					assert.propertyVal(res, 'status', 200);
					assert.isObject(res.body);
					assert.propertyVal(res.body, 'name', location.name);
					assert.deepPropertyVal(res.body, 'coordinates', location.coordinates);
					done();
				});
		});
	});

	describe('/DELETE/:id location', () => {
		location.name = 'Updated name';
		it('it should Delete a location', done => {
			chai.request(app)
				.delete(`/location/${location._id}`)
				.end((err, res) => {
					assert.isObject(res.body);
					assert.property(res.body, 'message');
					done();
				});
		});
	});

});