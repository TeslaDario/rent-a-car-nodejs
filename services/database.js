import { Request } from "tedious";
import ConnectionPool from "tedious-connection-pool";

var CURRENT_PC = "mac"; //'hp';
var SERVER_PASSWORD = {
  hp: "dado2123",
  mac: "Dado2123.",
};

var poolConfig = {
  min: 1,
  max: 50,
  log: false,
};

var connectionConfig = {
  userName: "sa",
  password: SERVER_PASSWORD[CURRENT_PC],
  server: "localhost",

  options: {
    port: 1433,
    database: "Dario_Dragisic_Rent-a-Car",
  },
};

// create the pool
var pool = new ConnectionPool(poolConfig, connectionConfig);
pool.on("error", function (err) {
  console.error(err);
});

function runRequest(query, callback) {
  // acquire a connection
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      return;
    }

    request = new Request(query, function (err, rowCount) {
      if (err) {
        callback(true, []);
        console.log("('--- REQUEST ERROR ---\n", err);
      } else {
        console.log(query);

        var data = JSON.stringify(dataFromDatabase);
        callback(true, data);
        // release the connection back to the pool when finished
        connection.release();
      }
    });

    let dataFromDatabase = [];

    request.on("row", function (columns) {
      let rowObject = {};
      columns.forEach(function (column) {
        let colName = column.metadata.colName;
        let colValue = column.value;

        if (colValue === null) {
          colValue = "";
        }
        rowObject[colName] = colValue;
      });
      dataFromDatabase.push(rowObject);
    });
    connection.execSql(request);
  });
}

export const runRequest = runRequest;
