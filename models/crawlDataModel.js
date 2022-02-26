"user strict";
var sql = require("./db.js");
var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host: "localhost:9200",
});
var Crawl = function (crawl) {
  this.linkCrawl = crawl.linkCrawl;
  this.subLinkCrawl = crawl.subLinkCrawl;
  this.data = crawl.data;
};
const isUseElasticSearch = true;
Crawl.savehistorycrawl = (crawl, result) => {
  if (isUseElasticSearch) {
    client.index(
      {
        index: "tbl_link_crawl",
        type: "myType",
        id: crawl.idLinkCrawl.toString(),
        body: {
          idUser: crawl.idUser,
          idLinkCrawl: crawl.idLinkCrawl,
          dateCrawl: crawl.dateCrawl,
          linkCrawl: crawl.linkCrawl,
          isDelete: crawl.isDelete,
          index: crawl.index,
        },
      },
      (err) => {
        if (err) {
          result(err, { status: false });
        } else result(null, { status: true });
      }
    );
  } else {
    sql.query("INSERT INTO tbllinkcrawl  set ?", crawl, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, { status: false });
      } else {
        result(null, { status: true });
      }
    });
  }
};
Crawl.updatelinkcrawl = (item, id, result) => {
  if (isUseElasticSearch) {
    console.log(item);
    client.index(
      {
        index: "tbl_link_crawl",
        type: "myType",
        id: item.id.toString(),
        body: {
          idUser: id,
          idLinkCrawl: item.id,
          dateCrawl: item.date,
          linkCrawl: item.link,
          isDelete: item.current,
          index: item.index,
        },
      },
      (err) => {
        console.log(err);
        if (err) {
          result(err, { status: false });
        } else result(null, { status: true });
      }
    );
  } else {
    sql.query(
      "UPDATE tblSubLinkCrawl set isDelete = 1 WHERE  idSubLinkCrawl = ?",
      item.id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false });
        } else {
          result(null, { status: true });
        }
      }
    );
  }
};
Crawl.gethistorycrawl = (idUser, result) => {
  console.log(idUser);
  if (isUseElasticSearch) {
    client.search(
      {
        index: "tbl_link_crawl",
        type: "myType",
        scroll: "100s",
        size: 500,
        body: {
          query: {
            match: {
              idUser: idUser,
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
            .map((i) => i._source)
            .map((i) => {
              return {
                id: i.idLinkCrawl,
                date: i.dateCrawl,
                link: i.linkCrawl,
                current: i.isDelete,
                index: i.index,
              };
            })
            .filter((i) => i.current === 0);
          result(null, { statusF: true, data: data });
        }
        // res.json({ msg: "true", data: resp.hits.hits[0]._source });
      }
    );
  } else {
    sql.query(
      "SELECT DISTINCT  idLinkCrawl as `id`, dateCrawl as `date`, linkCrawl as `link`, isDelete as `current`, `index` FROM `tbllinkcrawl`",
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
Crawl.getlinkcrawl = (id, result) => {
  if (isUseElasticSearch) {
    client.search(
      {
        index: "tbl_sub_link_crawl",
        type: "myType",
        scroll: "100s",
        size: 500,
        body: {
          query: {
            match: {
              idLinkCrawl: id,
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
            .map((i) => i._source)
            .map((i) => {
              return {
                id: i.idSubLinkCrawl,
                date: i.dateCrawl,
                Link: i.subLink,
                current: i.isDelete,
                isDelete: i.isDelete,
              };
            });
          result(null, { statusF: true, data: data });
        }
        // res.json({ msg: "true", data: resp.hits.hits[0]._source });
      }
    );
  } else {
    sql.query(
      "SELECT DISTINCT idSubLinkCrawl as id, dateCrawl as `date`, subLink as Link, l.isDelete as `current`,l.isDelete FROM  tblSubLinkCrawl l INNER JOIN tbllinkcrawl h ON h.idLinkCrawl=l.idLinkCrawl WHERE h.idLinkCrawl=?",
      id,
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
Crawl.savelistlinkcrawl = (crawl, result) => {
  if (isUseElasticSearch) {
    client.index(
      {
        index: "tbl_sub_link_crawl",
        type: "myType",
        id: crawl.idSubLinkCrawl.toString(),
        body: {
          ...crawl,
        },
      },
      (err) => {
        console.log(err);
        if (err) {
          result(err, { status: false });
        } else result(null, { status: true });
      }
    );
  } else {
    sql.query("INSERT INTO tblSubLinkCrawl  set ?", crawl, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, { status: false });
      } else {
        result(null, { status: true });
      }
    });
  }
};
Crawl.updatelistlinkcrawl = (item, id, result) => {
  if (isUseElasticSearch) {
    console.log(item);
    client.index(
      {
        index: "tbl_sub_link_crawl",
        type: "myType",
        id: item.id.toString(),
        body: {
          idLinkCrawl: id,
          idSubLinkCrawl: item.id.toString(),
          index: item.index,
          isDelete: item.current,
          subLink: item.Link,
        },
      },
      (err) => {
        console.log(err);
        if (err) {
          result(err, { status: false });
        } else result(null, { status: true });
      }
    );
  } else {
    sql.query(
      "UPDATE tblSubLinkCrawl set isDelete = 1 WHERE  idSubLinkCrawl = ?",
      item.id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false });
        } else {
          result(null, { status: true });
        }
      }
    );
  }
};
Crawl.getdatacrawl = (id, result) => {
  if (isUseElasticSearch) {
    client.search(
      {
        index: "tbl_data_drawl",
        type: "myType",
        scroll: "100s",
        size: 500,
        body: {
          query: {
            match: {
              idSubLinkCrawl: id,
            },
          },
          _source: true,
        },
      },
      function (err, resp) {
        if (err) {
          result(err, { status: false, data: [] });
        } else {
          let data = resp.hits.hits
            .map((i) => i._source)
            .map((i) => {
              return {
                idLink: i.idSubLinkCrawl,
                id: i.idDataCrawl,
                idtext: i.idTextLanguage2,
                text: i.textLanguage1,
                index: i.index,
                current: i.isDelete,
              };
            })
            .filter((i) => i.current === 0);
          result(null, { status: true, data: data });
        }
        // res.json({ msg: "true", data: resp.hits.hits[0]._source });
      }
    );
  } else {
    sql.query(
      "SELECT DISTINCT idSubLinkCrawl as `idLink`, idDataCrawl as `id`,idTextLanguage2 as `idtext`, textLanguage1 as `text` , `index` FROM `tblDataCrawl` WHERE idSubLinkCrawl=?",
      id,
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
Crawl.getDataOfId = (data, result) => {
  if (isUseElasticSearch) {
    client.search(
      {
        index: "tbl_data_drawl",
        type: "myType",
        scroll: "100s",
        size: 500,
        body: {
          query: {
            query_string: {
              query: "*".concat(data.id).concat("*"),
              fields: [
                data.idtext !== null &&
                data.idtext !== undefined &&
                data.idtext !== ""
                  ? "idDataCrawl"
                  : "idTextLanguage2",
              ],
            },
          },
          _source: true,
        },
      },
      function (err, resp) {
        if (err) {
          result(err, { status: false, data: {} });
        } else {
          let data = resp.hits.hits
            .map((i) => i._source)
            .map((i) => {
              return {
                idLink: i.idSubLinkCrawl,
                id: i.idDataCrawl,
                idtext: i.idTextLanguage2,
                text: i.textLanguage1,
                index: i.index,
              };
            });
          result(null, { status: true, data: data[0] });
        }
      }
    );
  } else {
    sql.query(
      "SELECT DISTINCT idSubLinkCrawl as `idLink`, idDataCrawl as `id`,idTextLanguage2 as `idtext`, textLanguage1 as `text` , `index` FROM `tblDataCrawl` WHERE idSubLinkCrawl=?",
      id,
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
Crawl.getsearchdatacrawl = (text, result) => {
  if (isUseElasticSearch) {
    client.search(
      {
        index: "tbl_data_drawl",
        type: "myType",
        scroll: "100s",
        size: 500,
        body: {
          query: {
            query_string: {
              query: "*".concat(text).concat("*"),
              fields: ["textLanguage1"],
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
            .map((i) => i._source)
            .map((i) => {
              return {
                idLink: i.idSubLinkCrawl,
                id: i.idDataCrawl,
                idtext: i.idTextLanguage2,
                text: i.textLanguage1,
                index: i.index,
              };
            })
            .filter((i) => i.text.indexOf(text) >= 0);
          result(null, { status: true, data: data });
        }
        // res.json({ msg: "true", data: resp.hits.hits[0]._source });
      }
    );
  } else {
    sql.query(
      "SELECT DISTINCT idSubLinkCrawl as `idLink`, idDataCrawl as `id`,idTextLanguage2 as `idtext`, textLanguage1 as `text` , `index` FROM `tblDataCrawl` WHERE idSubLinkCrawl=?",
      id,
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
Crawl.savedatacrawl = (crawl, result) => {
  if (isUseElasticSearch) {
    client.index(
      {
        index: "tbl_data_drawl",
        type: "myType",
        id: crawl.idDataCrawl,
        body: {
          ...crawl,
        },
      },
      (err) => {
        if (err) {
          result(err, { status: false });
        } else result(null, { status: true });
      }
    );
  } else {
    sql.query("INSERT INTO tblDataCrawl  set ?", crawl, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, { status: false });
      } else {
        result(null, { status: true });
      }
    });
  }
};
Crawl.deletedatacrawl = (id, result) => {
  if (isUseElasticSearch) {
  } else {
    sql.query(
      "DELETE FROM tblDataCrawl  WHERE idSubLinkCrawl=?",
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false });
        } else {
          result(null, { status: true });
        }
      }
    );
  }
};
module.exports = Crawl;
