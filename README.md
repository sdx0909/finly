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

## EXPRESS AND MORGAN

- **Express** is a Node.js framework that's popular for its simplicity and minimalist nature.
- the framework built on top of Node.js module like *http*
- installing **express** you have to fire the following command:
  
```cmd
npm install express
```

- Once the package installed write new code in index.js

```js
// 1: requiring the "express" module
const express = require("express");

// 2: creating the express-app
const app = express();

// 3-1: get with /:route request in express-server
app.get("/", (req, res) => {
  res.end("Hello from express-server");
});

// 3-2: get with /contact:route request in express-server
app.get("/contact", (req, res) => {
  res.send("The Contact Page");
});

// 3-3: get with /about:route request in express-server
app.get("/about", (req, res) => {
  res.send("The About Page");
});

// 3-4: get with *(any) :route request in express-server
app.get("/{*any}", (req, res) => {
    res.status(404).send("Not Found");
});

// 4: listening the express-server at PORT:3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

```

- here the wild-card route `*` is not used because it gives error so we used `/{*any}` route to match any invalid url.
- **Note :** this route must be *last route of the valid routes* means you have to define it at the **bottom of your routes**.
  
### Adding Morgan for Logging

- instead of logging the URL manually, let's use Morgan to create a detailed log instead.
- Morgan is a library that you can **used to report detailed logs for you Node.js application.**
- installing as:
  
```cmd
npm install morgan
```
  
- after installing you need to import it and use it in `index.js` file as:
  
```js
// 01: requiring the "express" module
const express = require("express");

// 02: requiring the "morgan" module
const morgan = require("morgan");

// 03: creating the express-app
const app = express();

// 04: use the "morgan" with "dev" format
app.use(morgan("dev"));

// ... routes

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
```

- the `app.use()` method is used to register a **middleware** function so that it will be executed on each request.
- here, we call the `morgan()` function and pass the format as `dev`.
- there are other formats such as `tiny` and `common` but `dev` is the best for development.
- you can see logs created by morgan as:
  
```cmd
GET / 200 2.655 ms - -
GET /about 304 5.618 ms - -
GET /contact 304 1.287 ms - -
GET /new 404 2.083 ms - 9
```

- in above `morgan` logs the `method`, `URL-route`, `status-code` and amount of `time` required to send a response in miliseconds.

## USING EJS TEMPLATING ENGINES FOR VIEWS

- the templating engines used to create and send the dynamic HTML response instead of sending back static HTML pages.
- there are many templating engines that are compatible with `express` such as : `Pug`, `Handlebars` and `Ejs`.
- these templating engines have different syntaxes, but they all serve the same purpose: ***to create HTML output from the provided data***.
- we are using `EJS` (Embedded JavaScript) because it uses the plain JavaScript.

### Adding EJS to Express

- installing the `EJS` package as:
  
```cmd
npm install ejs
```

- next, adding the configurations of `ejs` template engine files in `index.js` file and set the `view` engine for `express` as:

```js
const app = express();

// configurations for "ejs" template files
app.set("views", "./views");
app.set("view engine", "ejs");
```

- Next, Create the `./views` folder in our project and create the `index.ejs` file and write code below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1><%= message %></h1>
    <p>Response created using EJS Teplating</p>
</body>
</html>
```

- `ejs` enables you to embed the JavaScript by using the `<% %>` tag.
- inside this tag you can write the JavaScript code such as declaring the variable or adding an `if` statement.

### Rendering EJS Template With Express

- to rendering the `ejs` file, you need to use the `res.rendor()` method provided by `res` object.
- write new code in `index.js` file as:
  
```js
app.get("/", (req, res) => {
  res.render("index", { message: "Hello from Express-Server" });
});

// 3-2: get with /contact:route request in express-server
app.get("/contact", (req, res) => {
  res.render("index", { message: "This is Contact Page" });
});

// 3-3: get with /about:route request in express-server
app.get("/about", (req, res) => {
  res.render("index", { message: "This is About Page" });
});

// 3-4: get with *(any) :route request in express-server
app.get("/{*any}", (req, res) => {
  res.render("index", { message: "Page Not Found" });
});
```

### Reuse EJS Template With Partials

- Inside the `views/` folder, create a folder named `partials`, then create an EJS file named `head.ejs` and add the `<head>` tag in this file:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head> 
```

- Now you can reuse this template in any other EJS template by using the `include()` function.
- Back on the `index.ejs` file, replace the `<head>` tag with the following code:

```html
<html lang="en">
<%- include('./partials/head.ejs') %>
 <!-- body tag... -->
</html>
```

- Now whenever you create another EJS template, you can use the `include()` function to reuse a certain part of the template.

## USING TAILWIND AND DAISYUI FOR CSS

### Steps for configuration of Tailwind with Daisyui

1. installing `tailwindcss@3`, `postcss`, `autoprefixer` and `postcss-cli` in `devDependency`.

    ```cmd
    npm install --save-dev  autoprefixer postcss postcss-cli tailwindcss@3
    ```

2. also installing the `daisyui` package as

    ```cmd
    npm install --save-dev daisyui
    ```

3. once the installation finished you can create the configuration files such are `tailwind.config.js` and `postcss.config.js` and write the respective code in it.
4. `tailwind.config.js`

   ```js
    // import daisyui from "daisyui";
    /** @type {import('tailwindcss').Config} */
    module.exports = {
        content: ["./views/**/*.ejs"],
        theme: {
            extend: {},
        },
        plugins: [require("daisyui")],
    };
   ```

5. `postcss.config.js`

   ```js
    module.exports = {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    };
   ```

6. create the `public>styles` folder structure and create the   `tailwind.css` file in it and write the following code.
7. `tailwind.css`

   ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
   ```

8. finally for compiling the css add the following `scripts` in `package.json` file:
9. `package.json`

    ```json
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1",
        "devcss": "postcss public/styles/tailwind.css -o public/styles/style.css -w"
    }
    ````

10. adding the `tailwind` and `daisyui` classes for better UI.
11. `index.ejs`

    ```js
    <!DOCTYPE html>
    <html lang="en">
    <%- include('./partials/head.ejs') %>
    <body>
        <h1 class="text-emerald-500"><%= message %></h1>
        <p class="text-emerald-800">Response created using EJS</p>
        <button class="btn btn-secondary m-2 px-10">Click me!</button>
    </body>
    </html> 
     ```

12. for every changes in styling you need to fire the following command to **compile** the styles at onces:

    ```cmd
    npm run devcss
    ```

13. and finally `run` the application as:

    ```cmd
    npm run dev
    ```
