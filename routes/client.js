var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function (req, res, next) {
  database.runRequest('EXECUTE clientViewSelectAll', (success, data) => {
    res.send(data);
  })
});

router.post('/insert', function (req, res, next) {
  var clientDriversLicenceNumber = req.body.clientDriversLicenceNumber;
  var clientFirstName = req.body.clientFirstName;
  var clientLastName = req.body.clientLastName;
  var clientAddress = req.body.clientAddress;
  var clientPostalCode = req.body.clientPostalCode;
  var clientCity = req.body.clientCity;
  var clientCountry = req.body.clientCountry;
  var clientEmail = req.body.clientEmail;
  var clientPhoneNumber = req.body.clientPhoneNumber;

  var query = "EXECUTE clientInsert " +
    "N'" + clientDriversLicenceNumber + "', " +
    "N'" + clientFirstName + "', " +
    "N'" + clientLastName + "', " +
    "N'" + clientAddress + "', " +
    "N'" + clientPostalCode + "', " +
    "N'" + clientCity + "', " +
    "N'" + clientCountry + "', " +
    "N'" + clientEmail + "', " +
    "N'" + clientPhoneNumber + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
});


module.exports = router;
