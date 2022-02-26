var routes = require("./routes/appRoutes");
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

// app.listen(port, function () {
//   routes(app);
// });
const express = require('express'),app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.send('Hello World'))
  .listen(PORT, () => routes(app));