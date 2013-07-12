var express = require('express');
//var fs = require('fs');
var app = express.createServer(express.logger());
//var teststr = fs.readFileSync("./index.html","utf8");
//console.log(teststr);
var buffer = new Buffer(35);
buffer.write ("Hello World from index.html", "utf-8");


app.get('/', function(request, response) {
//  response.send('Hello World 2!');
    response.send(buffer.toString("utf-8"));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
