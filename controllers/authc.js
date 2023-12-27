const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY; 
const users = require('../models/user');
const { where } = require('sequelize');

const signUp = async (req, res, next) => {
    try{
      const { firstname, lastname, email, password, confirmPassword } = req.body;
      if (!firstname || !lastname || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All details must be filled.' });
      }
      if (password !== confirmPassword) {
        return res.status(401).json({ message: 'Passwords do not match.' });
      }
      const existingUser = await users.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(400).json({ message: `User with email ${email} already exists.` });
      }
   //!the password salt should be 10 when 20 it will take a long time to hash the password */
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await users.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword
      });
      res.status(201).json({ message: 'User registration successful.', User: newUser });
    } catch (error) {
      console.error('Error registering user: ', error);
      res.status(500).json({ message: 'Server error.' });
    }
    }
const login = async (req, res)=>{
    try{
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({ error: [{ message: 'All fields are required' }] });
      }
      const user = await users.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      const token = jwt.sign({//!func used to create a new jwt
        userID:user.userID,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email, 
      }, SECRET_KEY, { expiresIn: '1hr' });
      if (!token) {
        return res.status(500).json({ error: [{ message: 'Token generation failed' }] });
      }
      const userData = {
        message: 'Login successful',
        token: token
      };//!set a cookie in the http response//!convert json obj to string//!cookie accessed only on server side not client//prevent xss
      res.cookie('userData', JSON.stringify(userData), { httpOnly: true });
      return res.json({userData});
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    } 
};
const generateToken = (user) => {
  const payload = { userID: user.userID };
  console.log(payload);
  console.log(user);
  const options = { expiresIn: '1h' }; 
  const token = jwt.sign(payload, SECRET_KEY, options);
  console.log('Generated Token:', token);
  return token;
};

 const getUserProfile = async (req, res) => {
  try {
    const userID = req.user.userID;//!useID frm token
    const user = await users.findOne({
      where: {userID: userID},
      attributes: ['firstname', 'lastname', 'email', 'password']});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user }); //!Sending user details as response
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  const editUserProfile = async (req, res) => {
    try {
      const userID = req.params.userID
      const { firstname, lastname, email, password} = req.body
      const updatedUser = users.update(
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        },
        {
          where:{
            userID: userID
          }
        }
      ) 
      if(updatedUser){
      return  res.send({
          message: 'User profile updated successfully',
          status:"success"
      })
      res.send({
        message:"an error occurred while updating user profile",
        status: "error"
      })
    } }catch (error) {
      console.error('Error editing user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const logout = (req, res) => {
    try{
      res.clearCookie('userData');
      res.status(200).json({ message: 'Logout successful' });
    }catch(error){
      console.error('Error logging out user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
    
module.exports ={signUp, login, getUserProfile, editUserProfile, generateToken, logout};








