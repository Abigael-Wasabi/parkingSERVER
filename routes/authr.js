 const express = require('express');
const router = express.Router(); 
const { signUp, login, getUserProfile, editUserProfile, logout } = require('../controllers/authc');
const {authenticateUser} = require('../middlewares/authm');

router.post('/signup', signUp); 
router.post('/login', login); 
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