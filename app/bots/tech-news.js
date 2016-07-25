'use strict';

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//blog lists
var blog1 = {url:"https://blog.codinghorror.com", name: "Coding Horror", category: "blog"};
var blog2 = {url:"https://davidwalsh.name", name: "David Walsh", category: "blog"};


//codinghorror
request(blog1.url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  var title, description, date, link, source;
  var json = {title: "", description:"", date:"", link:"", source:""};

  $('main.content > article.post').each(function( index ) {
    var title = $(this).find('header.post-header > h2.post-title').text().trim();
    var description = $(this).find('section.post-content > p').text().trim().slice(0,100);
    var date = $(this).find('header.post-header > span.post-meta').text().trim();
    var link = blog1.url + $(this).find('header.post-header > h2.post-title > a' ).attr('href');
    var source = blog1.name;

//save as JSON data
      json.title = title;
      json.description = description;
      json.date = date;
      json.link = link;
      json.source = source;
  //print to json
       fs.appendFileSync('app/output/tech.json', JSON.stringify(json) + '\n');
  });
});

//davidwalsh
request(blog2.url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  var title, description, date, link, source;
  var json = {title: "", description:"", date:"", link:"", source:""};

  $('#main > ul.post-list > li').each(function( index ) {
    var title = $(this).find('span > img').attr('alt');
    var description = $(this).find('div.preview > p').text().trim().slice(0,100);
    var date = $(this).find('div.meta > time').text().trim();
    var link = $(this).attr('data-url');
    var source = blog2.name;

//save as JSON data
      json.title = title;
      json.description = description;
      json.date = date;
      json.link = link;
      json.source = source;
  //print to json
       fs.appendFileSync('app/output/tech.json', JSON.stringify(json) + '\n');
  });
});
