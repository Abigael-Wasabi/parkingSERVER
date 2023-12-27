const { Router } = require ('express');
const router = Router();
const { enterParkingDetails, allocateRandomSlot, cancelReservation, checkAvailableSlots } = require('../controllers/parkc');

//routes
router.post('/enterParkingDetails', enterParkingDetails);//!working both FnB
router.get('/allocateRandomSlot', allocateRandomSlot);//!working both FnB
router.get('/checkAvailableSlots', checkAvailableSlots);//!working both FnB
router.post('/cancelReservation', async (req, res) => {
    try{
        const {carID} = req.body;
        await cancelReservation(req, res, carID);
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error.' });}
});

module.exports = router; 