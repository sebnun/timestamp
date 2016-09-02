const http = require("http");
const moment = require("moment");

http.createServer(function(req, res) {

    if (req.url === "/" || req.url === "//") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(`<p>See <a href="https://github.com/sebnun/timestamp">Timestamp</a> for more info.</p>`)
    } else {
        //req.url on my server is "//something"
        const userDate = decodeURI(req.url.substring(2)); 
        //isNaN(num) true if not a number
        const parsedDate = isNaN(userDate) ? moment(userDate) : moment.unix(userDate);

        let response = {"unix": null, "natural": null};

        if (parsedDate.isValid()) {
            response.unix = parsedDate.format("X");
            response.natural = parsedDate.format("dddd, MMMM Do YYYY");
        }

        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(response));
    }

}).listen(8081);
