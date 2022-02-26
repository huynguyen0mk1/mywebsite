// const express = require("express"),
//   app = express(),
//   bodyParser = require("body-parser");
// require("dotenv").config();
// const axios = require("axios");
// var cron = require("node-cron");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// cron.schedule("30 8 * * MON-FRI", async function () {
//   axios.get(process.env.IP + "/remindRisk");
// });

// port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listening on ${ PORT }`));

// console.log("API server started on: " + port);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//   res.header("Content-Type", "application/json");
//   res.header("Access-Control-Expose-Headers", "Content-Range");
//   res.header("Content-Range", "bytes 0-9/*");
//   next();
// });

// var cors = require("cors");
// app.use(cors());
// var routes = require("./routes/appRoutes");
// app.listen(port, function () {
//   routes(app);
// });

const http = require('http');

const hostname = '171.251.17.40';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});