// const express = require('express');
// const router = express.Router();
// const { signUp, login, logout, editProfile, getUserProfile} = require('../controllers/authc');
// const { authenticateToken } = require('../middlewares/authm');
// // const authcontroller = require("../controllers/authC");
// const userController = require('../controllers/authc');

// router.post('/signup', userController.signUp);
// router.post('/login',userController.login);
// // router.patch('/editProfile/:id', authenticateToken, userController.editProfile);
// router.get('/profile/:id', authenticateToken,userController.getUserProfile);

 
// //pr req auth
// router.patch('/editProfile/:id', authenticateToken, userController.editProfile, async (req, res) => {
//     try{
//         await editProfile(req, res);
//     }catch(error){
//         console.log(error);
//         res.status(500).json({message: 'server error'});
//     }
// });


// router.delete('/logout', async (req, res) => {
//     try{
//         await logout(req, res);
//     }catch (error){
//         console.log(error);
//         res.status(500).json({message:'server error'});
//     } 
// });

// module.exports = router;


 
const express = require('express');
const router = express.Router(); 
const { signUp, login, getUserProfile, editUserProfile, logout } = require('../controllers/authc');
const {authenticateUser} = require('../middlewares/authm');

router.post('/signup', signUp); 
router.get('/profile/:userID', authenticateUser, async (req, res) => {
    try{
        await getUserProfile(req, res);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'server error'});
    }
});
router.patch('/editProfile/:userID', authenticateUser, editUserProfile);
router.post('/logout',logout);

module.exports = router; 








// const express = require('express');
// const router = express.Router();
// const { signUp, login, logout, editProfile, getUserProfile} = require('../controllers/authc');
// // const { passwordReset, updatePassword } = require('../controllers/fpC');
// const { authenticateUser } = require('../middlewares/authm');
// // const authcontroller = require("../controllers/authC");
// const userController = require('../controllers/authc');

// router.post('/signup', userController.signUp);
// router.post('/login',userController.login);
// // router.post('/passwordreset', passwordReset); 
// // router.post('/updatepassword', updatePassword);
// // router.patch('/editProfile/:id', authenticateToken, userController.editProfile);
// // router.get('/profile/:id', authenticateToken,userController.getUserProfile);
// router.get('/profile/:userID', authenticateUser, async (req, res) => {
//     try{
//         await getUserDetails(req, res);
//     }catch(error){
//         console.log(error);
//         res.status(500).json({message: 'server error'});
//     }
// });
 
// //pr req auth
// router.patch('/editProfile/:id', authenticateUser, userController.editProfile, async (req, res) => {
//     try{
//         await editProfile(req, res);
//     }catch(error){
//         console.log(error);
//         res.status(500).json({message: 'server error'});
//     }
// });


// router.delete('/logout', async (req, res) => {
//     try{
//         await logout(req, res);
//     }catch (error){
//         console.log(error);
//         res.status(500).json({message:'server error'});
//     } 
// });

// module.exports = router;