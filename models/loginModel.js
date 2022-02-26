"user strict";
var sql = require("./db.js");
var Login = function (login) {
  this.username = login.username;
};
Login.saveUser = (crawl, result) => {
  {
    sql.query("INSERT INTO Users  set ?", crawl, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, { status: false });
      } else {
        result(null, { status: true });
      }
    });
  }
};
Login.getUser = (user, result) => {
  {
    sql.query(
      "SELECT DISTINCT  idUser as `id`, userName, password, role  FROM `Users`",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false, data: [] });
        } else {
          result(null, { status: true, data: res });
        }
      }
    );
  }
};
Login.getRole = (user, result) => {
  {
    sql.query(
      "SELECT DISTINCT  idUser as `id`, userName, password, role  FROM `Users`",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false, data: [] });
        } else {
          result(null, { status: true, data: res });
        }
      }
    );
  }
};
Login.checkUser = (user, result) => {
  {
    sql.query(
      "SELECT DISTINCT  idUser as `id`, userName, password, role  FROM `Users`",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false, data: [] });
        } else {
          result(null, { status: true, data: res });
        }
      }
    );
  }
};

Login.getAllUser = ( result) => {
    {
      sql.query(
        "SELECT DISTINCT  idUser as `id`, userName, password, role  FROM `Users`",
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, { status: false, data: [] });
          } else {
            result(null, { status: true, data: res });
          }
        }
      );
    }
  };

module.exports = Login;
