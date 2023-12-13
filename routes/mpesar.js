const express = require("express");
const router = express.Router();
const { createToken, postStk} = require('../controllers/mpesac');

router.post("/", createToken, postStk);
module.exports = router;