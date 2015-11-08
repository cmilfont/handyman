'use strict';
module.exports = function(sequelize, DataTypes) {
  var Handyman = sequelize.define('Handyman', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Handyman.hasMany(models.Rating);
      }
    }
  });
  return Handyman;
};
