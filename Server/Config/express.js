const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

module.exports = function (app, config) {
  logger.log('info',"Loading Mongoose functionality");
    mongoose.Promise = require('bluebird');
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
      throw new Error('unable to connect to database at ' + config.db);
    });


  app.use('/api', router);

	router.route('/users').post((req, res, next) => {
		logger.log('info', 'Create user');
		 res.status(201).json({message: 'Created user'});

	});
};
{
  app.use(function (req, res, next) {
    console.log('Request from ' + req.connection.remoteAddress);
    next();
  });  
  app.use(express.static(config.root + '/public'));

  app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));

    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
  extended: true
  }));
   router.route('/users').get(function (req, res, next) {
            logger.log('info', 'Get all users');
            
            var users = [{ name: 'John', email: 'woo@hoo.com' },
            { name: 'Betty', email: 'loo@woo.com' },
            { name: 'Hal', email: 'boo@woo.com' }
            ];
           res.status(200).json(users);
        });
    
  app.use(bodyParser.json());
    require('../app/controllers/users')(app, config);
    app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });
    app.use(function (err, req, res, next) {
    logger.log('error','File not found: %s', req.url);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  var winston = require('winston');
  require('winston-daily-rotate-file');
  const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
  new (winston.transports.DailyRotateFile)({
  level: 'error',
  filename: 'log/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
  }),
  new (winston.transports.DailyRotateFile)({
  filename: 'log/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
  })
  
  ]
  });
   if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
    format: winston.format.combine(
             winston.format.splat(),
    winston.format.colorize(),
    winston.format.simple()
    )
    }));
    }
    module.exports = logger; 

  console.log("Starting application");

};
var models = fs.readdirSync('./app/models');
  models.forEach((model) => {
    require('../app/models/' + model);
  });
  var controllers = fs.readdirSync('./app/controllers');
  controllers.forEach((controller) => {
    controller = require('../app/controllers/' + controller)(app, config);
  });
