'use strict';

let promise = require('bluebird');
let path = require('path');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();
let fs = require('fs');
let AWS = require('aws-sdk');
// let uuid = require('node-uuid');
// let insta = require('../../config/instagram')
// let file = './output/leadership.json';
var file_1 = path.resolve(__dirname, './output/company_profiles/pfizer.json');
var file_2 = path.resolve(__dirname, './output/company_profiles/merck.json');
var file_3 = path.resolve(__dirname, './output/company_profiles/gsk.json');


let _ = require('lodash');
let s3 = new AWS.S3();
let bucketName = 'linksbridge-test';

readObjects('pfizer');
getData(file_1, 'pfizer');
getData(file_2, 'merck');
getData(file_3, 'gsk');
//set up Promise to handle the request
function getData(file, name) {

  fs.readFile(file, 'utf8', function (err, data) {


      let keyName = name;

      let bodyContent = data;

        var params = {Bucket: bucketName, Key: keyName, Body: bodyContent, ACL:"bucket-owner-full-control" };

        s3.putObject(params, function(err, data) {
          if (err)
          console.log(err)
          else
          console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
        });





  })
}


//read object
// var s3 = new AWS.S3();
function readObjects(name){

  var params = {Bucket: bucketName, Key: name};
  s3.getObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log('data ',data.Metadata);           // successful response
    // var file = require('fs').createWriteStream('output.txt');
    // s3.getObject(params).createReadStream().pipe(file);
  });

}
