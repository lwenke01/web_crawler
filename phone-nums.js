'use strict';

var request = require('request');
var cheerio = require('cheerio');
const fs = require('fs');
//phone number regex
var re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/;
var str = '(206)-383-1273';
var m;

if ((m = re.exec(str)) !== null) {
    if (m.index === re.lastIndex) {
        re.lastIndex++;
    }
console.log(m[0])
}

//reddit
request("https://www.reddit.com", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('div#siteTable > div.link').each(function( index ) {
    var title = $(this).find('p.title > a.title').text().trim();
    var score = $(this).find('div.score.unvoted').text().trim();
    var user = $(this).find('a.author').text().trim();
    console.log("Title: " + title);
    console.log("Score: " + score);
    console.log("User: " + user);
    fs.writeFile('app/output/reddit.txt',  title + '\n' + score + '\n' + user + '\n');
  });

});
