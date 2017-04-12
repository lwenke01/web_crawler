'use strict';

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//blog lists
var blog1 = {url:"http://www.merck.com/about/leadership/executive-committee/home.html", name: "Merck", category: "contact"};
var blog2 = {url:"https://davidwalsh.name", name: "David Walsh", category: "contact"};


//codinghorror
request(blog1.url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  var name, title, yearStart,image,description,link, source, lastUpdated;
  var json = {name: "",title: "", yearStart:"", image: "",description:"",  link:"", source:"", lastUpdated:""};


  $('div.content_container > div.container > .row >.column_middle >.row').each(function( index ){

var sumArray = [];
$(this).find('div.col-lg-9.col-md-9.col-sm-12 > ul > li').each(function( index){
  var li_text = $(this).text().trim();
  sumArray.push(li_text);
});
    var name =  $(this).find('div.col-lg-3.col-md-3.col-sm-12 > img').attr('alt');
    var title = sumArray[0]
    var image = "http://www.merck.com" + $(this).find('div.col-lg-3.col-md-3.col-sm-12 > img').attr('src');
    var description =sumArray[0];
    var link = $(this).find('div.col-lg-9.col-md-9.col-sm-12 > a').attr('href');

    var source = blog1.url;
    var lastUpdated = new Date();
    var titleArray = [];
    var n =title.split(',');
    var yearStart = n.pop();
    if(n[n.length -1] === ' Inc.'){
      n.pop();
    }
    if(n[n.length -1] === ' Merck & Co.'){
      n.pop();
    }

    var nlen = n.length;

    n.forEach(function(v, i){
        if(v !== ' Merck & Co.' || ' Inc.'){

        titleArray.push(v)
        }
      })

      // console.log(i);
      // if(v !=='Inc.' || 'Merck & Co.' ){
      //       titleArray.push(v);
      //
      //     }



    // var nLink = link.split('/');
    // var newLink = nLink.pop().split(' ').join('%20');
//save as JSON data
  json.name = name;
if(titleArray.length === 0){
  json.title = title;
} else {
  json.title = titleArray.join(',');

}
json.yearStart = yearStart.split(' ').join('');
      json.image = image;
      json.description = sumArray;
      json.link = link;

      json.source = source
      json.lastUpdated = lastUpdated;
  //print to json
      // $('#stories').appendTo(json);
       fs.appendFileSync('app/output/leadership.json', JSON.stringify(json) + '\n');

  });
});

//davidwalsh
// request(blog2.url, function(error, response, body) {
//   if(error) {
//     console.log("Error: " + error);
//   }
//   console.log("Status code: " + response.statusCode);
//
//   var $ = cheerio.load(body);
//
//   var title, description, date, link, source;
//   var json = {title: "", description:"", date:"", link:"", source:""};
//
//   $('#main > ul.post-list > li').each(function( index ) {
//     var title = $(this).find('span > img').attr('alt');
//     var description = $(this).find('div.preview > p').text().trim().slice(0,100);
//     var date = $(this).find('div.meta > time').text().trim();
//     var link = $(this).attr('data-url');
//     var source = blog2.name;
//
// //save as JSON data
//       json.title = title;
//       json.description = description;
//       json.date = date;
//       json.link = link;
//       json.source = source;
//   //print to json
//        fs.appendFileSync('app/output/tech.json', JSON.stringify(json) + '\n');
//   });
// });
