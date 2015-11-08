'use strict';
module.exports = function(sequelize, DataTypes) {
  var Handyman = sequelize.define('Handyman', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Handyman;
};