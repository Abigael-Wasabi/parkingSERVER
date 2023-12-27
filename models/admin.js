const {Sequelize,DataTypes}= require('sequelize');
const sequelize= require ('../config/db');

const Admin = sequelize.define('Admin', {
  adminID: {
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

module.exports = Admin;