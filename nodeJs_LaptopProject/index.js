var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var env = process.env['USERPROFILE'];

var inputFile=`${env}/Documents/Tozsde/MT4ek/Admiral2/MQL4/Files/csvStatement_27018855/manual.csv`;

var parser = parse({delimiter: ';'}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
    // do something with the line
   // doSomething(line).then(function() {
      // when processing finishes invoke the callback to move to the next one
      //callback();
   // });
  })
});
fs.createReadStream(inputFile).pipe(parser);
