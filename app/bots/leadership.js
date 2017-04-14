'use strict';


var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var merckJson = path.resolve(__dirname, './output/company_profiles/merck.json');


String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
var _id,company,name, title, yearStart,image,description,link, source, lastUpdated;
var json = {_id: '', company: '',exe_name: '',title: '', yearStart:'', image: '',description:'',  link:'', source:'', lastUpdated:''};


class Company {
  constructor(name, url, root, jFile){
    this.name = name;
    this.url = url;
    this.root = root;
    this.jfile = jFile;
  }
};
var co_1 = new Company('Merck', 'http://www.merck.com/about/leadership/executive-committee/home.html','http://www.merck.com', merckJson);
var co_2 = new Company('pfizer', 'http://www.pfizer.com/about/leadership-and-structure/meet-executive-leaders','http://www.pfizer.com');
var co_3 = new Company('gsk', 'http://www.gsk.com/en-gb/about-us/corporate-executive-team/','http://www.gsk.com');
// company1
$('#getNew').click(function(){
  console.log('clicked');
jquery.when(req1()).done(function(){
  getJson(co_1.jFile)
})

})

var getJson = function(file) {
  $.getJSON(file, function(data) {
          var output;

          $.each(data, function(key, val) {
            console.log(val);
              output += '<div class="tRow">';
              output += '<h3 class="rowHead">' + val.exe_name + '</h3>';
              // output += '<td class="td_time">' + val.title + '</td>';
              // output += '<td class="td_idcode searchA"><a id="rec_' + val.RecordID + '" class="rtI"  data="' + val.RecordID + '" >' + val.idcode + '</a></td>';
              // // output +=   '<td>'+val.createdBy +'</td>';
              // var x = new Date(val.LastModifiedDate);
              // var lastModDate = x.getDate() + '-' + (x.getMonth() + 1) + '-' + x.getFullYear();
              // output += '<td class="td_lastMod">' + val.LastModifiedBy + '</td>';
              // output += '<td class="td_dateMod">' + lastModDate + '</td>';
              output += '</div>';
          });
          $('#stories').html(output);

      });

}

var req1 = function(){

request(co_1.url, function(error, response, body) {
  if(error) {
    console.log('Error: ' + error);
  }
  console.log('Status code: ' + response.statusCode + ': ' + co_1.name);

  var $ = cheerio.load(body);

  $('div.content_container > div.container > .row >.column_middle >.row').each(function( index ){
    var sumArray = [];
    $(this).find('div.col-lg-9.col-md-9.col-sm-12 > ul > li').each(function( index){
      var li_text = $(this).text().trim();
      sumArray.push(li_text);
    });
    var exe_name =  $(this).find('div.col-lg-3.col-md-3.col-sm-12 > img').attr('alt');

    var title = sumArray[0]
    var image = $(this).find('div.col-lg-3.col-md-3.col-sm-12 > img').attr('src');
    var description =sumArray[0];
    var link = $(this).find('div.col-lg-9.col-md-9.col-sm-12 > a').attr('href');




    var source = co_1.url;
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
        json.company = co_1.name;
    json.exe_name = exe_name.toProperCase();
    if(titleArray.length === 0){
      json.title = title.toProperCase();
    } else {
      json.title = titleArray.join(',').toProperCase();

    }
    json.yearStart = yearStart.split(' ').join('');
    json.image = co_1.root + image;
    json.description = sumArray;
    if(typeof link === 'undefined'){
      json.link = link;

    } else {
      var splitLink = link.split('/');
      var newLink = splitLink[splitLink.length -1].split(' ').join('%20');
      json.link = co_1.root + '/about/leadership/executive-committee/' +newLink;

    }
    json.source = source
    json.lastUpdated = lastUpdated;
  //   //print to json
  var newCo = co_1.name.toLowerCase();




    fs.appendFileSync('app/output/company_profiles/'+ newCo + '.json', JSON.stringify(json) + '\n');
  });

});

}
//company2
// request(company2.url, function(error, response, body) {
//   if(error) {
//     console.log('Error: ' + error);
//   }
//   console.log('Status code: ' + response.statusCode);
//   var $ = cheerio.load(body);
// var newArray = [];
//   $('.profile-media-block-container2 > .profile-media-block2.executive-block').each(function( index ){
//
//     var _id = $(this).find('img').attr('alt').split('.')[0];
//     var name =  $(this).find('h2.profile-media-block-title').text().trim().split(',')[0];
//     var title =  $(this).find('span.profile-media-block-subtitle').text().trim();
//     var title2 = $(this).text().trim().split('\r\n\t\t')[1];
//
//     var image = $(this).find('img').attr('src');
//     var description ='hey';
//     var link = $(this).find('a.profile-media-block-link').attr('href');
//     var source = company2.url;
//     var lastUpdated = new Date();
//
//     json._id = _id;
//         json.company = company2.name;
//     json.name = name.toProperCase();
//     if(!title) {
//       json.title = title2.toProperCase();
//     } else {
//       json.title = title.toProperCase();
//     }
//
//     json.yearStart = '';
//     json.image =  company2.root + image;
//     json.description = description;
//     json.link = company2.root + link;
//
//     json.source = source;
//     json.lastUpdated = lastUpdated;
//     //print to json
//
//
//
//     newArray.push( JSON.stringify(json )+ '\n' );
//
//     var newCo = company2.name.toLowerCase();
//     fs.appendFileSync('app/output/company_profiles/'+ newCo + '.json', JSON.stringify(json )+ '\n');
//
//   });
//
// });
//
// request(company3.url, function(error, response, body) {
//   if(error) {
//     console.log('Error: ' + error);
//   }
//   console.log('Status code: ' + response.statusCode);
//
//   var $ = cheerio.load(body);
//   $('.main-container > ul.grid-listing__list > li.grid-listing__item').each(function( index ){
//
//     var name =  $(this).find('.grid-listing__content > h2').text().trim();
//     var title =  $(this).find('.grid-listing__content > p').text().trim();
//     var title2 = $(this).text().trim().split('\r\n\t\t')[1];
//
//     var image = $(this).find(' a > div.grid-listing__img > img').attr('data-src');
//
//     var description ='hey';
//     var link = $(this).find('a').attr('href');
//     var source = company3.url;
//     var lastUpdated = new Date();
//     var id_spl = link.split('/');
//     var _id = id_spl[id_spl.length -2];
//
//     json._id = _id;
//     json.company = company3.name;
//     json.name = name.toProperCase();
//     if(!title) {
//       json.title = title2.toProperCase();
//     } else {
//       json.title = title.toProperCase();
//     }
//
//     json.yearStart = '';
//     json.image = company3.root +  image;
//     json.description = description;
//     json.link = company3.root + link;
//
//     json.source = source;
//     json.lastUpdated = lastUpdated;
//     //print to json
//   var newCo = company3.name.toLowerCase();
//     fs.appendFileSync('app/output/company_profiles/'+ newCo + '.json', JSON.stringify(json) + '\n');
//
//   });
// });
