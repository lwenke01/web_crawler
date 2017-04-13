'use strict';

// var request = require('request');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
var _id,company,name, title, yearStart,image,description,link, source, lastUpdated;
var json = {_id: '', company: '',name: '',title: '', yearStart:'', image: '',description:'',  link:'', source:'', lastUpdated:''};


//company lists
var company1 = {url:'http://www.merck.com/about/leadership/executive-committee/home.html', name: 'Merck', root:'http://www.merck.com', category: 'contact'};
var company2 = {url:'http://www.pfizer.com/about/leadership-and-structure/meet-executive-leaders', name: 'pfizer', root: 'http://www.pfizer.com',category: 'contact'};
var company3 = {url:'http://www.gsk.com/en-gb/about-us/corporate-executive-team/', name: 'GSK', root: 'http://www.gsk.com,category'};



// company1
request(company1.url, function(error, response, body) {
  if(error) {
    console.log('Error: ' + error);
  }
  console.log('Status code: ' + response.statusCode + ': ' + company1.name);

  var $ = cheerio.load(body);



  $('div.content_container > div.container > .row >.column_middle >.row').each(function( index ){

    var sumArray = [];
    $(this).find('div.col-lg-9.col-md-9.col-sm-12 > ul > li').each(function( index){
      var li_text = $(this).text().trim();
      sumArray.push(li_text);
    });
    var name =  $(this).find('div.col-lg-3.col-md-3.col-sm-12 > img').attr('alt');

    var title = sumArray[0]
    var image = $(this).find('div.col-lg-3.col-md-3.col-sm-12 > img').attr('src');
    var description =sumArray[0];
    var link = $(this).find('div.col-lg-9.col-md-9.col-sm-12 > a').attr('href');

    var source = company1.url;
    var un = image.split('/');
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
    json._id = un[un.length -1].split('.')[0].toLowerCase();
        json.company = company1.name;
    json.name = name.toProperCase();
    if(titleArray.length === 0){
      json.title = title.toProperCase();
    } else {
      json.title = titleArray.join(',').toProperCase();

    }
    json.yearStart = yearStart.split(' ').join('');
    json.image = 'http://www.merck.com' + image;
    json.description = sumArray;
    json.link = link;
    json.source = source
    json.lastUpdated = lastUpdated;
    //print to json

    fs.appendFileSync('app/output/leadership.json', JSON.stringify(json) + '\n');

  });
});

//company2
request(company2.url, function(error, response, body) {
  if(error) {
    console.log('Error: ' + error);
  }
  console.log('Status code: ' + response.statusCode);
  var $ = cheerio.load(body);

  $('.profile-media-block-container2 > .profile-media-block2.executive-block').each(function( index ){

    var _id = $(this).find('img').attr('alt').split('.')[0];
    var name =  $(this).find('h2.profile-media-block-title').text().trim().split(',')[0];
    var title =  $(this).find('span.profile-media-block-subtitle').text().trim();
    var title2 = $(this).text().trim().split('\r\n\t\t')[1];

    var image = $(this).find('img').attr('src');
    var description ='hey';
    var link = $(this).find('a.profile-media-block-link').attr('href');
    var source = company2.url;
    var lastUpdated = new Date();

    json._id = _id;
        json.company = company2.name;
    json.name = name.toProperCase();
    if(!title) {
      json.title = title2.toProperCase();
    } else {
      json.title = title.toProperCase();
    }

    json.yearStart = '';
    json.image =  company2.root + image;
    json.description = description;
    json.link = company2.root + link;

    json.source = source;
    json.lastUpdated = lastUpdated;
    //print to json

    fs.appendFileSync('app/output/leadership.json', JSON.stringify(json) + '\n');

  });
});

request(company3.url, function(error, response, body) {
  if(error) {
    console.log('Error: ' + error);
  }
  console.log('Status code: ' + response.statusCode);

  var $ = cheerio.load(body);
  $('.main-container > ul.grid-listing__list > li.grid-listing__item').each(function( index ){

    var name =  $(this).find('.grid-listing__content > h2').text().trim();
    var title =  $(this).find('.grid-listing__content > p').text().trim();
    var title2 = $(this).text().trim().split('\r\n\t\t')[1];

    var image = $(this).find(' a > div.grid-listing__img > img').attr('data-src');

    var description ='hey';
    var link = $(this).find('a').attr('href');
    var source = company3.url;
    var lastUpdated = new Date();
    var id_spl = link.split('/');
    var _id = id_spl[id_spl.length -2];

    json._id = _id;
    json.company = company3.name;
    json.name = name.toProperCase();
    if(!title) {
      json.title = title2.toProperCase();
    } else {
      json.title = title.toProperCase();
    }

    json.yearStart = '';
    json.image = company3.root +  image;
    json.description = description;
    json.link = company3.root + link;

    json.source = source;
    json.lastUpdated = lastUpdated;
    //print to json

    fs.appendFileSync('app/output/leadership.json', JSON.stringify(json) + '\n');

  });
});
