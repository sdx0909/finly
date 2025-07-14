// requiring the 'http' module
const http = require("http");

// creating the node-server
const server = http.createServer((req, res) => {
  const { url } = req;
  console.log(url);
  if (url === "/") {
    res.end("Hello World!");
  } else if (url === "/about") {
    res.end("About-Page");
  } else if (url === "/home") {
    res.end("Home-Page");
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
});

// listening the server on port:3000
server.listen(3000, () => {
  console.log(`server listening at localhost:3000`);
});
