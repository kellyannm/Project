var express = require('express');

module.exports = function (app, config) {

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

  app.use(morgan('dev'));
  
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
