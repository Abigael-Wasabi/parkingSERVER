const Sequelize= require('sequelize');
const sequelize= require ('../config/db');
const ParkingSlot = require('./parkSlot');
// const Car = require('./car');


const User = sequelize.define('User', {
  userID: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  lastname: { 
    type:Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type:Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false, 
  },
});

User.belongsTo(ParkingSlot,{foreignKey:'parkingSlotID'});
// Car.belongsTo(User,{foreignKey:'carID'});

module.exports = User;