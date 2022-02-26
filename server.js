var routes = require("./routes/appRoutes");
const axios = require("axios");
var cron = require("node-cron");
const PORT = process.env.PORT || 5000;
var cors = require("cors");

const express = require('express'),
      app = express(),
      bodyParser = require("body-parser");

require("dotenv").config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cron.schedule("30 8 * * MON-FRI", async function () {
  axios.get(process.env.IP + "/remindRisk");
});

app.use(cors());
app.listen(PORT, () => routes(app));