var http = require('http');
var url = require('url');
var rn = require('./randomNum');
var fs = require('fs');

const server = http.createServer((request, response) => {
    const reqUrl = url.parse(request.url, true); 

    //cors headers
    response.setHeader('Access-Control-Allow-Origin', '*'); 
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    console.log(request);

    if(reqUrl.pathname === '/randomGenerator') {
        const randomNumber1 = rn.generateRandomNumbers();
        const randomNumber2 = rn.generateRandomNumbers();
        response.writeHead(200, {'Content-type': 'application/json'});
        response.end(JSON.stringify({
            randomNumber1: randomNumber1,
            randomNumber2: randomNumber2
        }));
        return;
    }

    if(reqUrl.pathname === '/') {
        fs.readFile('index.html', function(err, data) {
            if (err) {
                response.writeHead(500, {'content-Type': 'text/plain'});
                response.end('Internal server error.');
                return;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
        return;
    }
    
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Not Found');
    
    // Access function from a separate JavaScript file.
    response.write("Dice 1: " + rn.generateRandomNumbers() +  " ");
    response.write("Dice 2: " + rn.generateRandomNumbers());
    
    // Close the response
    response.end();
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);