# FINLY APPLICATION

- this is an invoicing application that helps to maintain the invoices data over the customers.

## Creating the Project Structure

- creating the folder named as **finly**.
- after that open the command prompt and goes to *finly* folder.
- now you have to setup the nodejs project by following command:
  
```cmd
npm init -y
```

- Note that it will creates the **package.json** file as like:

```json
{
  "name": "finly",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sdx0909/finly.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "bugs": {
    "url": "https://github.com/sdx0909/finly/issues"
  },
  "homepage": "https://github.com/sdx0909/finly#readme"
}
```

## Creating the Simple-Node Server Application

- to create the nodejs server, you need to create a new file named *index.js* file and write code as:

```js
// requiring the 'http' module
const http = require("http");

// creating the node-server
const server = http.createServer((req, res) => {
  const { url } = req;
  console.log(url);
  if (url === "/") {
    res.end("Hello from Node-Server");
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
```
