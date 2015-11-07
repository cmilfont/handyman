var mongoose = require('mongoose');

module.exports = function(tomcat) {
  
  var connectionUrl = process.env.MONGO_URL ||  "mongodb://localhost:27017/handyman";
  
  if ( connectionUrl ) {

    global.database = mongoose.createConnection(connectionUrl, {
      keepAlive: 1, autoReconnect: true, reconnectTries: 30
    });

    database.on('connected', function() {

      global.UserRecord = database.model('userRecord', new mongoose.Schema({
        email: String,
        name: String,
        phone: String,
        login: String,
        password: String,
        createdAt: { type: Date, default: Date.now }
      }), 'userRecord');
      
      global.HandymanRecord = database.model('handymanRecord', new mongoose.Schema({
        phone: {
          required: true,
          notEmpty: true,
          type: String
        },
        names: [{
          required: true,
          notEmpty: true,
          type: String
        }],
        createdAt: { type: Date, default: Date.now }
      }), 'handymanRecord');
      
      global.RatingRecord = database.model('ratingRecord', new mongoose.Schema({
        
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        recommended: Boolean,
        handyman  : { type: mongoose.Schema.Types.ObjectId, ref: 'HandymanRecord' },
        user  : { type: mongoose.Schema.Types.ObjectId, ref: 'userRecord' }
        
      }), 'ratingRecord');

    });

  }
  
};

/*

require( './api/database.js' )();
ze = new HandymanRecord({phone: "55085981063769", names: ["Christiano", "Milfont"]})
ze.save()

*/