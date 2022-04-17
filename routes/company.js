var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function (req, res, next) {
  database.runRequest('EXECUTE rentalCompanySelect', (success, data) => {
    res.send(data);
  })
});

router.put('/update', function (req, res, next) {
  var rentalCompanyCode = req.body.rentalCompanyCode;
  var rentalCompanyName = req.body.rentalCompanyName;
  var rentalCompanyRegistrationCode = req.body.rentalCompanyRegistrationCode;
  var rentalCompanyEmail = req.body.rentalCompanyEmail;
  var rentalCompanyPhoneNumber = req.body.rentalCompanyPhoneNumber;
  var rentalCompanyFaxNumber = req.body.rentalCompanyFaxNumber;
  var rentalCompanyAddress = req.body.rentalCompanyAddress;
  var rentalCompanyPostalCode = req.body.rentalCompanyPostalCode;
  var rentalCompanyCity = req.body.rentalCompanyCity;
  var rentalCompanyCountry = req.body.rentalCompanyCountry;
  var rentalCompanyBusinessHours = req.body.rentalCompanyBusinessHours;
  var rentalCompanyDescription = req.body.rentalCompanyDescription;

  var query = "EXECUTE rentalCompanyUpdate " +
    "N'" + rentalCompanyCode + "', " +
    "N'" + rentalCompanyName + "', " +
    "N'" + rentalCompanyRegistrationCode + "', " +
    "N'" + rentalCompanyEmail + "', " +
    "N'" + rentalCompanyPhoneNumber + "', " +
    "N'" + rentalCompanyFaxNumber + "', " +
    "N'" + rentalCompanyAddress + "', " +
    "N'" + rentalCompanyPostalCode + "', " +
    "N'" + rentalCompanyCity + "', " +
    "N'" + rentalCompanyCountry + "', " +
    "N'" + rentalCompanyBusinessHours + "', " +
    "N'" + rentalCompanyDescription + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
})

router.get('/dataCount', function (req, res, next) {
  database.runRequest('EXECUTE dataCount', (success, data) => {
    res.send(data);
  })
});

module.exports = router;
