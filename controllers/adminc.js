const  user  = require('../models/user');
const slot = require('../models/parkSlot');
const car = require('../models/car');
const admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY; 
const adminConfig = require('../config/admin');

const adminSignUp = async (req, res, next) => {
  try{
    const existingAdminCount = await admin.count();
    if (existingAdminCount>0){
      return res.status(400).json({message:'Only one admin is allowed'});
    }
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All details must be filled.' });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({ message: 'Passwords do not match.' });
    }
    const existingAdmin = await admin.findOne({ where: { email: email } });
    if (existingAdmin) {
      return res.status(400).json({ message:'signup is only done once'});
    }
 //!the password salt should be 10 when 20 it will take a long time to hash the password */
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = await admin.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword
    });
    res.status(201).json({ message: 'Admin registration successful.', Admin: newAdmin });
  } catch (error) {
    console.error('Error registering admin: ', error);
    res.status(500).json({ message: 'Server error.' });
  }
  }
   
const adminLogin = async (req, res)=>{
  try{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: [{ message: 'All fields are required' }] });
    }
    const foundAdmin = await admin.findOne({
      where: {
        email: email
      }
    });
    if (!foundAdmin) {
      return res.status(404).json({ message: 'Wrong admin' });
    }
    const passwordMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({//!func used to create a new jwt
      adminID:foundAdmin.adminID,
      firstname: foundAdmin.firstname,
      lastname: foundAdmin.lastname,
      email: foundAdmin.email, 
    }, SECRET_KEY, { expiresIn: '1hr' });
    if (!token) {
      return res.status(500).json({ error: [{ message: 'Token generation failed' }] });
    }
    console.log(foundAdmin);
  } catch (error) { 
    console.error('Error logging in admin:', error);
    res.status(500).json({ message: 'Server error' });
  } 
}
 
const getUsers = async (req, res) => { 
  try {
    const users = await user.findAll();
    console.log(users)
    res.json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getSlots = async (req, res) => {
  try {
    const slots = await slot.findAll();
    console.log(slots)
    res.json(slots); 
  }catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}

const getCars = async (req, res) => {
  try {
    const cars = await car.findAll();
    console.log(cars)
    res.json(cars); 
  }catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}

const blockUser = async (req, res) => {
  try{
    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      user.blocked = true;
      await user.save();
      return res.json({ message: 'User blocked successfully' });
    }
    return res.status(400).json({ error: 'User not eligible for blocking' });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}

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
}

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
}

module.exports = {getUsers,getSlots,getCars,blockUser, adjustWorkingHours,managePayment,adminLogin,adminSignUp};