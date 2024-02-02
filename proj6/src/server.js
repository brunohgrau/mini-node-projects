const http = require("http");
const url = require("url");

const server = http.createServer();
// Request Handler
server.on("request", (request, response) => {
  console.log(request.url);
  request.on("data", (chunk) => {
    console.log("this is a chunk");
  });
});

server.listen(8080);
