var request = require('request');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers.js');


exports.fetch = function(){
  console.log('fetching...');
   archive.readListOfUrls(function(url){
    request(url, function(error, response, body){
      fs.writeFileSync(archive.paths['archivedSites'] +'/'+ url, body);
    })
  });
}

archive.downloadUrls;


// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
