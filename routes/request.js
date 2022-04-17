var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function (req, res, next) {
  database.runRequest('EXECUTE rentRequestViewSelectAll', (success, data) => {
    res.send(data);
  })
});

router.get('/new', function (req, res, next) {
  database.runRequest('EXECUTE rentRequestNewSelect', (success, data) => {
    res.send(data);
  })
});

router.get('/open', function (req, res, next) {
  database.runRequest('EXECUTE rentRequestOpenSelect', (success, data) => {
    res.send(data);
  })
});

router.get('/rentStatus', function (req, res, next) {
  database.runRequest('EXECUTE rentStatusSelect', (success, data) => {
    res.send(data);
  })
});

router.get('/byCode/:id', function (req, res, next) {
  var id = req.params.id;
  database.runRequest('EXECUTE rentRequestSelectByCode ' + id, (success, data) => {
    res.send(data);
  })
});

router.post('/insert', function (req, res, next) {
  var vehicleCode = req.body.vehicleCode;
  var clientCode = req.body.clientCode;
  var rentStartDate = req.body.rentStartDate;
  var rentStartTime = req.body.rentStartTime;
  var rentEndDate = req.body.rentEndDate;
  var rentEndTime = req.body.rentEndTime;
  var rentPrice = req.body.rentPrice;
  var rentStatusCode = req.body.rentStatusCode;
  var rentDescription = req.body.rentDescription;
  var userCode = req.body.userCode;

  var query = "EXECUTE rentRequestInsert " +
    "N'" + vehicleCode + "', " +
    "N'" + clientCode + "', " +
    "N'" + rentStartDate + "', " +
    "N'" + rentStartTime + "', " +
    "N'" + rentEndDate + "', " +
    "N'" + rentEndTime + "', " +
    "N'" + rentPrice + "', " +
    "N'" + rentStatusCode + "', " +
    "N'" + rentDescription + "', " +
    "N'" + userCode + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
});

router.put('/update', function (req, res, next) {
  var rentCode = req.body.rentCode;
  var vehicleCode = req.body.vehicleCode;
  var rentStartDate = req.body.rentStartDate;
  var rentStartTime = req.body.rentStartTime;
  var rentEndDate = req.body.rentEndDate;
  var rentEndTime = req.body.rentEndTime;
  var rentPrice = req.body.rentPrice;
  var rentStatusCode = req.body.rentStatusCode;
  var rentDescription = req.body.rentDescription;
  var userCode = req.body.userCode;

  var query = "EXECUTE rentRequestUpdate " +
    "N'" + rentCode + "', " +
    "N'" + vehicleCode + "', " +
    "N'" + rentStartDate + "', " +
    "N'" + rentStartTime + "', " +
    "N'" + rentEndDate + "', " +
    "N'" + rentEndTime + "', " +
    "N'" + rentPrice + "', " +
    "N'" + rentStatusCode + "', " +
    "N'" + rentDescription + "', " +
    "N'" + userCode + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
});


module.exports = router;
