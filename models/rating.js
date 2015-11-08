'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define('Rating', {
    recommend: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Rating.belogsTo(models.Handyman);
      }
    }
  });
  return Rating;
};
