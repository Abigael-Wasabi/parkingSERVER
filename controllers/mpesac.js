const axios = require("axios");
require('dotenv').config();
const secretKEY = process.env.secret_KEY;  
const consumerKEY = process.env.CONSUMER_KEY;

//middleware
const createToken = async (req, res, next) => {
  const secret = secretKEY;
  const consumer = consumerKEY;
  const auth = `VmRRdDBRMnd3TUdKcHJxWk5pd0xzNVhWNWF4TlA4T2M6YWpDVEFzRGVZNmNDYXBxVw==`; 
  // const auth = new Buffer.from(`${consumer}:${secret}).toString("base64"`);
  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((data) => { 
      token = data.data.access_token;
      console.log(data.data); 
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
}; //!

const postStk = async (req, res) => {
  const shortCode = 174379; //used as the paybill no or the till no
  const phone = req.body.phone.substring(1); 
  const amount = req.body.amount;
  const passkey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );
  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: 1000,
    PartyA: `254${phone}`,
    PartyB: shortCode,
    PhoneNumber: `254${phone}`,
    CallBackURL: "http://ambyachievers.org/path",
    AccountReference: "Mpesa",
    TransactionDesc: "stk push",
  };

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

const calculateParkingFee = async (req, res) => { 
  try {
    const hoursParked = req.body.hoursParked;

    let parkingFee = 0;
    if (hoursParked >= 1 && hoursParked <= 3) {
      parkingFee = 200;
    } else if (hoursParked <= 5) {
      parkingFee = 400;
    } else if (hoursParked <= 7) {
      parkingFee = 600;
    } else if (hoursParked <= 9) {
      parkingFee = 800;
    } else if (hoursParked <= 11) {
      parkingFee = 1000;
    } else if (hoursParked <= 13) {
      parkingFee = 1200;
    } else if (hoursParked <= 15) {
      parkingFee = 1400;
    } else if (hoursParked <= 17) {
      parkingFee = 1600;
    } else if (hoursParked <= 18) {
      parkingFee = 1800;
    }

    res.status(200).json({ parkingFee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error calculating parking fee.' });
  }
};

module.exports = { createToken, postStk, calculateParkingFee };