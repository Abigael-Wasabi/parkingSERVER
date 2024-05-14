const express = require('express');
const router = express.Router();
const {getUsers, blockUser, adjustWorkingHours, managePayment, adminLogin,getSlots,getCars, adminSignUp } = require('../controllers/adminc');
//endpoints
router.get('/users', getUsers);
router.get('/slots', getSlots);
router.get('/cars', getCars);
router.post('/block-user',blockUser);
router.post('/adjust-working-hours',adjustWorkingHours);
router.post('/manage-payment', managePayment);
router.post('/login', adminLogin);
router.post('/signup', adminSignUp);

module.exports = router;    