"use strict";
var crawl = require("../models/crawlDataModel");
exports.getCrawlData = (req, res) => {
  const rp = require("request-promise");
  const cheerio = require("cheerio");
  const fs = require("fs");
  const URL = req.body.link;
  // const URL = "http://vietanhsongngu.com/con-khoang-100-cong-dan-viet-nam-con-mac-ket-lai-o-an-do--2263.htm";
  const options = {
    uri: URL,
    transform: function (body) {
      return cheerio.load(body);
    },
  };
  (async function crawler() {
    let dataRes = { list: [], data: [] };
    try {
      var $ = await rp(options);
    } catch (error) {
      res.json({ data: dataRes });
    }

    try {
      const tableContent = $("a");

      let data = [];
      for (let i = 0; i < tableContent.length; i++) {
        let link = "";
        link = $(tableContent[i]).attr("href");
        data.push(link);
      }
      data = data.filter((item) => {
        return (
          item !== null &&
          item !== "null" &&
          item !== undefined &&
          item.indexOf(req.body.link) === 0 &&
          item.indexOf("#") === -1
        );
      });
      dataRes.list = data;
    } catch (error) { }
    try {
      // const tableContent = $(".scroll-sub div > span");
      const tableContent = $(req.body.parent + " > " + req.body.children);
      // const tableContent = $(req.body.parent).find(req.body.children);

      let data = {
        id: new Date().getTime(),
        link: req.body.link,
        data: [],
        current: 0,
        index: 0,
      };

      for (let i = 0; i < tableContent.length; i++) {
        const link = $(tableContent[i]).text();
        console.log(link);

        data.data.push({
          id: new Date().getTime(),
          text: link,
          current: 0,
          index: 0,
        });
      }
      if (data !== undefined && data.data !== undefined && data.data.length > 0)
        data.data = data.data
          .map((item, index) => {
            item.id = "".concat(item.id).concat("_").concat(index);
            if (
              item.text !== null &&
              item.text !== "null" &&
              item.text !== undefined &&
              item.text.trim() !== ""
            )
              return item;
          })
          .filter(
            (item) =>
              item !== null &&
              item !== undefined &&
              item.text !== null &&
              item.text !== "null" &&
              item.text !== undefined &&
              item.text.trim() !== ""
          );
      dataRes.data = data;
    } catch (error) { }
    res.json({ data: dataRes });
  })();
};
exports.getCrawlLink = (req, res) => {
  const rp = require("request-promise");
  const cheerio = require("cheerio");
  const URL =
    //   "http://vietanhsongngu.com/";
    req.body.link;
  const options = {
    uri: URL,
    transform: function (body) {
      return cheerio.load(body);
    },
  };
  (async function crawler() {
    try {
      var $ = await rp(options);
    } catch (error) {
      res.json({ list: [] });
    }
    try {
      const tableContent = $("a");

      let data = [];
      for (let i = 0; i < tableContent.length; i++) {
        let link = "";
        link = $(tableContent[i]).attr("href");
        data.push(link);
      }
      data = data.filter((item) => {
        return (
          item !== null &&
          item !== "null" &&
          item !== undefined &&
          item.indexOf(req.body.link) === 0 &&
          item.indexOf("#respond") === -1
        );
      });
      res.json({ list: data });
    } catch (error) {
      res.json({ list: [] });
    }
  })();
};
exports.saveData = (req, res) => {
  let data = req.body;
  //console.log(data.linkCrawl);
  if (data.type === "link") {
    crawl.savehistorycrawl(data.linkCrawl, (err, result) => {
      if (err) res.json({ status: false });
      else if (result.status)
        data.subLinkCrawl.map((item) =>
          crawl.savelistlinkcrawl(item, (err, resultA) => {
            if (err) res.json({ status: false });
            else return true;
          })
        );
      res.json({ status: true });
    });
  } else if (data.type === "data") {
    // if (data.data.current === 1) //res.json({ status: false });
    // else
    crawl.savedatacrawl(
      {
        idSubLinkCrawl: data.data.idLink,
        idDataCrawl: data.data.id,
        idTextLanguage2: data.data.idtext,
        textLanguage1: data.data.text,
        index: data.data.index,
        isDelete: data.data.current,
      },
      (err, result) => {
        if (err) res.json({ status: false });
        else res.json({ status: true });
      }
    );
  } else res.json({ status: false });
};
exports.updatelinkcrawl = (req, res) => {
  let data = req.body.data;
  console.log(data);

  if (data.linkisdelete.length > 0)
    data.linkisdelete.map((item) =>
      crawl.updatelinkcrawl(item, req.body.data.id, (err, result) => {
        if (err) res.json({ status: false });
        else res.json({ status: true });
      })
    );
};
exports.updateData = (req, res) => {
  let data = req.body.data;

  if (data.linkisdelete!==undefined && data.linkisdelete.length > 0)
    data.linkisdelete.map((item) =>
      crawl.updatelistlinkcrawl(item, req.body.data.id, (err, result) => {
        if (err) res.json({ status: false });
        else return true;
      })
    );
  if (data.dataUpdate !== undefined)
    data.dataUpdate.map((item) => {
      crawl.deletedatacrawl(item[0].idLink, (err, result) => {
        if (err) res.json({ status: false });
        else
          item.map((i) => {
            crawl.savedatacrawl(
              {
                idSubLinkCrawl: i.idLink,
                idDataCrawl: i.id,
                idTextLanguage2: i.idtext,
                textLanguage1: i.text,
                index: i.index,
              },
              (err, result) => {
                if (err) res.json({ status: false });
              }
            );
          });
      });
    });

  res.json({ status: true });
};
exports.getHistory = (req, res) => {
  console.log(req.body.idUser);
  if (req.body.key === "111111111") {
    crawl.gethistorycrawl(req.body.idUser, (err, result) => {
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getsearchdatacrawl = (req, res) => {
  if (req.body.key === "111111111") {
    crawl.getsearchdatacrawl(req.body.textSearch, (err, result) => {
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getlinkcrawl = (req, res) => {
  if (req.body.key === "111111111") {
    crawl.getlinkcrawl(req.body.id, (err, result) => {
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getdatacrawl = (req, res) => {
  if (req.body.key === "111111111") {
    crawl.getdatacrawl(req.body.id, (err, result) => {
      if (err) res.json({ data: { status: false, data: [] } });
      else
        res.json({
          data: {
            status: true,
            data: result,
          },
        });
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getsearchdatacrawl = (req, res) => {
  if (req.body.key === "111111111") {
    crawl.getsearchdatacrawl(req.body.text, (err, result) => {
      if (err) res.json({ data: result });
      else {
        res.json({ data: result.data });
      }
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getDataOfId = (req, res) => {
  if (req.body.key === "111111111") {
    crawl.getDataOfId(req.body.data, (err, result) => {
      if (err) res.json({ data: result });
      else {
        res.json({ data: result.data });
      }
    });
  } else res.json({ data: { status: false, data: {} } });
};
