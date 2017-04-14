'use strict';

// let promise = require('bluebird');
let path = require('path');
// let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// let xhr = new XMLHttpRequest();
let fs = require('fs');
let AWS = require('aws-sdk');
var strs = require('stringstream');

var file_1 = path.resolve(__dirname, './output/company_profiles/pfizer.json');
var file_2 = path.resolve(__dirname, './output/company_profiles/merck.json');
var file_3 = path.resolve(__dirname, './output/company_profiles/gsk.json');


let _ = require('lodash');
let s3 = new AWS.S3();
let bucketName = 'linksbridge-test';

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
readObjects('pfizer');
$('#getNew').click(function(){
  getData(file_1, 'pfizer');
  getData(file_2, 'merck');
  getData(file_3, 'gsk');

})
