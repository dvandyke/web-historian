var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var staticAssets = {
  '/index.html' : {path: archive.paths['siteAssets'] + '/index.html', type: 'text/html'},
  '/styles.css' : {path: archive.paths['siteAssets'] + '/styles.css', type: 'text/css'},
  '/favicon.ico' : {path: archive.paths['siteAssets'] + '/favicon.ico', type: 'image/ico'},
  '/loading.html' : {path: archive.paths['siteAssets'] + '/loading.html', type: 'text/html'},

};

exports.serveAssets = function(res, asset, callback) {
  var url = asset;

  url = url === '/' ? '/index.html' : url;
  if (staticAssets[url] !== undefined){
    serveStatic(url, res, callback);
  } else if (url.indexOf("www.") !== -1 ){
    serveArchive(url, res, callback);
  } else{
    console.log('404: ' + url);
    callback(res, 404, headers, undefined);
  }
};


var serveStatic = function(url, res, callback){
  fs.readFile(staticAssets[url].path, function(err, data){
    if(err){
      return console.log('error', err);
    }else{
      var code = url === '/loading.html' ? 302 : 200;
      callback(res, code, staticAssets[url].type, data);
    }
  });
};

exports.serveArchive = function(url, res, callback){
  fs.readFile(archive.paths['archivedSites']+'/'+url, function(err, data){
    if(err){
      callback(res, 404, headers, data)
      return console.log('error', err);
    }else{
      callback(res, 200, headers, data);
    }
  });

};

// As you progress, keep thinking about what helper functions you can put here!
