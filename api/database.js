var mongoose = require('mongoose');

module.exports = function() {
  
  var connectionUrl = process.env.MONGO_URL ||  "mongodb://localhost:27017/handyman";
  
  if ( connectionUrl ) {

    global.database = mongoose.createConnection(connectionUrl, {
      keepAlive: 1, autoReconnect: true, reconnectTries: 30
    });

    database.on('connected', function() {
      
      global.SkillRecord = database.model('skillRecord', new mongoose.Schema({
        name: {
          required: true,
          notEmpty: true,
          type: String
        },
        createdAt: { type: Date, default: Date.now }
      }), 'skillRecord');

      global.UserRecord = database.model('userRecord', new mongoose.Schema({
        email: { type: String, index: { unique: true } },
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
          type: String,
          index: { unique: true }
        },
        names: [{
          required: true,
          notEmpty: true,
          type: String
        }],
        skills: [
          { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'SkillRecord'
          }
        ],
        createdAt: { type: Date, default: Date.now }
      }), 'handymanRecord');
      
      global.RatingRecord = database.model('ratingRecord', new mongoose.Schema({
        
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        recommended: { type: Boolean, default: true },
        description: String,
        handyman  : { type: mongoose.Schema.Types.ObjectId, ref: 'HandymanRecord' },
        user  : { type: mongoose.Schema.Types.ObjectId, ref: 'UserRecord' }
        
      }), 'ratingRecord');

    });

  }
  
};

/*

require( './api/database.js' )();

s1 = new SkillRecord({ name: "pedreiro" });
s2 = new SkillRecord({ name: "jardineiro" });
s3 = new SkillRecord({ name: "torneiro" });
s4 = new SkillRecord({ name: "entregador" });
s5 = new SkillRecord({ name: "eletricista" });
s6 = new SkillRecord({ name: "pintor" });

s1.save();
s2.save();
s3.save();
s4.save();
s5.save();
s6.save();

h1 = new HandymanRecord({phone: "55085981063769", skills: [ s1.id, s2.id, s3.id ], names: ["Christiano", "Milfont"]})
h2 = new HandymanRecord({phone: "55085981063768", skills: [ s2.id, s4.id, s6.id ], names: ["Renata", "Consultora"]})
h3 = new HandymanRecord({phone: "55085999752364", skills: [ s4.id, s5.id, s6.id ], names: ["Negão", "Pedroca"]})

h1.save();
h2.save();
h3.save();

u1 = new UserRecord({email: "regis@greenmile.com", name: "Regis Melo" })
u2 = new UserRecord({email: "cmilfont@milfont.org", name: "Christiano Milfont" })
u3 = new UserRecord({email: "c@milfont.org", name: "Christiano Milfont" })

u1.save();
u2.save();
u3.save();

(new RatingRecord({recommended: true, description: "Show de bola", handyman: h1._id, user: u1.id })).save();
(new RatingRecord({recommended: true, description: "deu Show aqui", handyman: h1._id, user: u2.id })).save();
(new RatingRecord({recommended: false, description: "mó paia", handyman: h1._id, user: u3.id })).save();

*/