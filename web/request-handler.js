var path = require('path');
var archive = require('../helpers/archive-helpers');
var getHelper = require("./http-helpers.js");
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === "POST" ){
    var url = '';
    req.on('data', function(chunk){
      url += chunk;
      url = url.slice(4);
      console.log(url);
    if(archive.isURLArchived(url)){
      getHelper.serveArchive(url, res, writeOut);
    }else{
      if(!archive.isUrlInList(url)){
        archive.addUrlToList(url);
      }
      getHelper.serveAssets(res, '/loading.html', writeOut)
    }
    })
  }else if (req.method === "GET"){
    getHelper.serveAssets(res, req.url, writeOut);
  }
};

var writeOut = function(res, statusCode, headers, data){
  res.writeHead(statusCode, headers);
  res.end(data);
}
