const express = require("express");
const router = express.Router();
const { createToken, postStk} = require('../controllers/mpesac');

router.post("/", createToken);
module.exports = router;