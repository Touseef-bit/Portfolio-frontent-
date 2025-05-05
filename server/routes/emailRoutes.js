var express = require('express');
const sendEmail = require('../Controller/contactController');
var router = express.Router();


router.post('/sendEmail',sendEmail)

module.exports = router;
