var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fetch = require('../workers/htmlfetcher.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

list = {};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(paths['list'], function(err, data){
    if(err){
      return console.log(err);
    }else{
      list = JSON.parse(data);
      console.log('readFile', list);
    }
  });
  if(callback){
    for (var url in list){
      console.log(url);
      callback(url);
    }
  }
};

exports.isUrlInList = function(url){
  this.readListOfUrls();
  return list[url];
};

exports.addUrlToList = function(url){
  list[url] = true;
  fs.writeFile(paths['list'], JSON.stringify(list), function(err, data){
    if(err){
      return console.log(err);
    }
    console.log('add to list: ', list)
  })
};

exports.isURLArchived = function(url){
  var archived = true;
  try {
  fs.readFileSync(paths['archivedSites'] +'/'+ url);
  }catch (e){
    archived = false;
  }
  return archived;
};

exports.downloadUrls = function(){
  fetch();
};
