'use strict';

/*
 * Put here your dependencies
 */
const http = require("http"); // Use https if your app will not be behind a proxy.
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const moment = require("moment");

const config = require("./configurations");
const logger = require("./logger");

const app = express();

app.use(compression());

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: "true"
  })
);

app.use(
  bodyParser.json({
    limit: "50mb",
    type: "application/json"
  })
);

const frontendPath = __dirname + '/../frontend';
logger.info("Serving '%s' as static folder", frontendPath);
app.use(express.static(frontendPath));

if (config.server.bypassCORS) {
  logger.info("Adding 'Access-Control-Allow-Origin: *' header to every path.");
  app.use(cors());
}
if (config.server.useHelmet) {
  logger.info("Adding Helmet related headers.");
  app.use(helmet());
}

const serverPort = process.env.PORT || config.server.port;

const server = http.createServer(app);

server.listen(serverPort, function () {
  logger.info("Your server is listening on port %d (http://localhost:%d)", serverPort, serverPort);
});


/*
 * Export functions and Objects
 */
module.exports = {
  close: _close,
  myfunction: _myfunction,
  myPromiseFunction: _myPromiseFunction
};


/*
 * Implement the functions
 */

function _close(callback) {
  if (server.listening) {
    server.close(callback);
  } else {
    callback();
  }
}

function _myfunction(param1, param2) {

  logger.info('Hello world!');
  logger.info('Param1: %s', param1);
  logger.info('Param2: %s', param2);

  logger.custom('Date: %s', moment().toISOString());

  return param1 + "-" + param2;

}

function _myPromiseFunction(param1, param2) {

  return new Promise(function (resolve, reject) {
    if (param1 && param2) {
      resolve(param1 + "-" + param2);
    } else {
      reject(new Error("Params are required"));
    }
  });

}