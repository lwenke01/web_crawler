'use strict';

// var request = require('request');
// var request = require('request');
// var cheerio = require('cheerio');
// var fs = require('fs');

module.exports = {

req1 : function(){


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
      var name =  $(this).find('div.col-lg-3.col-md-3.col-sm-12 > img').attr('alt');

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
      json.name = name.toProperCase();
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
    document.getElementById("stories").innerHTML = json;
      fs.appendFileSync('app/output/company_profiles/'+ newCo + '.json', JSON.stringify(json) + '\n');
    });

  });
//
// String.prototype.toProperCase = function () {
//   return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// };
// var _id,company,name, title, yearStart,image,description,link, source, lastUpdated;
// var json = {_id: '', company: '',name: '',title: '', yearStart:'', image: '',description:'',  link:'', source:'', lastUpdated:''};
//
//
// //company lists
// var company1 = {url:'http://www.merck.com/about/leadership/executive-committee/home.html', name: 'Merck', root:'http://www.merck.com', category: 'contact'};
// var company2 = {url:'http://www.pfizer.com/about/leadership-and-structure/meet-executive-leaders', name: 'pfizer', root: 'http://www.pfizer.com',category: 'contact'};
// var company3 = {url:'http://www.gsk.com/en-gb/about-us/corporate-executive-team/', name: 'GSK', root: 'http://www.gsk.com,category'};



// company1
// request(company1.url, function(error, response, body) {
//   if(error) {
//     console.log('Error: ' + error);
//   }
//   console.log('Status code: ' + response.statusCode + ': ' + company1.name);
//
//   var $ = cheerio.load(body);


}

};
