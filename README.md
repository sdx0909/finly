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

## Running the Application

- to run the server, open the terminal and run the javascript file using nodejs as:

```cmd
node index.js
```

## Adding Nodemon for development

- if you still use node for running the application, then you have to do the restart every time you make some changes.
- to make developement fast and more pleasant, let's use Nodemon to run the server instead Node.
- to use **Nodemon**, You need to install it using **npm** as:
  
```cmd
npm install nodemon --save-dev
```

- **--save-dev** : used to specify packages that are only needed for development purposes.
- packages marked as **dev** dependencies won't be installed when you deploy the application to a production environment later.
- you see the list of *devDependencies* in **index.js** file:

```json
"devDependencies": {
    "nodemon": "^3.1.10"
}
```

- You will have **package-lock.json** and **node_modules/** folder generated on the project.
- **package-lock.json** - is used to record the exact version of packages you installed.
- **node_modules/** folder is where the packages you install using *npm* will be stored.
- after installing Nodemon, add the *start* and *dev* script on the **package.json**
  
```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

- the script in **package.json** file respond to:

```cmd
npm run <script-name>
```

- to run the *dev* script, run the following command:
  
```cmd
npm run dev
```
