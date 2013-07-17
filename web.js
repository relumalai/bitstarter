var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());
var teststr = fs.readFileSync("./index.html","utf8");
//console.log(teststr);
//var buffer = new Buffer(27);
//buffer.write (teststr, "utf-8");


app.get('/', function(request, response) {
  response.send(teststr);
//    response.send(buffer.toString("utf-8"));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
