"user strict";
var sql = require("./db.js");
var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host: "localhost:9200",
});
var Login = function (login) {
  this.username = login.username;
};
const isUseElasticSearch = true;
Login.saveUser = (crawl, result) => {
  if (isUseElasticSearch) {
    client.index(
      {
        index: "tbl_users",
        type: "myType",
        id: new Date().getTime().toString(),
        body: {
          ...crawl,
        },
      },
      (err) => {
        if (err) {
          result(err, { status: false });
        } else result(null, { status: true, idUserName: crawl.idUserName });
      }
    );
  } else {
    sql.query("INSERT INTO tblUser  set ?", crawl, (err, res) => {
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
  if (isUseElasticSearch) {
    client.search(
      {
        index: "tbl_users",
        type: "myType",
        scroll: "100s",
        size: 500,
        body: {
          query: {
            match: {
              userName: user.userName,
            },
          },
          _source: true,
        },
      },
      function (err, resp) {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false, data: {} });
        } else {
          let data = resp.hits.hits
            .map((i) => i._source)
            .filter(
              (i) =>
                i.password === user.password && i.userName === user.userName
            );
          if (data.length === 1)
            result(null, {
              status: true,
              data: {
                idUserName: data[0].idUserName,
                userName: data[0].userName,
                role: data[0].role,
              },
            });
          else result(err, { status: false, data: {} });
        }
      }
    );
  } else {
    sql.query(
      "SELECT DISTINCT  idUserName as `id`, userName, password, role  FROM `tblUser`",
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
  if (isUseElasticSearch) {
    client.search(
      {
        index: "tbl_users",
        type: "myType",
        scroll: "100s",
        size: 500,
        body: {
          query: {
            match: {
              userName: user.userName,
            },
          },
          _source: true,
        },
      },
      function (err, resp) {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false, data: {} });
        } else {
          let data = resp.hits.hits
            .map((i) => i._source)
            .filter(
              (i) =>
                i.idUserName === user.idUserName && i.userName === user.userName
            );
          if (data.length === 1)
            result(null, {
              status: true,
              data: {
                role: data[0].role,
                fullname: data[0].fullname,
              },
            });
          else result(err, { status: false, data: {} });
        }
      }
    );
  } else {
    sql.query(
      "SELECT DISTINCT  idUserName as `id`, userName, password, role  FROM `tblUser`",
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
  if (isUseElasticSearch) {
    client.search(
      {
        index: "tbl_users",
        type: "myType",
        scroll: "100s",
        size: 500,
        body: {
          query: {
            match: {
              userName: user.userName,
            },
          },
          _source: true,
        },
      },
      function (err, resp) {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false, data: {} });
        } else {
          let data = resp.hits.hits
            .map((i) => i._source)
            .filter((i) => i.userName === user.userName);

          result(null, { status: true, data: data });
        }
      }
    );
  } else {
    sql.query(
      "SELECT DISTINCT  idUserName as `id`, userName, password, role  FROM `tblUser`",
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
    if (isUseElasticSearch) {
      client.search(
        {
          index: "tbl_users",
          type: "myType",
          scroll: "100s",
          size: 500,
          body: {
            query: {
              match_all: {
              },
            },
            _source: true,
          },
        },
        function (err, resp) {
          if (err) {
            console.log("error: ", err);
            result(err, { status: false, data: [] });
          } else {
            let data = resp.hits.hits
              .map((i) => i._source);
  
            result(null, { status: true, data: data });
          }
        }
      );
    } else {
      sql.query(
        "SELECT DISTINCT  idUserName as `id`, userName, password, role  FROM `tblUser`",
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
