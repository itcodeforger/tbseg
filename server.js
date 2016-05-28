var http = require('http'),
    fs = require('fs');

fs.readFile('./app/index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(8080);
});

console.log("listening on http://docker:8080")