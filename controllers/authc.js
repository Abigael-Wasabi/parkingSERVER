// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const secretKey = "emergencyKit"; 
// const users = require('../models/user');

// const signUp = async (req, res, next) => {
//     try{
//       const { firstname, lastname, email, password, confirmPassword } = req.body;
//       if (!firstname || !lastname || !email || !password || !confirmPassword) {
//         return res.status(400).json({ message: 'All details must be filled.' });
//       }
//       if (password !== confirmPassword) {
//         return res.status(401).json({ message: 'Passwords do not match.' });
//       }
//       const existingUser = await users.findOne({ where: { email: email } });
//       if (existingUser) {
//         return res.status(400).json({ message: `User with email ${email} already exists.` });
//       }
//       const hashedPassword = bcrypt.hashSync(password, 10);
//       const newUser = await users.create({
//         firstname: firstname,
//         lastname: lastname,
//         email: email,
//         password: hashedPassword
//       });
//       res.status(201).json({ message: 'User registration successful.', User: newUser });
//     } catch (error) {
//       console.error('Error registering user: ', error);
//       res.status(500).json({ message: 'Server error.' });
//     }
//     }
// const login = async (req, res)=>{
//     try{
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.status(401).json({ error: [{ message: 'All fields are required' }] });
//       }
//       const user = await users.findOne({
//         where: {
//           email: email
//         }
//       });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         return res.status(401).json({ message: 'Incorrect password' });
//       }
//       const token = jwt.sign({
//         userID:user.userID,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         email: user.email,
//       }, secretKey, { expiresIn: '5hr' });
//       if (!token) {
//         return res.status(500).json({ error: [{ message: 'Token generation failed' }] });
//       }
//       const userData = {
//         message: 'Login successful',
//         token: token
//       };//!set a cookie in the http response//!convert json obj to string//!cookie accessed only on server side not client//prevent xss
//       res.cookie('userData', JSON.stringify(userData), { httpOnly: true });
//       return res.json({userData});
//     } catch (error) {
//       console.error('Error logging in user:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
    
// };
// const generateToken = (user) => {
//   const payload = { userID: user.userID };
//   console.log(payload);
//   console.log(user);
//   const options = { expiresIn: '5h' }; 
//   const token = jwt.sign(payload, secretKey, options);
//   console.log('Generated Token:', token);
//   return token;
// };

// // const getUserProfile = async (req, res) => {
// //     try {
// //       const user = req.user.userID;
// //       if (!user) {
// //         return res.status(401).json({ message: 'User not authenticated' });
// //       }
// //       const { firstname, lastname, email,password } = user;
  
// //       return res.json({firstname,lastname,email,password});
// //     } catch (error) {
// //       console.error('Error fetching user profile:', error);
// //       res.status(500).json({ message: 'Server error' });
// //     }
// //   };


//  const getUserProfile = async (req, res) => {
//   try {
//     const userID = req.user.userID;//!useID frm token
//     const user = await users.findOne({
//       where: {userID: userID},
//       attributes: ['firstname', 'lastname', 'email', 'password']});
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ user }); //!Sending user details as response
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// // router.get('/profile/:userID', authenticateUser, getUserDetails);


//   const editUserProfile = async (req, res) => {
//     try {
//       const user = req.user;
//       if (!user) {
//         return res.status(401).json({ message: 'User not authenticated' });
//       }
//       const { firstname, lastname, email, password } = req.body;
  
//       user.firstname = firstname || user.firstname;
//       user.lastname = lastname || user.lastname;
//       user.email = email || user.email;
//       if (password) {
//         user.password = await bcrypt.hash(password, 10);
//       }
//       await user.save();
  
//       return res.json({ message: 'User profile updated successfully' });
//     } catch (error) {
//       console.error('Error editing user profile:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
    
// module.exports ={signUp,login,getUserProfile,editUserProfile,generateToken};











const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'emergency-kit';
const users = require('../models/user');

const userController = {
  signUp: async (req, res, next) => {
    try {
      const { firstname, lastname, email, password, confirmPassword } = req.body;

      if (!firstname || !lastname || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All details must be filled.' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
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
  },

  login: async (req, res) => {
    try {
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
      
      // const secretKey = 'emergency-kit';
      const token = jwt.sign({
        userID:user.userID,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }, secretKey, { expiresIn: '1hr' });
      
     
      if (!token) {
        return res
          .status(500)
          .json({ error: [{ message: 'Token generation failed' }] });
      }


      const userData = {
        message: 'Login successful',
        token: token
      };

      res.cookie('userData', JSON.stringify(userData), { httpOnly: true });

      return res.json({
        userData 
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },//where
  generateToken: (user) => {
    const payload = { userID: user.userID };
    console.log(payload);
    console.log(user);
    const options = { expiresIn: '1h' }; 
    // const secretKey = 'emergency-kit';
    const token = jwt.sign(payload, secretKey, options);
    console.log('Generated Token:', token);
    return jwt.sign(payload, secretKey, options);
  },

  editProfile : async (req, res) => {
    try {
      const userID = req.user.userID; 
      const { firstname, lastname, email, password } = req.body;

      const user = await users.findOne({ where: { userID: userID } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // if (firstname) user.firstname = firstname;
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;

      if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        user.password = hashedPassword; 
      }
      await user.save();

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error editing profile:', error);
      res.status(500).json({ message: 'Server error' }); 
    }
  },

   getUserProfile: async (req, res) => {
    try {
      const userID = req.user.userID;//!useID frm token
      const user = await users.findOne({
        where: {userID: userID},
        attributes: ['firstname', 'lastname', 'email', 'password']
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user }); //!Sending user details as response
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.json({ message: 'User logged out successfully' });
    } catch (error) {
      console.error('Error logging out user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}


module.exports = userController;