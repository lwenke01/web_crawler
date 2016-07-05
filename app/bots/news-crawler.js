'use strict';

var request = require('request');
var cheerio = require('cheerio');
const fs = require('fs');



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

//buzz-feed

request("http://www.buzzfeed.com", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('div.col1 > ul > li.grid-posts__item').each(function( index ) {
    var title = $(this).find('h2 > a').text().trim();
    var author = $(this).find('div.small-meta > div:nth-child(1) > a').text().trim();
    var responses = $(this).find('div.small-meta > div:nth-child(3) > a').text();
    console.log(title);
    console.log(author);
    console.log(responses);
    fs.appendFileSync('app/output/buzzfeed.txt', title + '\n' + author + '\n' + responses + '\n');
  });

});

//us-weekly
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
    fs.appendFileSync('app/output/usWeekly.txt', title + '\n' + date + '\n' );
  });

});
