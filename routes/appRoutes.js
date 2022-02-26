("use strict");
const jwt = require("jsonwebtoken");
module.exports = function (app) {
  var crawl = require("../controllers/crawlDataController");
  var login = require("../controllers/loginController");
  var elasticsearch = require("elasticsearch");
  var client = new elasticsearch.Client({
    host: "localhost:9200",
  });

  app.route("/getcrawl").post(crawl.getCrawlData);
  app.route("/getcrawl1").get(crawl.getCrawlData);
  app.route("/getLink").post(crawl.getCrawlLink);
  app.route("/dangkitaikhoan").post(login.saveUser);
  app.route("/login/taikhoan/:user/:pass").post(login.getUser);
  app.route("/kiemtrataikhoan/:user/:pass").post(login.getRole);
  app.route("/getAllUser/:user/:pass").post(login.getAllUser);
  app.route("/getsearchdatacrawl/:user/:pass").post(crawl.getsearchdatacrawl);
  app.route("/getDataOfId/:user/:pass").post(crawl.getDataOfId);
  app.route("/saveData").post(crawl.saveData);
  app.route("/getHistory").post(crawl.getHistory);
  // app.route("/getsearchdatacrawl").get(crawl.getsearchdatacrawl);
  app.route("/getlinkcrawl").post(crawl.getlinkcrawl);
  app.route("/getdatacrawl").post(crawl.getdatacrawl);

  app.route("/updatecrawl").post(crawl.updateData);
  app.route("/updatelinkcrawl").post(crawl.updatelinkcrawl);

  app.route("/view/:name").get((req, res) => {
    const fileName = req.params.name;
    console.log(fileName);
    readFile(fileName, res);
  });
  app.route("/").get('/', (req, res) => res.send('Hello World'));
  
  function readFile(fileName, res) {
    const path = require("path");
    const pathFile = path.resolve(`./public/images/${fileName}`);
    // console.log("=======>" + pathFile);
    let file = "No found file";

    const fs = require("fs");
    if (require("fs").existsSync(pathFile)) {
      let stat = fs.statSync(pathFile);

      res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Length": stat.size,
        "Content-Disposition": "attachment; filename=sound.mp3",
      });

      let readStream = fs.createReadStream(pathFile);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.on("open", function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
      });

      readStream.on("error", function (err) {
        res.end(err);
      });
    } else res.send(file);
  }
  async function sendfile(fileName, pathFile, res) {
    let file = "No found file";
    const fs = require("fs");
    // console.log(pathFile);
    if (require("fs").existsSync(pathFile)) {
      let stat = fs.statSync(pathFile);
      let type = "";
      let arr = fileName.split(".");
      switch (arr[arr.length - 1]) {
        case "aac":
          type = "audio/aac";
          break;
        case "abw":
          type = "application/x-abiword";
          break;
        case "arc":
          type = "application/x-freearc";
          break;
        case "avi":
          type = "video/x-msvideo";
          break;
        case "azw":
          type = "application/vnd.amazon.ebook";
          break;
        case "bin":
          type = "application/octet-stream";
          break;
        case "bmp":
          type = "image/bmp";
          break;
        case "bz":
          type = "application/x-bzip";
          break;
        case "bz2":
          type = "application/x-bzip2";
          break;
        case "csh":
          type = "application/x-csh";
          break;
        case "css":
          type = "text/css";
          break;
        case "csv":
          type = "text/csv";
          break;
        case "doc":
          type = "application/msword";
          break;
        case "docx":
          type =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          break;
        case "eot":
          type = "application/vnd.ms-fontobject";
          break;
        case "epub":
          type = "application/epub+zip";
          break;
        case "gz":
          type = "application/gzip";
          break;
        case "gif":
          type = "image/gif";
          break;
        case "htm":
          type = "text/html";
          break;
        case "html":
          type = "text/html";
          break;
        case "ico":
          type = "image/vnd.microsoft.icon";
          break;
        case "ics":
          type = "text/calendar";
          break;
        case "jar":
          type = "application/java-archive";
          break;
        case "jpeg":
          type = "image/jpeg";
          break;
        case "jpg":
          type = "";
          break;
        case "js":
          type = "text/javascript, per the following specifications:";
          break;
        case "json":
          type = "application/json";
          break;
        case "jsonld":
          type = "application/ld+json";
          break;
        case "mid":
          type = "audio/midi";
          break;
        case "midi":
          type = "audio/x-midi";
          break;
        case "mjs":
          type = "text/javascript";
          break;
        case "mp3":
          type = "audio/mpeg";
          break;
        case "mpeg":
          type = "video/mpeg";
          break;
        case "mpkg":
          type = "application/vnd.apple.installer+xml";
          break;
        case "odp":
          type = "application/vnd.oasis.opendocument.presentation";
          break;
        case "ods":
          type = "application/vnd.oasis.opendocument.spreadsheet";
          break;
        case "odt":
          type = "application/vnd.oasis.opendocument.text";
          break;
        case "oga":
          type = "audio/ogg";
          break;
        case "ogv":
          type = "video/ogg";
          break;
        case "ogx":
          type = "application/ogg";
          break;
        case "opus":
          type = "audio/opus";
          break;
        case "otf":
          type = "font/otf";
          break;
        case "png":
          type = "image/png";
          break;
        case "pdf":
          type = "application/pdf";
          break;
        case "php":
          type = "application/x-httpd-php";
          break;
        case "ppt":
          type = "application/vnd.ms-powerpoint";
          break;
        case "pptx":
          type =
            "application/vnd.openxmlformats-officedocument.presentationml.presentation";
          break;
        case "rar":
          type = "application/vnd.rar";
          break;
        case "rtf":
          type = "application/rtf";
          break;
        case "sh":
          type = "application/x-sh";
          break;
        case "svg":
          type = "image/svg+xml";
          break;
        case "swf":
          type = "application/x-shockwave-flash";
          break;
        case "tar":
          type = "application/x-tar";
          break;
        case "tif":
          type = "image/tiff";
          break;
        case "tiff":
          type = "image/tiff";
          break;
        case "ts":
          type = "video/mp2t";
          break;
        case "ttf":
          type = "font/ttf";
          break;
        case "txt":
          type = "text/plain";
          break;
        case "vsd":
          type = "application/vnd.visio";
          break;
        case "wav":
          type = "audio/wav";
          break;
        case "weba":
          type = "audio/webm";
          break;
        case "webm":
          type = "video/webm";
          break;
        case "webp":
          type = "image/webp";
          break;
        case "woff":
          type = "font/woff";
          break;
        case "woff2":
          type = "font/woff2";
          break;
        case "xhtml":
          type = "application/xhtml+xml";
          break;
        case "xls":
          type = "application/vnd.ms-excel";
          break;
        case "xlsx":
          type =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          break;
        case "xml":
          type = "text/xml";
          break;
        case "xul":
          type = "application/vnd.mozilla.xul+xml";
          break;
        case "zip":
          type = "application/zip";
          break;
        case "3gp":
          type = "video/3gpp";
          break;
        case "3g2":
          type = "video/3gpp2";
          break;
        case "7z":
          type = "application/x-7z-compressed";
          break;
        default:
          type = "audio/mpeg";
      }
      res.writeHead(200, {
        "Content-Type": type,
        "Content-Length": stat.size,
        // "Content-Disposition": "attachment; filename=" + fileName,
      });

      let readStream = fs.createReadStream(pathFile);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.on("open", function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
      });

      readStream.on("error", function (err) {
        res.end(err);
      });
    } else res.send(file);
  }
  app.route("/getAudio/:num").get((req, res) => {
    let fileName = req.params.num;
    const path = require("path");
    const pathFile = path.resolve(`./public/audio/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
  app.route("/test/elasticsearch/post").get((req, res) => {
    client.index(
      {
        index: "tbl_data_drawl",
        type: "myType",
        id: new Date().getTime().toString(),
        body: {
          idLinkCrawl: "1624990957158",
          idSubLinkCrawl: "112",
          idDataCrawl: "1624990957158_113_000",
          idTextLanguage2: "1624990957158_113_0011",
          textLanguage1: "Who are you",
        },
      },
      (err) => {
        if (err) {
          res.json({ msg: "false" });
        } else res.json({ msg: "true" });
      }
    );
  });
  app.route("/test/elasticsearch/post1").get((req, res) => {
    client.index(
      {
        index: "tbl_data_drawl",
        type: "myType",
        id: new Date().getTime().toString(),
        body: {
          idLinkCrawl: "1624990957158",
          idSubLinkCrawl: "112",
          idDataCrawl: "1624990957158_113_0011",
          idTextLanguage2: "",
          textLanguage1: "Bạn là ai",
        },
      },
      (err) => {
        if (err) {
          res.json({ msg: "false" });
        } else res.json({ msg: "true" });
      }
    );
  });
  app.route("/test/elasticsearch/get/:id").get((req, res) => {
    client.get(
      {
        index: "crawl_data",
        type: "myType",
        id: req.params.id,
      },
      (err, resq) => {
        if (err) {
          res.json({ msg: "false" });
        } else res.json({ msg: "true", data: resq._source });
      }
    );
  });
  app.route("/test/elasticsearch/get/").get((req, res) => {
    let allRecords = [];

    client.search(
      {
        index: "tbl_data_drawl",
        type: "myType",
        scroll: "10s",
        size: 1000,
        body: {
          query: {
            query_string: {
              query: "*Workplace Conflict*",
              fields: ["textLanguage1"],
            },
          },

          _source: true,
        },
      },
      function (err, resp) {
        res.json({ msg: "true", data: resp.hits.hits });
      }
    );
  });
};
