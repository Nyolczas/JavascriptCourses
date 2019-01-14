const fs = require('fs');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');

console.log(json);

var path = require('path');
var userName = process.env['USERPROFILE'].split(path.sep)[2];

console.log(userName);
