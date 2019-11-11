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
