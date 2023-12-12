const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const adminConfig = require('../config/admin');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    if (email === adminConfig.adminEmail && password === adminConfig.adminPassword) {
      res.json({ message: 'Admin login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['firstname', 'lastname', 'email'] });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const blockUser = async (req, res) => {
  try{
    if (User.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      User.blocked = true;
      await User.save();
      return res.json({ message: 'User blocked successfully' });
    }
    return res.status(400).json({ error: 'User not eligible for blocking' });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const adjustWorkingHours = async (req, res) => {
  try{
    const {minTime, maxTime} = req.body;
    await ParkingSlot.update({
      minTime,maxTime}, {
      where: {minTime:'0500hrs', maxTime:'2300hrs'},
    });
  return res.json({ message: 'Working hours adjusted successfully' });
} catch (error) {
  console.error('Error adjusting working hours:', error);
  res.status(500).json({ error: 'Server Error' });
}
};

const managePayment = async (req, res) => {
  try{
    const unpaid = await Car.findAll({
      where: { paymentStatus: 'unpaid' },
      attributes: ['id', 'userID', 'paymentStatus'],
    });

    res.json(unpaid);
  } catch (error) {
    console.error('Error fetching payment info:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {getUsers, blockUser,  adjustWorkingHours , managePayment, adminLogin };
