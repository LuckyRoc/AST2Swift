var generateModel = require('./generateModel.js');
var fs = require("fs")
const { exec } = require('child_process');

var d = "{'error': 0,'msg': 'success','data': [{'id': 27,'name': '协议和帮助','sname': 'xy','parent_id': '0','flag': '0','created': '2017-01-15 09:47:09','tag':[1, 5], 'dated': '2017-01-15 16:31:32'}]}"

var fileName = "testModel"
var code = generateModel.generateCode(d, fileName).swiftModel();
console.log(code)


fs.writeFile('./Swift_Code/' + fileName + '.swift', code,  function(err) {
    if (err) {
        return console.error(err);
    }
 });
 
 // swiftformat test.swift
 exec('swiftformat ./Swift_Code/' + fileName + '.swift --swiftversion 4.2 ', (err, stdout, stderr) => {
     if(err) {
         return;
     }
 })
 
