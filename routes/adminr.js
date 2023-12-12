const express = require('express');
const router = express.Router();
const {getUsers, blockUser, adjustWorkingHours, managePayment, adminLogin } = require('../controllers/adminc');

router.get('/users', getUsers);
router.post('/block-user',blockUser);
router.post('/adjust-working-hours',adjustWorkingHours);
router.post('/manage-payment', managePayment);
router.post('/login', adminLogin);


module.exports = router; 