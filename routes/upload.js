var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var database = require('../database');

// set the directory for the uploads to the uploaded to
var DIR = './uploads/';

// define storage
var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var DESTINATION = createDestination(req);

    // check if filetype is an image
    if (file.mimetype.indexOf('image') == -1) {
      callback('Wrong file type! Only images accepted!', null);
    } else {
      callback(null, DESTINATION);
    }
  },
  filename: function (req, file, callback) {
    var ext = file.mimetype.split('/')[1];

    callback(null, file.fieldname + '_' + Date.now() + '.' + ext);
  }
});



// define the type of upload multer would be doing and pass in its destination,
// in our case, its a single file with the name photo
var upload = multer({
  storage: Storage
}).array('photo', 10);



// our file upload function. EXPLICIT FOR VEHICLE IMAGES UPLOAD
router.post('/', function (req, res, next) {
  let path = '', id = '';

  upload(req, res, function (err) {
    // An error occurred when uploading
    if (err) {
      return res.send({ msg: "An Error occured", err: err, success: false, result: null })
    }

    // No error occured. // Save image to db
    var queries = [];
    var result = [];
    for (let i = 0; i < req.files.length; i++) {
      id = req.body.id;
      path = req.files[i].path.replace(/\\/g, "/");

      var query = "EXECUTE vehicleImagesInsert " +
        "'" + id + "', " +
        "N'" + path + "', " +
        "0";

      queries.push(query);

      result.push({
        code: null,
        name: req.files[i].filename,
        path: path,
      });
    }

    saveToDB(queries, result, (dbRes) => {
      console.log('Upload Completed for ' + dbRes.length + ' files!');
      return res.send({ msg: "Upload Completed", err: null, success: true, result: dbRes });
    });

  });
})


function saveToDB(queries, result, callback) {
  // add a counter
  let cursorTasks = queries.length;

  processRequest(0);
  function cursorTaskComplete() {
    cursorTasks--;

    if (cursorTasks <= 0) {
      // this gets called after each task reported to be complete
      callback(result);
    } else {
      processRequest(cursorTasks);
    }
  }

  function processRequest(i) {
    // ...doing stuff here takes some time and does some async stuff
    database.runRequest(queries[i], (success, data) => {
      console.log(i, data);
      data = JSON.parse(data);
      result[i].code = data[0].resultCode;
      // ...when async operation is complete call
      cursorTaskComplete()
    });
  }
}



function createDestination(req) {
  var group_dir = req.body.group + '/';
  var id_dir = req.body.id + '/';

  if (!fs.existsSync(DIR + group_dir)) {
    fs.mkdirSync(DIR + group_dir);
  }
  if (!fs.existsSync(DIR + group_dir + id_dir)) {
    fs.mkdirSync(DIR + group_dir + id_dir);
  }

  return DIR + group_dir + id_dir;
}

module.exports = router;
