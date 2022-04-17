var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function (req, res, next) {
  database.runRequest('EXECUTE vehicleSelectAll', (success, data) => {
    res.send(data);
  })
});

router.get('/short', function (req, res, next) {
  database.runRequest('EXECUTE vehicleSelectShort', (success, data) => {
    res.send(data);
  })
});

router.post('/insert', function (req, res, next) {
  var vehicleModel = req.body.vehicleModel;
  var vehicleTypeCode = req.body.vehicleTypeCode;
  var vehicleManufacturerTypeCode = req.body.vehicleManufacturerTypeCode;
  var vehicleEngineTypeCode = req.body.vehicleEngineTypeCode;
  var vehicleTransmisionTypeCode = req.body.vehicleTransmisionTypeCode;
  var vehicleDoors = req.body.vehicleDoors;
  var vehicleSeats = req.body.vehicleSeats;
  var vehicleManufactureYear = req.body.vehicleManufactureYear;
  var vehicleColor = req.body.vehicleColor;
  var vehicleAirCondition = req.body.vehicleAirCondition;
  var vehicleAudioSystem = req.body.vehicleAudioSystem;
  var vehicleGPS = req.body.vehicleGPS;
  var vehicleAdapted = req.body.vehicleAdapted;
  var vehicleDescription = req.body.vehicleDescription;
  var vehiclePrice = req.body.vehiclePrice;
  var vehicleStatusCode = req.body.vehicleStatusCode;

  var query = "EXECUTE vehicleInsert " +
    "N'" + vehicleModel + "', " +
    "N'" + vehicleTypeCode + "', " +
    "N'" + vehicleManufacturerTypeCode + "', " +
    "N'" + vehicleEngineTypeCode + "', " +
    "N'" + vehicleTransmisionTypeCode + "', " +
    "N'" + vehicleDoors + "', " +
    "N'" + vehicleSeats + "', " +
    "N'" + vehicleManufactureYear + "', " +
    "N'" + vehicleColor + "', " +
    "N'" + vehicleAirCondition + "', " +
    "N'" + vehicleAudioSystem + "', " +
    "N'" + vehicleGPS + "', " +
    "N'" + vehicleAdapted + "', " +
    "N'" + vehicleDescription + "', " +
    "N'" + vehiclePrice + "', " +
    "N'" + vehicleStatusCode + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
});

router.put('/update', function (req, res, next) {
  var vehicleCode = req.body.vehicleCode;
  var vehicleModel = req.body.vehicleModel;
  var vehicleTypeCode = req.body.vehicleTypeCode;
  var vehicleManufacturerTypeCode = req.body.vehicleManufacturerTypeCode;
  var vehicleEngineTypeCode = req.body.vehicleEngineTypeCode;
  var vehicleTransmisionTypeCode = req.body.vehicleTransmisionTypeCode;
  var vehicleDoors = req.body.vehicleDoors;
  var vehicleSeats = req.body.vehicleSeats;
  var vehicleManufactureYear = req.body.vehicleManufactureYear;
  var vehicleColor = req.body.vehicleColor;
  var vehicleAirCondition = req.body.vehicleAirCondition;
  var vehicleAudioSystem = req.body.vehicleAudioSystem;
  var vehicleGPS = req.body.vehicleGPS;
  var vehicleAdapted = req.body.vehicleAdapted;
  var vehicleDescription = req.body.vehicleDescription;
  var vehiclePrice = req.body.vehiclePrice;
  var vehicleStatusCode = req.body.vehicleStatusCode;

  var query = "EXECUTE vehicleUpdate " +
    "N'" + vehicleCode + "', " +
    "N'" + vehicleModel + "', " +
    "N'" + vehicleTypeCode + "', " +
    "N'" + vehicleManufacturerTypeCode + "', " +
    "N'" + vehicleEngineTypeCode + "', " +
    "N'" + vehicleTransmisionTypeCode + "', " +
    "N'" + vehicleDoors + "', " +
    "N'" + vehicleSeats + "', " +
    "N'" + vehicleManufactureYear + "', " +
    "N'" + vehicleColor + "', " +
    "N'" + vehicleAirCondition + "', " +
    "N'" + vehicleAudioSystem + "', " +
    "N'" + vehicleGPS + "', " +
    "N'" + vehicleAdapted + "', " +
    "N'" + vehicleDescription + "', " +
    "N'" + vehiclePrice + "', " +
    "N'" + vehicleStatusCode + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
});

router.get('/byCode/:id', function (req, res, next) {
  var id = req.params.id;
  database.runRequest('EXECUTE vehicleSelectByVehicleCode ' + id, (success, data) => {
    res.send(data);
  })
});

router.get('/formByCode/:id', function (req, res, next) {
  var id = req.params.id;
  database.runRequest('EXECUTE vehicleFormSelectByVehicleCode ' + id, (success, data) => {
    res.send(data);
  })
});

router.get('/vehicleView', function (req, res, next) {
  database.runRequest('EXECUTE vehicleViewSelectAll', (success, data) => {
    res.send(data);
  })
});

router.get('/manufacturer', function (req, res, next) {
  database.runRequest('EXECUTE vehicleManufacturerTypeSelect', (success, data) => {
    res.send(data);
  })
});

router.get('/type', function (req, res, next) {
  database.runRequest('EXECUTE vehicleTypeSelect', (success, data) => {
    res.send(data);
  })
});

router.get('/engine', function (req, res, next) {
  database.runRequest('EXECUTE vehicleEngineTypeSelect', (success, data) => {
    res.send(data);
  })
});

router.get('/transmision', function (req, res, next) {
  database.runRequest('EXECUTE vehicleTransmisionTypeSelect', (success, data) => {
    res.send(data);
  })
});

router.get('/status', function (req, res, next) {
  database.runRequest('EXECUTE vehicleStatusSelect', (success, data) => {
    res.send(data);
  })
});


/********** IMAGES **********/
router.get('/vehicleImages/:id', function (req, res, next) {
  var id = req.params.id;
  database.runRequest('EXECUTE vehicleImagesSelect ' + id, (success, data) => {
    res.send(data);
  })
});

router.put('/vehicleImagesDefaultUpdate', function (req, res, next) {
  var vehicleCode = req.body.vehicleCode;
  var imageCode = req.body.imageCode;

  var query = "EXECUTE vehicleImagesDefaultUpdate " +
    "'" + vehicleCode + "', " +
    "'" + imageCode + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
});

router.delete('/vehicleImagesDelete/:vehicleCode/:imageCode', function (req, res, next) {
  var vehicleCode = req.params.vehicleCode;
  var imageCode = req.params.imageCode;

  var query = "EXECUTE vehicleImagesDelete " + vehicleCode + ", " + imageCode;

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
});

module.exports = router;
