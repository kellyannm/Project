'use strict'
var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger');
module.exports = function (app, config) {
	app.use('/api', router);
    router.route(/users/login).post((req, res, next) => {
         logger.log('info', '%s logging in', req.body.email);
        var email = req.body.email
        var password = req.body.password;
        var obj = {'email' : email, 'password' : password};
      res.status(201).json(obj);
  });
};
var mongoose = require("mongoose"),
	User = require('../app/models/users');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);
describe('User', () => {
	beforeEach((done) => { 
		User.remove({}, (err) => {
			done();
		});
	});
	//Insert user tests here
});
it('it should POST a user', (done) => {
  var user = {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "woo@hoo.com",
    "password": "pass"
  }
  chai.request(server)
    .post('/api/users')
    .send(user)
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.have.property('firstName');
      res.body.firstName.should.be.a('string');
      res.body.firstName.should.equal('Jane');
      done();
    });
});
app.use(function (err, req, res, next) {
	if(process.env.NODE_ENV !== 'test') {
		console.error(err.stack);
	}
	res.type('text/plan');
	res.status(500);
	res.send('500 Sever Error');
});

