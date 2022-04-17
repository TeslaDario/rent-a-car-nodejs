var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function (req, res, next) {
  database.runRequest('EXECUTE usersSelect', (success, data) => {
    res.send(data);
  })
});

router.get('/byCode/:id', function (req, res, next) {
  var id = req.params.id;

  database.runRequest('EXECUTE usersSelectByUserCode ' + id, (success, data) => {
    res.send(data);
  })
});

router.post('/insert', function (req, res, next) {
  var userName = req.body.userName;
  var userPassword = req.body.userPassword;
  var userTypeCode = req.body.userTypeCode;
  var userFirstName = req.body.userFirstName;
  var userLastName = req.body.userLastName;
  var userEmail = req.body.userEmail;
  var userPhoneNumber = req.body.userPhoneNumber;
  var userStatusCode = req.body.userStatusCode;

  var query = "EXECUTE userInsert " +
    "N'" + userName + "', " +
    "N'" + userPassword + "', " +
    "N'" + userTypeCode + "', " +
    "N'" + userFirstName + "', " +
    "N'" + userLastName + "', " +
    "N'" + userEmail + "', " +
    "N'" + userPhoneNumber + "', " +
    "N'" + userStatusCode + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
})

router.put('/update', function (req, res, next) {
  var userCode = req.body.userCode;
  var userName = req.body.userName;
  var userPassword = req.body.userPassword;
  var userTypeCode = req.body.userTypeCode;
  var userFirstName = req.body.userFirstName;
  var userLastName = req.body.userLastName;
  var userEmail = req.body.userEmail;
  var userPhoneNumber = req.body.userPhoneNumber;
  var userStatusCode = req.body.userStatusCode;

  var query = "EXECUTE userUpdate " +
    "N'" + userCode + "', " +
    "N'" + userName + "', " +
    "N'" + userPassword + "', " +
    "N'" + userTypeCode + "', " +
    "N'" + userFirstName + "', " +
    "N'" + userLastName + "', " +
    "N'" + userEmail + "', " +
    "N'" + userPhoneNumber + "', " +
    "N'" + userStatusCode + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
})

router.get('/employee', function (req, res, next) {
  database.runRequest('EXECUTE employeeViewSelectAll', (success, data) => {
    res.send(data);
  })
});

router.post('/login', function (req, res, next) {
  var userEmail = req.body.email;
  var userPassword = req.body.password;

  var query = "EXECUTE userLogIn " +
    "N'" + userEmail + "', " +
    "N'" + userPassword + "'";

  database.runRequest(query, (success, data) => {
    res.send(data);
  })
});

module.exports = router;
