var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("http://www.usmagazine.com/celebrity-news", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('div.hub-articles-feed-content').each(function( index ) {
    var title = $(this).find('div.hub-articles-feed-article-content-inner > header > h2').text().trim();
    var date = $(this).find('div.hub-articles-feed-article-content-inner > p').text().trim();
    // var user = $(this).find('a.author').text().trim();
    console.log("Title: " + title);
    console.log("date: " + date);
    // console.log("User: " + user);
    fs.appendFileSync('usWeekly.txt', title + '\n' + date + '\n' );
  });

});
