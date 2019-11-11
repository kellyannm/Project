var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development';

var config = {  
       development: {
              root: rootPath,
              app: {      name: 'Chirps'    },
              port: 5000,
              db: 'mongodb://127.0.0.1/chirps-dev',
              secret: "cayennedlikedhistreats"
            },
        production: {    
                     root: rootPath,    
                     app: {      name: 'UCCSS'    },    
                      port: 80,  
                     },

        test: {
                     root: rootPath,
                     app: {      name: 'UCCSS'    },  
                     port: 4000,
              }
                            
         };

module.exports = config[env];
