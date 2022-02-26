("use strict");
const jwt = require("jsonwebtoken");
module.exports = function (app) {
  var crawl = require("../controllers/crawlDataController");
  var login = require("../controllers/loginController");
  app.get('/', (req, res) => res.send('Hello World'));
  
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
  app.get('/getAllUser',login.getAllUser);
  app.get("/getAudio/:num",(req, res) => {
    let fileName = req.params.num;
    const path = require("path");
    const pathFile = path.resolve(`./public/audio/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
  app.get("/getImage/:fileName",(req, res) => {
    let fileName = req.params.fileName;
    const path = require("path");
    const pathFile = path.resolve(`./public/images/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
  app.get("/getCss/:fileName",(req, res) => {
    let fileName = req.params.fileName;
    const path = require("path");
    const pathFile = path.resolve(`./public/css/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
  app.get("/getJs/:fileName",(req, res) => {
    let fileName = req.params.fileName;
    const path = require("path");
    const pathFile = path.resolve(`./public/js/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
};
