import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import { executeStatement } from '../services';

const uploadRouter = Router();

// set the directory for the uploads to the uploaded to
const DIR = './uploads/';

// define storage
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    const DESTINATION = createDestination(req);

    // check if filetype is an image
    if (file.mimetype.indexOf('image') == -1) {
      callback(new Error('Wrong file type! Only images accepted!'), DESTINATION);
    } else {
      callback(null, DESTINATION);
    }
  },
  filename(req, file, callback) {
    const ext = file.mimetype.split('/')[1];

    callback(null, `${file.fieldname}_${Date.now()}.${ext}`);
  },
});

// define the type of upload multer would be doing and pass in its destination,
// in our case, its a single file with the name photo
const upload = multer({
  storage: Storage,
  dest: DIR,
}).array('photo', 10);

// our file upload function. EXPLICIT FOR VEHICLE IMAGES UPLOAD
uploadRouter.post('/', (req, res, next) => {
  let path = '';
  let id = '';

  upload(req, res, (err) => {
    // An error occurred when uploading
    if (err) {
      return res.send({
        msg: 'An Error occured',
        err,
        success: false,
        result: null,
      });
    }

    // No error occured. // Save image to db
    const queries: string[] = [];
    const result: any[] = [];
    for (let i = 0; i < (<any>req).files.length; i++) {
      id = req.body.id;
      path = (<any>req).files[i].path.replace(/\\/g, '/');

      const query = 'EXECUTE vehicleImagesInsert ' + `'${id}', ` + `N'${path}', ` + '0';

      queries.push(query);

      result.push({
        code: null,
        name: (<any>req).files[i].filename,
        path,
      });
    }

    saveToDB(queries, result, (dbRes) => {
      console.log(`Upload Completed for ${dbRes.length} files!`);
      return res.send({
        msg: 'Upload Completed',
        err: null,
        success: true,
        result: dbRes,
      });
    });
  });
});

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
    executeStatement(queries[i]).then(({ data }) => {
      console.log(i, data);
      data = JSON.parse(data);
      result[i].code = (<any>data)[0].resultCode;
      // ...when async operation is complete call
      cursorTaskComplete();
    });
  }
}

function createDestination(req) {
  const group_dir = `${req.body.group}/`;
  const id_dir = `${req.body.id}/`;

  if (!fs.existsSync(DIR + group_dir)) {
    fs.mkdirSync(DIR + group_dir);
  }
  if (!fs.existsSync(DIR + group_dir + id_dir)) {
    fs.mkdirSync(DIR + group_dir + id_dir);
  }

  return DIR + group_dir + id_dir;
}

export default uploadRouter;
