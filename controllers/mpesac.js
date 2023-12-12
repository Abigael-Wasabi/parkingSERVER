const axios = require("axios");

//middleware
const createToken = async (req, res, next) => {
  const secret = "ajCTAsDeY6cCapqW";
  const consumer = "VdQt0Q2wwMGJprqZNiwLs5XV5axNP8Oc";
  const auth = "VmRRdDBRMnd3TUdKcHJxWk5pd0xzNVhWNWF4TlA4T2M6YWpDVEFzRGVZNmNDYXBxVw";
//   const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
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
};

const postStk = async (req, res) => {
    const shortCode = 174379;
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;
    const passkey ="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
      const password = 'Safaricom999!*!';

    const data = {
      ShortCode: 174379,
      Password: password,
      Timestamp: timestamp,
      CommandID: "CustomerPayBillOnline",
      Amount: "10000",
      Msisdn: `254${phone}`,
      BillRefNumber: "MpesaTest",
      TransactionType: "CustomerPayBillOnline",
      PartyA: 254111583196,
      PartyB: 600000,
      PhoneNumber:  174379,
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "Mpesa Test",
      TransactionDesc: "Testing stk push",
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  };
    
module.exports = { createToken, postStk };





