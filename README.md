# FINLY APPLICATION

- this is an invoicing application that helps to maintain the invoices data over the customers.

## Creating the Project Structure

- creating the folder named as **finly**.
- after that open the command prompt and goes to _finly_ folder.
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

- to create the nodejs server, you need to create a new file named _index.js_ file and write code as:

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
- you see the list of _devDependencies_ in **index.js** file:

```json
"devDependencies": {
    "nodemon": "^3.1.10"
}
```

- You will have **package-lock.json** and **node_modules/** folder generated on the project.
- **package-lock.json** - is used to record the exact version of packages you installed.
- **node_modules/** folder is where the packages you install using _npm_ will be stored.
- after installing Nodemon, add the _start_ and _dev_ script on the **package.json**

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

- to run the _dev_ script, run the following command:

```cmd
npm run dev
```

## EXPRESS AND MORGAN

- **Express** is a Node.js framework that's popular for its simplicity and minimalist nature.
- the framework built on top of Node.js module like _http_
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
- **Note :** this route must be _last route of the valid routes_ means you have to define it at the **bottom of your routes**.

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
- these templating engines have different syntaxes, but they all serve the same purpose: **_to create HTML output from the provided data_**.
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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

6. create the `public>styles` folder structure and create the `tailwind.css` file in it and write the following code.
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
   ```

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

## INTEGRATING MONGOOSE TO EXPRESS

### Connecting to MongoDB Cluster

- first, you need to install `mongoose` and `mongodb` in your application using `npm` as:

  ```cmd
  npm install mongodb mongoose
  ```

- Next, create a file `dbConnect.js` in your `lib/` folder and write the following code in it.

```js
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");
try {
 mongoose.connect(MONGODB_URI, {
  dbName: "finly-db",
  bufferCommands: false,
 });
 console.log("connected to MongoDb");
} catch (error) {
 console.log(error);
}
```

- in the `MONGODB_URI` you can specify the MongoDB Cluster URI.
- after copying the connection string from MongoDB URI you can put it into `.env` file as:
- let's create the `.env` file and add the environment variable for `MONGODB_URI`.

```env
MONGODB_URI=<paste-your-connection-string>
```

- NOTE: you can replace the `<username>` and `<password>`.

### Installing the `dotenv` package to Read Environment variables

- both Node.js and Express won't load the environment variables.
- installing as:

```cmd
npm install dotenv
```

- once the package is installed, open the `index.js` file and call the `config()` method to load the variables.
- you can also need to run the code in `dbConnect.js` file using `require()` as follows:

```js
require("dotenv").config();
require("./libs/dbConnect");
```

## IMPLEMENTING THE MVC PATTERN

### Creating the `User` Model

- for this you have to create a `libs > models` folder-structure then create the file named `user.model.js` inside it.
- add the below code in it.

```js
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
});

const User = model("User", UserSchema);

module.exports = User;
```

### Creating the User-Controller

- after creating the user-model, you need to create the user-controller that will make use of model.
- in the `root` folder of you poject, create a new folder named `controllers/`, then create a file named `user.controller.js` in it.

```js
const User = require("../libs/models/user.model");

const createUser = async (req, res) => {
 await User.create({
  email: "nathan@mail.com",
  password: "pass123",
 });

 res.render("user", { message: "User Created", user: null });
};

const getUser = async (req, res) => {
 const user = await User.findOne({ email: "saurabh@mail.com" });

 res.render("user", { message: "User Retrieved", user: user });
};

const deleteUser = async (req, res) => {
 await User.findOneAndDelete({ email: "nathan@mail.com" });

 res.render("user", { message: "User Deleted", user: null });
};

module.exports = {
 getUser,
 createUser,
 deleteUser,
};
```

### Creating the User View

- in the `user` controller, you can see that the `res.render()` call requires a view called `user`:
- inside the `views/` folder, create the file named `user.ejs` and add the code below:

```js
<!DOCTYPE html>
<html lang="en">
<%- include("./partials/head.ejs") %>
<body>
    <div class="m-4">
        <h1 class="text-emerald-500"><%= message %></h1>
        <% if(user) {%>
            <p><%=user.email %></p>
            <p><%=user.password %></p>
        <% } %>
    </div>
</body>
</html>
```

### Creating the User Route

- Now we have the `model`, the `view` and the `controller` for the user data.
- we need to create `routes` from which we execute the `controller` functions.
- back to root folder and create a new file in `routes/` folder named `user.route.js` with following code:

```js
const express = require("express");
const router = express.Router();

const {
 getUser,
 createUser,
 deleteUser,
} = require("../controllers/user.controller");

router.get("/", getUser);
router.get("/create", createUser);
router.get("/delete", deleteUser);

module.exports = router;
```

- now can configure user-routes in `index.js` file as:

```js
const userRouter = require("./routes/user.route");

const app = express();

// ...

app.get("/", (req, res) => {
 res.render("index", { message: "Hello From Node.js" });
});

app.use("/users", userRouter);
```

- Notice that here we use the `app.use()` method instead of `app.get()` because we want to let the `userRouter` object handle the requests coming to the `/users` route.
- now you can run the following routes to create, get and delete the user from MongoDB Atlas:
  1. `/users/create`
  2. `/users/get`
  3. `/users/delete`

## DEVELOPING USER AUTHENTICATION

- In Express, user-authentication can be done by creating a `session` as an identifier that keeps track of the user.
- when the user signs-up or logs-in to our application, a session is created by express and sent to the browser as a `cookie`.
- the `cookie` needs to be included in all subsequent requests sent by the browser.
- this way, Express knows that the user is allowed to access the resource it wants to access.
- When the user logs-out, the `session` and `cookie` are removed from both the server and the client.

### Implementing Express Session

- for implementing the **session-based** authentication, you need to install the `express-session` package using `npm` as:

  ```cmd
  npm install express-session
  ```

- Next, you need to import and use the module in the `index.js` file as:

```js
const session = require("express-session");

// ...

app.use(
 session({
  secret: process.env.AUTH_SECRET,
  saveUninitialized: true,
  resave: false,
 })
);
```

- now we can use the `session` in our application, but let's add the `AUTH_SECRET` variable in our `.env` file first.

### Creating the `AUTH_SECRET` Variable

- the `AUTH_SECRET` is an alphanumeric string that express uses to sign the session object.
- you can generate one by using the `openssl` command as:

  ```cmd
  openssl rand -base64 32
  ```

- this will generate a string that you can use as the value of `AUTH_SECRET` and put it in the `.env` file.

  ```js
  AUTH_SECRET=eh22VDra2zPG3GhZxpYgN6Ks1cXFX+lGzxR5qzy009k=
  ```

- that will take care of the session signing key.

### Cleaning the Routes

- before we adding the `signup` process, let's clean the routes we've created earlier in `index.js` file.
- remove the routes for `/`,`/about` and `/contact` from the application and leave only `app.use("/")` and `app.get("/{*any}")` routes.
- now open the `user.route.js` file, remove all routes we've added before, and add new routes for the home page `/`, `/login` and `/signup` as:

```js
// ...

router.get("/", (req, res) => {
 res.render("pages/index", {
  title: "Finly",
 });
});

router.get("/login", (req, res) => {
 res.render("pages/login", {
  title: "Sign in",
 });
});

router.get("/signup", (req, res) => {
 res.render("pages/signup", {
  title: "Sign up",
 });
});

module.exports = router;
```

- the next is to create the sign up page for the view layer.

### Creating the Sign-Up page

- create a new folder named `pages/` inside the `views/` folder.
- Next, create a file named `signup.ejs` and write the code below:

```html
<!DOCTYPE html>
<html lang="en">
 <%- include('../partials/head') %>
 <body>
  <main
   class="flex mx-auto w-full max-w-[460px] flex-col space-y-2.5 p-4 mt-12">
   <div class="flex h-24 w-full items-end rounded-lg bg-green-500 p-3">
    <div class="flex flex-row items-center text-white">
     <i aria-hidden="true" class="fa-3x fa-solid fa-coins pr-4"> </i>
     <p class="text-[44px]">Finly</p>
    </div>
   </div>
   <!-- adding from-for-signup  -->
   <span>
    Already have an account?
    <a href="/login" class="link link-primary link-hover">Log in</a>
   </span>
  </main>
 </body>
</html>
```

- between the `<div>` and `<span>` elements add a form as :

```html
<form action="/signup" method="post" class="space-y-3">
 <div class="flex flex-col rounded-lg bg-slate-100 p-6 gap-4">
  <h1 class="mb-3 text-2xl">Create Your Account Today</h1>

  <label class="input input-bordered flex items-center gap-2">
   <i class="opacity-70 fa-solid fa-envelope"> </i>
   <input
    name="email"
    type="email"
    class="grow"
    placeholder="Email"
    <!--
				value-element
				-- />
			/>
		</label>
		<label class="input input-bordered flex items-center gap-2">
			<i class="opacity-70 fa-solid fa-key"> </i>
			<input
				name="password"
				type="password"
				class="grow"
				placeholder="Password"
				<!--
				value-element
				-- />
			/>
		</label>
		<label class="input input-bordered flex items-center gap-2">
			<i class="opacity-70 fa-solid fa-key"> </i>
			<input
				name="repeatPassword"
				type="password"
				class="grow"
				placeholder="Repeat Password"
				<!--
				value-element
				-- />
			/>
		</label>
	</div>
	<button class="btn btn-primary w-full">
		Sign up
		<i aria-hidden="true" class="ml-auto fa-solid fa-arrow-right fa-lg"> </i>
	</button>
</form>
```

### Adding Font Awesome

- we will use `Font Awesome` to render the icons in our application, so let's add the library to our application.
- inside the `partials/head.ejs` file, add a link to Font Awesome as follows:
- also add the `title` dynamic value for the `<title>` tag

```html
<head>
	<title><%= title %></title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link href="/styles/style.css" rel="stylesheet" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
	<!-- adding toastify link further-->
</head>
```

### Updating User Controller

- first, we clear the controllers that we created earlier such are `createUser()`, `deleteUser()` and `getUser()` from `user.controller.js` file.
- When the user submits the sign-up form, a POST request will be sent to the `/signup` route, so let's create a function called `signup()` that will handle the request.

```js
const signup = async (req, res) => {
 const { email, password } = req.body;
 const query = { email };

 const existingUser = await User.findOne(query);
 if (existingUser) {
  res.redirect("/signup");
 } else {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
   email,
   password: hashedPassword,
  };
  const result = await User.create(user);
  req.session.userId = result._id;
  res.redirect("/dashboard");
 }
};

module.exports = {
 signup,
};
```

- for using `hash()` function we have to install the `bcrypt` package as:

  ```cmd
  npm install bcrypt
  ```

- the `hash()` function returns a fixed-length alphanumeric character string.

### Adding Express `urlencoded` Middleware

- When handling the `POST` request, we're going to process form data.
- Express needs to use the `urlencoded()` middleware to process form data, so let's add it to `index.js` file.

```js
app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(
 express.urlencoded({
  extended: false,
 })
);
```

- the `extended` option is used to let Express know whether we want to process advanced input formats (like nested objects or arrays).
- since we're going to pass a standerd form, we don't need the extended option.
- without adding the `urlencoded()` middleware, the form data won't be parsed by express.

### Adding the Dashboard Page

- create a Dashboard Page in your `views/pages/` folder named `dashboard.ejs` and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
 <%- include("../partials/head.ejs") %>
 <body>
  <h1>This is the Dashboard Page</h1>
 </body>
</html>
```

- Next, create a `dashboard.route.js` file under the `routes/` folder and write the followig code:

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
 res.render("pages/dashboard", { title: "Dashboard" });
});

module.exports = router;
```

- finally add the dashboard route into the `index.js` file as follows:

```js
const dashboardRouter = require("./routes/dashboard.route");

// ...

app.use("/", userRouter);
app.use("/dashboard", dashboardRouter);
```

- Now the `/dashboard` url is available on your application.

## VALIDATING FORM INPUTS AND DISPLAYING MESSAGES

- Currently we haven't shown any error message when the user already exists and we also didn't validate the form inputs.
- to validate the form inputs and show error messages we need to use the `express-validator` and `connect-flash` libraries.

### Adding Validation to the Sign Up process

- the `express-validator` library is an express middleware that can be used to validate the `req.body` object values.
- install as follows:

  ```cmd
  npm install express-validator
  ```

- Next, open the `user.controller.js` file and add the code below:

```js
const { body, validationResult } = require("express-validator");

const validateSignup = [
 body("email", "Email must not be empty").notEmpty(),
 body("password", "Password must not be empty").notEmpty(),
 body("password", "Password must be 6+ characters long").isLength({ min: 6 }),
 body("repeatPassword", "Repeat Password must not be empty").notEmpty(),
 body("repeatPassword", "Passwords do not match").custom(
  (value, { req }) => value === req.body.password
 ),
];

// signup() ...

module.exports = {
 signup,
 validateSignup,
};
```

- this validator array needs to be called before the `signup()` process, which means we need to export it from the controller.
- and then imports the array inside the `user.route.js` file as:

```js
const { validateSignup, signup } = require("../controllers/user.controller");

// ...

router.post("/signup", validateSignup, signup);
```

- Back to the `user.controller.js` file, we can check on the result of the validation inside the `signup()` method as follows:

```js
const signup = async (req, res) => {
 const validationErrors = validationResult(req);
 if (!validationErrors.isEmpty()) {
  const errors = validationErrors.array();
  req.flash("errors", errors);
  return res.redirect("/signup");
 }

 // ...
};
```

- the `validationResult()` returns the `errors` object generated from running the validator functions.
- When the `errors` object is not empty, we pass the `errors` as an array to the `flash()` function then redirect to the user to sign up page.

### Storing Error Messages in Flash

- The `connect-flash` library provides a special area in the `session` object called `flash`, which is used for storing messages.
- this library is commonly used in combination with redirects so that messages can be passed between requests.
- installing as:

  ```cmd
  npm install connect-flash
  ```

- Next, import and use the module in `index.js` as:

```js
const flash = require("connect-flash");

app.use(
 session({
  // options
 })
);

app.use(flash());
```

- make sure that you can call `app.use(flash())` after the `app.use(session())` in your file.
- any time you want to store a message on the `flash`, you only need to call `req.flash()` method as shown below:

  ```js
  req.flash("key", "value");
  ```

- the `flash()` method stores messages in `key-value` pair.

### Displaying the Error Messages on Sign Up Form

- to retrieve the error message stored in `flash` object, you need to call the `req.flash()` method and pass the `key` which stores the messages you want to get.
- In your `user.route.js` file add a variable inside the `res.render()` function as:

```js
router.get("/signup", (req, res) => {
 res.render("pages/signup", {
  title: "Sign up",
  // adding new variable
  errors: req.flash("errors"),
 });
});
```

- once a message is retrieved, flash will remove that message from the `session`.
- to display the error messages, you only need to access the `errors` object from `ejs` template files.
- in your `signup.ejs` file, include a partial template below the `<h1>` element as:

```html
<h1 class="mb-3 text-2xl">Create Your Account Today</h1>
<%- include('../partials/formErrors') %>
```

- Next, create the `partials/formErrors.ejs` file and write following code:

```html
<% if(typeof errors !== 'undefined') { %> <% errors.forEach(function(error) { %>
<div role="alert" class="alert alert-error">
 <i class="fa-regular fa-circle-xmark"></i>
 <span><%= error.msg %></span>
</div>
<% }) %> <% } %>
```

### Preserving Input Data on Sign Up Form

- Another thing we need to do is to preserve the input data when the signup process fails.
- Right now, the form inputs will be empty after the form fails, and the user needs to re-enter their details into the form.
- we can provide a better user experience by keeping the form inputs filled in case of an error.
- Back in the `signup()` controller function and add the `req.body` data to the `flash` object as:

```js
if (!validationErrors.isEmpty()) {
 const errors = validationErrors.array();
 req.flash("errors", errors);
 // adding user-details to flash
 req.flash("data", req.body);
 return res.redirect("/signup");
}
```

- Now we can retrieve user data when rendering the sign up page in `user.route.js`.

```js
router.get("/signup", (req, res) => {
 res.render("pages/signup", {
  title: "Sign up",
  // getting details of user
  user: req.flash("data")[0],
  errors: req.flash("errors"),
 });
});
```

- with the `user` data retrieved, you can display that data in `signup.ejs` file.
- on the `<input>` elements, add a `value` attribute as follows:

```html
<input
 name="email"
 type="email"
 class="grow"
 placeholder="Email"
 value="<%= user?.email || '' %>" />

<input
 name="password"
 type="password"
 class="grow"
 placeholder="Password"
 value="<%= user?.password || '' %>" />

<input
 name="repeatPassword"
 type="password"
 class="grow"
 placeholder="Repeat Password"
 value="<%= user?.repeatPassword || '' %>" />
```

- Now when the form fails to submit, the error messages will be displayed and the input values won't be removed.

### Showing Toast Notification With Toastify

- There is one more part that is to show some notification when the email already exists in our database.
- inside the `signup()` function, we can add another `flash` message inside the `if(existingUser)` block like this:

```js
if (existingUser) {
 req.flash("data", req.body);
 // adding new message
 req.flash("info", {
  message: "Email is already registered. Try to login instead",
  type: "error",
 });
 res.redirect("/signup");
}
```

- When rendering the sign up page, we can add the `flash` message to a variable as follows:

```js
router.get("/signup", (req, res) => {
 res.render("pages/signup", {
  title: "Sign up",
  user: req.flash("data")[0],
  // adding new
  info: req.flash("info")[0],
  errors: req.flash("errors"),
 });
});
```

- Now we need a way display the `info` data to the user.
- this is where we need to use a toast notification library called `toastify`.
- `Toastify` allows you to show a notification that disappears after a certain time.
- You can learn more about this at:[url]
- to use this you need to add the css and Javascript files to your application.
- on the `partials/head.ejs` file, add the CSS part as:

```js
<link
 rel="stylesheet"
 href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
/>
```

- Next, create a new partial template named `script.ejs` and add the code below:

```js
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<% if (typeof info !== 'undefined') { %>
<script>
  const bgColors = {
    error: "#EF4B53",
    success: "#00B5FF"
  }
  Toastify({
    text: ('<%= info.message %>'),
    duration: 3000,
    gravity: 'bottom',
    position: 'right',
    offset: {
      x: 50,
      y: 10
    },
    style: {
      back ground: bgColors['<%= info.type %>'],
    },
  }).showToast();
</script>
<% } %>
```

- Now, if you submit the form using and email that's already registered, you should see a toast notification.
- let's also show a notification when the user successfully signed up for a new account.
- On the `else` block in `signup` function of `user.controller.js` file write code below:

```js
else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        email,
        password: hashedPassword,
    };
    const result = await User.create(user);
    req.session.userId = result._id;
    req.flash("info", {
        message: "Signup Successful",
        type: "success",
    });
    res.redirect("/dashboard");
}
```

- Now the `signup` page is completed.

## ADDING LOGIN AND LOGOUT FUNCTIONALITY

### Creating the Landing Page

- Inside the `views/` folder, you need to create a `pages/index.ejs` file and write the following code.

```js
<!DOCTYPE html>
<html lang="en">
<%- include('../partials/head') %>
<body>
  <main class="flex min-h-screen flex-col p-4">
    <div class="flex h-24 shrink-0 items-end rounded-lg bg-green-500 p-4 text-5xl">
      <div class="flex flex-row items-center text-white">
        <i class="fa-solid fa-coins pr-4"></i>
        Finly
      </div>
    </div>
    <div class="mt-4 flex grow flex-col gap-4 md:flex-row">
      <div class="flex flex-col justify-center gap-6 rounded-lg bg-slate-100 px-6 py-10 md:w-2/5 md:px-10">
        <h1 class="text-3xl font-medium">Welcome to Finly!</h1>
        <p class="text-xl text-gray-800">
          The invoicing software for small business and freelancer.
          <br>
          Create professional invoices in an instant with smart invoicing software.
        </p>
        <a class="btn btn-primary w-32" href="/login">
          Log in
          <i class="ml-auto fa-solid fa-arrow-right"></i>
        </a>
      </div>
      <div class="flex items-center justify-center p-6 md:w-3/5 md:px-20 md:py-8">
        <img alt="Grow your business with Finly" width="400" height="400" src="https://g.codewithnathan.com/revenue-bro.png" />
      </div>
    </div>
  </main>
  <%- include('../partials/script') %>
</body>
</html>
```

- the image is also available in the [url]
- in the `dashboard.route.js` file, get the `info` value from `flash`.

```js
router.get("/", (req, res) => {
 res.render("pages/dashboard", {
  title: "Dashboard",
  info: req.flash("info")[0],
 });
});
```

### Updating the Dashboard Page

- create a new partial template page named `navbar.ejs` to create a navigation bar for our application.
- write following code as:

```html
<div class="fixed w-56 bg-white shadow-md h-screen flex flex-col">
 <div
  class="h-40 p-4 bg-green-500 text-white text-4xl flex justify-start items-end">
  <i aria-hidden="true" class="fa-solid fa-coins pr-4"></i>
  Finly
 </div>
 <div class="flex grow flex-col py-4 justify-between">
  <ul>
   <li>
    <a href="/dashboard" class="block p-4 hover:bg-sky-100">
     <i aria-hidden="true" class="fa-solid fa-home pr-2"></i>
     Home
    </a>
   </li>
   <li>
    <a href="/dashboard/customers" class="block p-4 hover:bg-sky-100">
     <i aria-hidden="true" class="fa-solid fa-users pr-2"></i>
     Customers
    </a>
   </li>
   <li>
    <a href="/dashboard/invoices" class="block p-4 hover:bg-sky-100">
     <i aria-hidden="true" class="fa-solid fa-copy pr-2"></i>
     Invoices
    </a>
   </li>
  </ul>
  <ul>
   <li>
    <a href="/logout" class="block p-4 hover:bg-sky-100">
     <i aria-hidden="true" class="fa-solid fa-power-off pr-2"></i>
     Sign out
    </a>
   </li>
  </ul>
 </div>
</div>
```

- Next, add this navigation bar to the `dashboard` page by updating the `pages/dashboard.ejs` file.

```html
<!DOCTYPE html>
<html lang="en">
 <%- include('../partials/head') %>
 <body class="bg-gray-100">
  <div class="flex h-screen overflow-hidden">
   <!-- including navbar -->
   <%- include('../partials/navbar') %>
   <div class="ml-56 flex-grow p-10 overflow-y-auto">
    <h1 class=" mb-4 text-xl md:text-2xl">Dashboard</h1>
   </div>
  </div>
  <%- include('../partials/script') %>
 </body>
</html>
```

### Adding Login Page to Views

- to create the login page, you need to add another view file on the `pages/` folder.
- create a file named `login.ejs` and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
 <%- include('../partials/head') %>
 <body>
  <main
   class="flex mx-auto w-full max-w-[400px] flex-col space-y-2.5 p-4 mt-12">
   <div class="flex h-24 w-full items-end rounded-lg bg-green-500 p-3">
    <div class="flex flex-row items-center text-white">
     <i aria-hidden="true" class="fa-3x fa-solid fa-coins pr-4"> </i>
     <p class="text-[44px]">Finly</p>
    </div>
   </div>
   <form action="/login" method="post" class="space-y-3">
    <div class="flex flex-col rounded-lg bg-slate-100 p-6 gap-4">
     <h1 class="mb-3 text-2xl">Enter Your Account</h1>
     <%- include('../partials/formErrors') %>
     <label class="input input-bordered flex items-center gap-2">
      <i class="opacity-70 fa-solid fa-envelope"> </i>
      <input
       name="email"
       type="email"
       class="grow"
       placeholder="Email"
       value="<%= user?.email || '' %>" />
     </label>
     <label class="input input-bordered flex items-center gap-2">
      <i class="opacity-70 fa-solid fa-key"> </i>
      <input
       name="password"
       type="password"
       class="grow"
       placeholder="Password"
       value="<%= user?.password || '' %>" />
     </label>
    </div>
    <button class="btn btn-primary w-full">
     Log in
     <i aria-hidden="true" class="ml-auto fa-solid fa-arrow-right fa-lg">
     </i>
    </button>
   </form>
   <span>
    Don't have an account?
    <a href="/signup" class="link link-primary link-hover">Sign Up</a>
   </span>
  </main>
  <%- include('../partials/script') %>
 </body>
</html>
```

- the next step is to write the controller functions.

### Adding Login Function to User Controller

- in the `user.controller.js` file, add the `validationLogin` array to validate the login form as:

```js
const validateLogin = [
 body("email", "Email must not be empty").notEmpty(),
 body("password", "Password must not be empty").notEmpty(),
];
```

- Next, add the `login()` function as:

```js
const login = async (req, res) => {
 const validationErrors = validationResult(req);
 if (!validationErrors.isEmpty()) {
  const errors = validationErrors.array();
  req.flash("errors", errors);
  req.flash("data", req.body);
  return res.redirect("/login");
 }

 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (user) {
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
   req.session.userId = user._id;
   req.flash("info", {
    message: "Login Successful",
    type: "success",
   });
   res.redirect("/dashboard");
  } else {
   req.flash("info", {
    message: "Wrong Password",
    type: "error",
   });
   req.flash("data", req.body);
   res.redirect("/login");
  }
 } else {
  req.flash("info", {
   message: "Email is not registered",
   type: "error",
  });
  req.flash("data", req.body);
  res.redirect("/login");
 }
};
```

### Adding Logout Function

- Next, add the `logout()` function just below the `login()` function as:

```js
const logout = (req, res) => {
 req.session.userId = null;
 req.flash("info", {
  message: "Logout Successful",
  type: "success",
 });
 res.redirect("/");
};
```

- Now we need to `export` these two new functions and validation array as:

```js
module.exports = {
 signup,
 validateSignup,
 login,
 validateLogin,
 logout,
};
```

### Updating User Routes

- Next step is to update the user routes.
- First, update the `imports` as shown below:

```js
const {
 validateSignup,
 signup,
 login,
 validateLogin,
 logout,
} = require("../controllers/user.controller");
```

- Then we need to add a `GET` and `POST` routes for the `/login` URL.
- and a `GET` route for the `/logout` URL.

```js
router.get("/login", (req, res) => {
 res.render("pages/login", {
  title: "Sign in",
  user: req.flash("data")[0],
  info: req.flash("info")[0],
  errors: req.flash("errors"),
 });
});

router.post("/login", validateLogin, login);

router.get("/logout", logout);
```

- also update the landing page to get the `info` message:

```js
router.get("/", (req, res) => {
 res.render("pages/index", {
  title: "Finly",
  info: req.flash("info")[0],
 });
});
```

- The `login` and `logout` functinality are now finished.
- You can try to log in by navigating the `/login` URL from browser.

## PROTECTING ROUTES WITH MIDDLEWARE

- Now that user authentication is completed, it's time to add a verification process each time the user wants to access a route that requires authentication.
- This can be done by using an **Express Middleware**, so let's learn about middleware first.

### Express Middleware Explained

- In Express, **Middlewares** are functions that have access to the `request`,`response` and `next` objects.
- These objects are defined as `req`,`res` and `next` in our functions.
- Express automatically sends these data when it receives an HTTP request.
- An Express application is essentially a series of middleware function calls.
- The order of the middleware is determined by the position of `app.use()` function we defined in our `index.js` file.
- This is why you need to place your specific routes above general routes like this:

```js
app.use("/dashboard", dashboardRouter);

app.use("/{*any}", (req, res) => {
 res.render("index", { message: "Page Not Found", title: undefined });
});
```

- here, we direct fire the **[https:localhost:3000/dashboard](http://localhost:3000/dashboard)** URL then we simply shows the dashboard page without login so this is not valid.
- this is unauthorized user access for dashboard page.
- If you switch the route position like this:

```js
app.use("/{*any}", (req, res) => {
 res.render("index", { message: "Page Not Found", title: undefined });
});

app.use("/dashboard", dashboardRouter);
```

- Then any request will match the `*` route, so no request will reach the `/dashboard` route.

### Adding Verification Middleware

- To protect routes from **_unauthenticated users_**, you need to create a middleware that verifies the `session` object that's included in every request.
- When this `session` object contains a valid `userId`, the request is passed to the `next()` middleware.
- If the `session` isn't valid, then we redirect to the `/login` page.
- Inside your `libs/` folder, create a new file named `middleware.js` and write the following code:

```js
const verifyUser = (req, res, next) => {
 if (!req.session.userId) return res.redirect("/login");
 next();
};

module.exports = {
 verifyUser,
};
```

- The `verifyUser()` middleware will check whether there's a valid `userId` property in the `req.session` object.
- When there's no `userId` property, then function redirects to the login page.
- Now use this middleware on the dashboard route.
- Open the `index.js` file, import the middleware, and place it in the `app.use('/dashboard')` call as follows:

```js
const { verifyUser } = require("./libs/middleware");

// ...

app.use("/dashboard", verifyUser, dashboardRouter);
```

- When unauthenticated user try to access the dashboard page, they will be redirected to the login page.

### Creating Middleware to Protect Login and Sign Up Routes

- Currently users can still access the `/login` and `/signup` pages **even after they are authenticated.**
- means if the user is logged-in and he try to open the `/login` or `/signup` page then it still opens these pages this is wrong.
- to improve the user experience, let's set up a middleware that redirect authenticated users to the `/dashboard` when they are access the `/login` or `/signup` page.
- In your `middleware.js` file, create a new middleware named `redirectAuthenticated()` as follows:

```js
const redirectAuthenticated = (req, res, next) => {
 if (req.session.userId) return res.redirect("/dashboard");
 next();
};

module.exports = {
 verifyUser,
 redirectAuthenticated,
};
```

- Import the middleware inside the `user.route.js` file, then place it in front of the `/signup` and `/login` page as:

```js
const { redirectAuthenticated } = require("../libs/middleware");

router.get("/signup", redirectAuthenticated, (req, res) => {
 // res.render()...
});

router.get("/login", redirectAuthenticated, (req, res) => {
 // res.render() ...
});
```

- Now whenever authenticated users can access the `/signup` or `/login` page, they will be redirected to the `/dashboard` page.

## CREATE, READ, UPDATE AND DELETE CUSTOMERS

- Now we need to provide a way for users to _create, read, update_ and _delete_ `customers` from the application.
- We need to start by creating the `data model`, then create `controllers` that use request data to manipulate the model accordingly, and then present the data using a `view template`.
- once the `MVC` pattern is implemented, we connect it to our appliction by adding new routes.

### Creating the Customer Model

- inside the `models/` folder, create a new file named `customer.model.js` and add the code below:

```js
const { Schema, model } = require("mongoose");

const CustomerSchema = new Schema({
 name: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
  unique: true,
 },
 phone: {
  type: String,
  required: true,
 },
 address: {
  type: String,
  required: true,
 },
 owner: {
  type: Schema.Types.ObjectId,
  ref: "User",
 },
});

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;
```

- The model above is connected to the `User` model through the `owner` field, which reference the `_id` field of the `User` model.
- Now whenever we create a new customer document in `MongoDB`, we need to provide the `owner` field, or there will be an _error_.

### Creating the Customer Controller

- inside the `controllers/` folder, create the `customer.controller.js` file and begin by importing the `Customer` model and `express-validator`.

```js
const Customer = require("../libs/models/customer.model");

const { body, validationResult } = require("express-validator");
```

- Next, create the validation logic for the customer data. Here, we simply check that the values are not empty.

```js
const validateCustomer = [
 body("name", "Name must not be empty").notEmpty(),
 body("email", "Email must not be empty").notEmpty(),
 body("phone", "Phone must not be empty").notEmpty(),
 body("address", "Address must not be empty").notEmpty(),
];
```

- Next, we need to create functions to manipulate the user data.
- The following `showCustomers()` controller function will find customers of the current user, then render the customer page:

```js
const showCustomers = async (req, res) => {
 const query = { owner: req.session.userId };
 const customers = await Customer.find(query);

 res.render("pages/customers", {
  title: "Customers",
  type: "data",
  customers,
  info: req.flash("info")[0],
 });
};
```

- You can see that we use the `req.session.userId` value to find the customers.
- Notice that there's a new `type` variable added to the `render()` method, This variable will be used by our `view` template later to show the correct partial template.
- now we have to export the validator and the function:

```js
module.exports = {
 validateCustomer,
 showCustomers,
};
```

### Creating the Customer Views

- Let's add the view used by our controller next. Inside the `views/pages` folder, create a new template named `customers.ejs` with the following content:

```html
<!DOCTYPE html>
<html lang="en">
 <%- include('../partials/head') %>
 <body class="bg-gray-100">
  <div class="flex h-screen overflow-hidden">
   <%- include('../partials/navbar') %>
   <div class="ml-56 flex-grow p-10 overflow-y-auto">
    <% if (type === 'data') { %> <%- include('../partials/customerData') %>
    <% } else { %> <%- include('../partials/customerForm') %> <% } %>
   </div>
  </div>
  <%- include('../partials/script') %>
 </body>
</html>
```

- In this template, we use the `type` variable value to render either the `customerData` or `customerForm` template.
- `customerData` template will show existing customers along with some buttons to modify the data.
- the `customerForm` template will render a form to create a new customer or update an existing one.
- Next, in your `views/partials` folder, create the `customerData.ejs` file and write the code below:

```html
<div class="w-full">
 <div class="flex w-full items-center justify-between">
  <h1 class="text-2xl"><%= title %></h1>
 </div>
 <form>
  <div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
   <div class="relative flex flex-1 flex-shrink-0">
    <label
     for="search"
     class="input input-bordered flex items-center gap-2 w-full">
     <i class="fa-solid fa-magnifying-glass"></i>
     <input
      id="search"
      name="search"
      type="text"
      class="grow"
      placeholder="Search customers..." />
    </label>
   </div>
   <a class="btn btn-primary" href="customers/create">
    <i class="fa-solid fa-plus fa-lg mr-2"></i>
    New Customer
   </a>
  </div>
 </form>
 <!-- adding new code here -->
</div>
```

- The above code will render a search input and a button to create a new customer.
- just below the closing `</form>` tag, add the code to render a table as follows:

```html
<div class="mt-6 overflow-x-auto bg-white rounded-lg p-2">
 <table class="table">
  <thead>
   <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Address</th>
    <th>Phone</th>
    <th></th>
   </tr>
  </thead>
  <tbody>
   <% customers.forEach(function(customer){ %>
   <tr>
    <td><%= customer.name %></td>
    <td><%= customer.email %></td>
    <td><%= customer.address %></td>
    <td><%= customer.phone %></td>
    <td>
     <div class="flex justify-end gap-3">
      <a
       class="rounded-md border p-2 hover:bg-gray-100"
       href="customers/<%= customer._id %>/edit">
       <i class="fa-solid fa-pen-to-square fa-lg"> </i>
      </a>
      <button
       class="rounded-md border p-2 hover:bg-gray-100"
       onclick="deleteModal('<%= customer._id %>')">
       <span class="sr-only"> Delete </span>
       <i class="fa-solid fa-trash fa-lg"></i>
      </button>
     </div>
    </td>
   </tr>
   <% }); %>
  </tbody>
 </table>
</div>
```

- The table above will show the customer data, then show two buttons: one for `editing` the customer, and one for `deleting` the customer.
- Notice that on the Delete button, there's an `onclick` attribute that calls the `deleteModel()` function.
- The `deleteModel()` function is used to ask for confirmation from users that they really want to delete the customer data.
- after that, you need to create a `<dialog>` element that will be used as the `modal`.
- You can place this element at the bottom of the template file:

```html
<dialog id="delete-modal" class="modal">
 <div class="modal-box">
  <h3 class="font-bold text-lg">Are you sure?</h3>
  <p class="py-4">All invoices related to the customer will be deleted</p>
  <div class="modal-action">
   <form id="delete-form" method="post">
    <button class="btn btn-danger">Yes</button>
   </form>
   <form method="dialog"><button class="btn">Cancel</button></form>
  </div>
 </div>
</dialog>
```

- Next, add a `<script>` element and define the `deleteModel()` function as:

```js
<script>
  function deleteModal(customerId){
    const modal = document.querySelector('#delete-modal');
    const deleteForm = document.querySelector('#delete-form');
    deleteForm.setAttribute('action', `customers/${customerId}/delete`)
    modal.showModal();
  }
</script>
```

- The function simply sets the `action` attribute of the `delete-form` that we created inside the modal, then shows that modal.
- When user clicks on `Yes`, then the customer data will be deleted. Otherwise, the modal is simply disabled again.
- Next, you need to create the `customerForm` template. this will be a simple form with four inoputs as:

```html
<h1 class=" mb-4 text-xl md:text-2xl"><%- title %></h1>
<form action="<%- formAction %>" method="post">
  <div class="rounded-md bg-slate-100 p-4 md:p-6">
    <div class="flex flex-col gap-4">
      <%- include('../partials/formErrors') %>
      <div class="form-control w-full gap-2"><span class="label-text">Customer Name</span>
        <label for="name" class="input input-bordered flex items-center gap-2">
          <i class="fa-regular fa-user"></i>
          <input id="name" name="name" type="text" class="grow" placeholder="John Doe" value="<%= customer?.name || '' %>" />
        </label>
      </div>
      <div class="form-control w-full gap-2"><span class="label-text">Email</span>
        <label for="email" class="input input-bordered flex items-center gap-2">
          <i class="fa-regular fa-envelope"></i>
          <input id="email" name="email" type="email" class="grow" placeholder="user@mail.com" value="<%= customer?.email || '' %>" />
        </label>
      </div>
      <div class="form-control w-full gap-2"><span class="label-text">Phone</span>
        <label for="phone" class="input input-bordered flex items-center gap-2">
          <i class="fa-solid fa-phone"></i>
          <input id="phone" name="phone" type="tel" class="grow" placeholder="+1223456" value="<%= customer?.phone || '' %>" />
        </label>
      </div>
      <div class="form-control w-full gap-2"><span class="label-text">Address</span>
        <label for="address" class="input input-bordered flex items-center gap-2">
          <i class="fa-regular fa-address-card"></i>
          <input id="address" name="address" type="text" class="grow" placeholder="1 West Pearce St, Richmond Hill, ON L4B 3K3, Canada" value="<%= customer?.address || '' %>" />
        </label>
      </div>
    </div>
    <div class="mt-6 flex justify-end gap-4">
      <a class="btn btn-ghost" href="/dashboard/customers">Cancel</a>
      <button type="submit" class="btn btn-primary">
        <%= title %>
      </button>
    </div>
</form>
```

- Now, the view is completed. Let's continue with adding the routes.

### Creating the Customer Routes

- in the `routes/` folder, create a `customer.route.js` file and add the following code:

```js
const express = require("express");
const router = express.Router();

const { showCustomers } = require("../controllers/customer.controller");

// NESTED-ROUTE --> '/dashboard/customers'
router.get("/", showCustomers);

module.exports = router;
```

- The customer routes will be nested below the `/dashboard` route, so you need to import this route on the `dashboard.route.js` file:

```js
const express = require("express");
const router = express.Router();

const customerRouter = require("./customer.route");

// router.get() ...

// NESTING ROUTE -->  '/dashboard/customers'
router.use("/customers", customerRouter);

module.exports = router;
```

- Alright, now you can navigate to the `/customers` route, but there's only an empty table there for now:
- for that we need to enable the users to create a new customer.

### Creating New Customers

- Back to the `customer.controller.js` file, add a function to create a customer as follows:

```js
const createCustomer = async (req, res) => {
 const validationErrors = validationResult(req);
 if (!validationErrors.isEmpty()) {
  const errors = validationErrors.array();
  req.flash("errors", errors);
  req.flash("data", req.body);
  return res.redirect("create");
 }

 // creating customer
 const newCustomer = req.body;
 newCustomer.owner = req.session.userId;

 await Customer.create(newCustomer);
 req.flash("info", {
  message: "Customer Created",
  type: "success",
 });

 res.redirect("/dashboard/customers");
};

// Update the exports module
module.exports = {
 showCustomers,
 createCustomer,
 validateCustomer,
};
```

- This function will run after the validator, so is will check on the validatio results.
- If there's any error, we redirect the user to the create page. Othewise, we set the `newCustomer` data and call the `Customer.create()` method to insert the customer to the database.
- After that, we simply set the `info` message and redirect the user to the customers page.

### Add Create Routes

- Next, add the `GET` and `POST` routes to the `customer.routes.js` file:

```js
const {
 showCustomers,
 createCustomer,
 validateCustomer,
} = require("../controllers/customer.controller");

const { validate } = require("../libs/models/user.model");

// NESTED-ROUTE:: '/dashboard/customers'
router.get("/", showCustomers);

// ROUTE:: '/dashboard/customers/create'
router.get("/create", (req, res) => {
 res.render("pages/customers", {
  title: "Create Customer",
  formAction: "create",
  type: "form",
  customer: req.flash("data")[0],
  errors: req.flash("errors"),
 });
});

router.post("/create", validateCustomer, createCustomer);

module.exports = router;
```

- Now if you press the `+ New Customer` button on the customers page, you will be shown the customer form:
- Fill out the form and submit it, and you'll see the customer data shown in the table.
- Alright, the next step is to update the customers.

### Updating Existing Customer

- in the customer controller, **create a function to show existing customer data on the form**:
- `customer.controller.js`

```js
const editCustomer = async (req, res) => {
 const customerId = req.params.id;
 const customer = await Customer.findById(customerId);

 res.render("pages/customers", {
  title: "Edit Customer",
  type: "form",
  formAction: "edit",
  customer: req.flash("data")[0] || customer,
  errors: req.flash("errors"),
 });
};
```

- This function will be used for the `GET` route when editing customers.
- Next, create a function that will handle the `POST` route.

```js
const updateCustomer = async (req, res) => {
 const validationErrors = validationResult(req);
 if (!validationErrors.isEmpty()) {
  const errors = validationErrors.array();
  req.flash("errors", errors);
  req.flash("data", req.body);
  req.redirect("edit");
 }

 const customerId = req.params.id;
 const customerData = req.body;

 await Customer.findByIdAndUpdate(customerId, customerData);
 req.flash("info", {
  message: "Customer Updated",
  type: "success",
 });
 res.redirect("/dashboard/customers");
};
```

- The function above will call the `Customer.findByIdAndUpdate()` method when the request data passes the validation process.
- also, don't forgot to update the `module.exports` content:

```js
module.exports = {
 showCustomers,
 editCustomer,
 updateCustomer,
 createCustomer,
 validateCustomer,
};
```

- Alright, now you need to create the update routes in `customer.route.js` file:

```js
const {
 showCustomers,
 editCustomer,
 updateCustomer,
 createCustomer,
 deleteCustomer,
 validateCustomer,
} = require("../controllers/customer.controller");
const { validate } = require("../libs/models/user.model");

// other routes

router.get("/:id/edit", editCustomer);

router.post("/:id/edit", validateCustomer, updateCustomer);
```

- Now when you click on the edit button, you will be shown a form populated with existing customer data.
- You can update the data as you need, then click the submit button to update the database.

### Deleting the Customers

- The last step is to add the delete customer function. This function is very simple:

```js
const deleteCustomer = async (req, res) => {
 const customerId = req.params.id;

 await Customer.findByIdAndDelete(customerId);
 req.flash("info", {
  message: "Customer Deleted",
  type: "success",
 });
 res.redirect("/dashboard/customers");
};

module.exports = {
 showCustomers,
 editCustomer,
 deleteCustomer,
 updateCustomer,
 createCustomer,
 validateCustomer,
};
```

- The function will call the `findByIdAndDelete()` method to delete the customer data.
- Next, create the route to delete customers as shown below:

```js
const {
 showCustomers,
 editCustomer,
 updateCustomer,
 createCustomer,
 deleteCustomer,
 validateCustomer,
} = require("../controllers/customer.controller");

// ...

router.post("/:id/delete", deleteCustomer);
```

- Here, the `id` of the customer that wants to be deleted will be read from the `URL` parameter, which we have set in the `deleteModal()` function.
- Now all functionalities relating to the customer data is finished. We still have the `search` function, which we will add later.

## HANDLING INVOICES DATA

### Creating the Invoices Model

- Inside the `models/` folder, create a new file named `invoice.model.js` and write the code below:

```js
const { Schema, model } = require("mongoose");

const InvoiceSchema = new Schema({
 amount: { type: Number, required: true },
 date: { type: String, required: true },
 status: { type: String, required: true },
 owner: { type: Schema.Types.ObjectId, ref: "User" },
 customer: { type: Schema.Types.ObjectId, ref: "Customer" },
});

const Invoice = model("Invoice", InvoiceSchema);

module.exports = Invoice;
```

- The `invoice` model is connected to both the `user` and `customer` models, so there are `owner` and `customer` fields in this model.
- Later in the form, we can select the `customer` that we want to pass the `invoice` to.
  
### Creating the Invoice Controller

- The next step is to create the controller. In the `controllers/ folder`, create a new file named `invoice.controller.js` and import the modules that will be used:

```js
const Customer = require("../libs/models/customer.model");
const Invoice = require("../libs/models/invoice.model");

const { body, validationResult } = require("express-validator");
```

- Next, write the validation logic for invoice data. Let's just make sure that none of the values are empty.

```js
const validateInvoice = [
 body("customer", "Select the Customer").notEmpty(),
 body("amount", "Amout must not be empty").notEmpty(),
 body("date", "Due Date must not be empty").notEmpty(),
 body("status", "Select the Status").notEmpty(),
];
```

- Agfer that, you need to create a function to show the existing invoices.
- Let's name it `showInvoices()`:
  
```js
 const showInvoices = async (req, res) => {
  const query = { owner: req.session.userId };
  const invoices = await Invoice.find(query);
  res.render('pages/invoices', {
    title: 'Invoices',
    type: 'data',
    invoices,
    info: req.flash('info')[0],
  });
 };
```

- Now the function to `showInvoices()` also needs to retrieve `customer` data, so you need to use the `populate()` method from `Mongoose`.
- The `populate()` method is used to **pull referenced document data**.
- Using this method, we can **pull the customer name for each invoice we have**.
- Above the `showInvoices()` function, create a new function named `populateInvoices()` as shown below:
  
```js
const populateInconst populateInvoices = (query) => {
  return query.populate({
    path: 'customer',
    model: Customer,
    select: '_id name',
  });
};
```

- The `populate()` method is called on the `query` object, which is returned when you call the `find()` method.
- This means you can call the `populateInvoices()` method and pass `Invoices.find()` as the argument like this:

```js
const showInvoices = async (req, res) => {
 const query = { owner: req.session.userId };
 const { search } = req.query;

 // const invoices = await Invoice.find(query);
 const invoices = await populateInvoices(Invoice.find(query), search);
 res.render("pages/invoices", {
  title: "Invoices",
  type: "data",
  invoices,
  info: req.flash("info")[0],
 });
};
```

- The `customer` field will be transformed into an object with `_id` and `name` properties.
- We’ll use this object later in the `views`.
- Export the function from the file as:

```js
module.exports = {
 showInvoices,
}
```

### Creating the Invoice Views

- Now you need to create the invoice views.
- Create a new template inside the `views/pages/` folder named `invoices.ejs` and add the following content to it:

```html
<!DOCTYPE html>
<html lang="en">
  <%- include('../partials/head') %>
  <body class="bg-gray-100">
    <div class="flex h-screen overflow-hidden">
      <%- include('../partials/navbar') %>
      <div class="ml-56 flex-grow p-10 overflow-y-auto">
        <% if (type === 'data') { %>
          <%- include('../partials/invoiceData') %>
          <% } else { %>
            <%-  include('../partials/invoiceForm') %>
        <% } %>
      </div>
    </div>
  <%- include('../partials/script') %>
</body>
</html>
```

- Now the next step is to create the `partial-templates`.
- First, create the `invoiceData.ejs` file.
- This one is similar to `customersData.ejs` except for
 the table content:

```html
<div class="w-full">
  <div class="flex w-full items-center justify-between">
    <h1 class="text-2xl"><%= title %></h1>
  </div>
  <form>
    <div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <div class="relative flex flex-1 flex-shrink-0">
        <label for="search" class="input input-bordered flex items-center gap-2 w-full">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="search" name="search" type="text" class="grow" placeholder="Search invoices..." />
        </label>
      </div>
      <a class="btn btn-primary" href="invoices/create">
        <i class="fa-solid fa-plus fa-lg mr-2"></i>
        New Invoice
      </a>
    </div>
  </form>
  <div class="mt-6 overflow-x-auto bg-white rounded-lg p-2">
    <table class="table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Amount</th>
          <th>Due Date</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <% invoices.forEach(function(invoice){ %>
        <tr>
          <td> <%= invoice.customer.name %> </td>
          <td> <%= INRupee.format(invoice.amount) %> </td>
          <td> <%= new Date(invoice.date).toLocaleDateString('en-US') %> </td>
          <td>
            <% if(invoice.status === 'paid') { %>
            <span class="ml-2 badge badge-sm badge-success p-3 gap-3 text-white">
              Paid <i class="fa-regular fa-circle-check"></i>
            </span>
            <% } else { %>
            <span class="ml-2 badge badge-sm badge-ghost p-3 gap-3">
              Pending <i class="fa-regular fa-clock"></i>
            </span>
            <% } %>
          </td>
          <td>
            <div class="flex justify-end gap-3">
              <a 
                class="rounded-md border p-2 hover:bg-gray-100" 
                href="invoices/<%= invoice._id %>/edit">
                  <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </a>
              <button 
                class="rounded-md border p-2 hover:bg-gray-100" 
                onclick="deleteModal('<%= invoice._id %>')">
                <span class="sr-only">Delete</span><i class="fa-solid fa-trash fa-lg"></i>
              </button>
            </div>
          </td>
        </tr>
        <% }); %>
      </tbody>
    </table>
  </div>
</div>
<dialog id="delete-modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Are you sure?</h3>
    <p class="py-4">The invoice will be deleted</p>
    <div class="modal-action">
      <form id='delete-form' method="post">
        <button class="btn btn-danger">Yes</button>
      </form>
      <form method="dialog">
        <button class="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
<script>
  function deleteModal(invoiceId) {
    const modal = document.querySelector('#delete-modal');
    const deleteForm = document.querySelector('#delete-form');
    deleteForm.setAttribute('action', `invoices/${invoiceId}/delete`)
    modal.showModal();
  }
</script>
```

- Next, you need to add the `invoiceForm.ejs` file.
- The form will show a `datepicker` to the users, so we’re going to use the `vanilla datepicker` library available from **<https://mymth.github.io/vanillajs-datepicker>**
- Open your `head.ejs` file and add the following CSS library:
  
```html
<link 
    rel="stylesheet" 
    href="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/css/datepicker.min.css"
/>
```

- Now in the `partials/` folder, create the `invoiceForm.ejs` template and write the code below in it:
  
```html
<h1 class=" mb-4 text-xl md:text-2xl"><%- title %></h1>
<form action="<%- formAction %>" method="post">
  <div class="rounded-md bg-slate-100 p-4 md:p-6">
    <div class="flex flex-col gap-4">
      <%- include('../partials/formErrors') %>
      <div class="form-control w-full gap-2"><span class="label-text">Choose Customer</span>
        <label for="customer" class="input input-bordered flex items-center gap-2">
          <i class="fa-regular fa-user"></i>
          <select class="grow cursor-pointer" name="customer" id="customer">
            <option value="">Select Customer</option>
            <% customers.forEach(function(customer){ %>
            <option value="<%= customer._id %>" 
              <%= String(invoice?.customer?._id) === String(customer._id) ? 'selected' : '' %>>
              <%= customer.name %>
            </option>
            <% }) %>
          </select>
        </label>
      </div>
      <div class="form-control w-full gap-2"><span class="label-text">Amount</span>
        <label for="amount" class="input input-bordered flex items-center gap-2">
          <i class="fa-solid fa-dollar-sign"></i>
          <input id="amount" name="amount" type="number" class="grow" placeholder="Enter in USD" value="<%= invoice?.amount || '' %>" />
        </label>
      </div>
      <div class="form-control w-full gap-2"><span class="label-text">Due Date</span>
        <label for="date" class="input input-bordered flex items-center gap-2">
          <i class="fa-regular fa-calendar"></i>
          <input id="date" name="date" type="text" class="grow" placeholder="4/5/2024" value="<%= invoice?.date? new Date(invoice.date).toLocaleDateString('en-US') : '' %>" />
        </label>
      </div>
      <div class="form-control w-full gap-2"><span class="label-text">Status</span>
        <div for="status" class="input input-bordered flex items-center gap-2">
          <div class="flex gap-4">
            <div class="flex items-center">
              <input type="radio" name="status" id="pending" class="radio" value="pending" <%= invoice?.status === 'pending' ? 'checked' : '' %> />
              <label for="pending" class="ml-2 badge badge-sm badge-ghost p-3 gap-3">Pending <i class="fa-regular fa-clock"></i></label>
            </div>
            <div class="flex items-center">
              <input type="radio" name="status" id="paid" class="radio" value="paid" <%= invoice?.status === 'paid' ? 'checked' : '' %> />
              <label for="paid" class="ml-2 badge badge-sm badge-success p-3 gap-3 text-white">Paid <i class="fa-regular fa-circle-check"></i></label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex justify-end gap-4">
      <a class="btn btn-ghost" href="/dashboard/invoices">Cancel</a><button type="submit" class="btn btn-primary">
        <%= title %>
      </button>
    </div>
</form>
```

- The `form` contains a select input for the customer, a number input for the `amount`, a `datepicker` for the due date, and a `radio input` for the `status`.
- Next, you need to add the **scripts** to render the **datepicker**:

```html
<script
  src="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/js/datepicker-full.min.js">
</script>
<script>
  const elem = document.querySelector('#date');
  const datepicker = new Datepicker(elem, {
    autohide: true,
    format: 'm/d/yyyy'
  });
</script>
```

- Here, the `datepicker` is rendered on the `#date` element, which is the `invoice` due date input we’ve added above.

### Creating the Invoice Route

- The next step is to create the invoice route file. You already know the pattern here.
- Inside the `routes/` folder, create an `invoice.route.js` file and write the code below:
  
```js
const express = require('express');
const router = express.Router();

const {
  showInvoices,
} = require('../controllers/invoice.controller');

router.get('/', showInvoices);

module.exports = router;
```

- Then, import route in `dashboard.route.js`:

```js
const invoicesRouter = require('./invoice.route');

// ...

router.use('/invoices', invoicesRouter);
```

- Now you can already visit the `/dashboard/invoices` URL from the browser, but there’s only an empty table there.

### Create New Invoices

- Next, go back to the `invoice.controller.js` and add the `createInvoice()` function:

```js
const createInvoice = async (req, res) => {
 const validationErrors = validationResult(req);
 if (!validationErrors.isEmpty()) {
  const errors = validationErrors.array();
  req.flash("errors", errors);
  req.flash("data", req.body);
  return res.redirect("create");
 }

 const newInvoice = req.body;
 newInvoice.owner = req.session.userId;

 await Invoice.create(newInvoice);
 req.flash("info", {
  message: "New Invoice Created",
  type: "success",
 });
 res.redirect("/dashboard/invoices");
};
```

- Oh and since we need to get the `customer` data for the `invoice` form, let’s create another function to get the customer data named `getCustomers()`:
  
```js
const getCustomers = async (req, res, next) => {
 const customerQuery = { owner: req.session.userId };
 const customers = await Customer.find(customerQuery);
 req.customers = customers;
 next();
};
```

- The customers data is attached to the `req.customers` property, so the next middleware can access the data there.
- Export the functions from the file as:

```js
 module.exports = {
  showInvoices,
  createInvoice,
  getCustomers,
  validateInvoice
 };
```

- And add the routes for creating new invoices in `invoice.route.js` as:

```js
const {
 showInvoices,
 createInvoice,
 getCustomers,
 validateInvoice,
} = require("../controllers/invoice.controller");

router.get("/create", getCustomers, (req, res) => {
 const { customers } = req;
 res.render("pages/invoices", {
  title: "Create Invoice",
  formAction: "create",
  type: "form",
  customers,
  invoice: req.flash("data")[0],
  errors: req.flash("errors"),
 });
});

router.post("/create", validateInvoice, createInvoice);
```

- Notice that the `getCustomers()` function are called on the `GET` route.
- This is so that we can use the data when rendering the form.

### Updating Invoices

- The next step is to enable updating invoices.
- Back on the `invoice.controller.js` again, write the `editInvoice()` function:

```js
const editInvoice = async (req, res) => {
 const invoiceId = req.params.id;
 const invoice = await populateInvoices(Invoice.findById(invoiceId));
 const { customers } = req;

 res.render("pages/invoices", {
  title: "Edit Invoice",
  type: "form",
  formAction: "edit",
  customers,
  invoice: req.flash("data")[0] || invoice,
  errors: req.flash("errors"),
 });
};
```

- This will `populate` the existing invoice data on the form.
- Next, create the `updateInvoice()` function as:
  
```js
const updateInvoice = async (req, res) => {
 const validationErrors = validationResult(req);
 if (!validationErrors.isEmpty()) {
  const errors = validationErrors.array();
  req.flash("errors", errors);
  req.flash("data", req.body);
  return res.redirect("edit");
 }

 const invoiceId = req.params.id;
 const data = req.body;

 await Invoice.findByIdAndUpdate(invoiceId, data);
 req.flash("info", {
  message: "Invoice Updated",
  type: "sucess",
 });
 res.redirect("/dashboard/invoices");
};
```

- Don’t forget to update the `exports` too:
  
```js
module.exports = {
 showInvoices,
 editInvoice,
 updateInvoice,
 createInvoice,
 getCustomers,
 validateInvoice,
};
```

- Next, create the routes for updating the invoice in `invoice.route.js` as:
  
```js
 const {
  showInvoices,
  createInvoice,
  editInvoice,
  updateInvoice,
  getCustomers,
  validateInvoice
} = require('../controllers/invoice.controller');

router.get('/:id/edit', getCustomers, editInvoice);

router.post('/:id/edit', validateInvoice, updateInvoice);
```

- And done! Now you can update existing invoices.

### Delete Invoices

- The last step is to enable the delete invoice function.
- Again, back to the controller `invoice.controller.js` file:

```js
const deleteInvoice = async (req, res) => {
 const invoiceId = req.params.id;

 await Invoice.findByIdAndDelete(invoiceId);
 req.flash("info", {
  message: "Invoice Deleted",
  type: "success",
 });
 res.redirect("/dashboard/invoices");
};

module.exports = {
 showInvoices,
 editInvoice,
 deleteInvoice,
 updateInvoice,
 createInvoice,
 getCustomers,
 validateInvoice,
};
```

- Then create the route:
  
```js
const {
  showInvoices,
  editInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getCustomers,
  validateInvoice
} = require('../controllers/invoice.controller');

//...

router.post('/:id/delete', deleteInvoice);
```

- And that’s it. Now you can manipulate the invoice data as required.

### Delete All Invoices When a Customer is Deleted

- Since the invoices are connected to a single customer,let’s delete all invoices for the same customer.
- Open your `customer.controller.js` file, import the invoice model, and update the `deleteCustomer()` function:

```js
const Invoice = require("../libs/models/invoice.model");

// ...

const deleteCustomer = async (req, res) => {
 const customerId = req.params.id;

 // delete invoices by that customer
 await Invoice.deleteMany({ customer: customerId });
 await Customer.findByIdAndDelete(customerId);
 req.flash("info", {
  message: "Customer Deleted",
  type: "success",
 });
 res.redirect("/dashboard/customers");
};
```

- This way, the `customer` and `invoice` data will always be up to date.

## USING CHART.JS ON THE DASHBOARD

- Right now, our `dashboard` is still empty, so let’s fill it with `customer` and `invoice` data to show some insights.
- We will also use `Chart.js` to _draw_ a chart on the `dashboard` showing the `revenue` in the _last 6 months_.

### Formatting the Currency

- Before we code the dashboard page, let’s fix a little issue from the previous chapter.
- When you open the `invoices` page, notice that the invoice `amount` is shown as nothing with any currency sign like just bare numbers:
- To make it more pleasing, let’s format the amount in `INR` means `Indian National Rupee` instead of just bare numbers.
- In the `libs/` folder, create a new file named `formatter.js` and add the code below:

```js
const INRupee = new Intl.NumberFormat("en-IN", {
 style: "currency",
 currency: "INR",
});

module.exports = {
 INRupee,
};
```

- The code above creates a new international number format object that can be used to format numbers.
- Now in the `invoice.controller.js` file, import the object and pass it to the `res.render()` method that renders the invoice table:

```js
const { INRupee } = require("../libs/formatter");

// ...

const showInvoices = async (req, res) => {
 const query = { owner: req.session.userId };
 const { search } = req.query;

 const invoices = await populateInvoices(Invoice.find(query), search);
 res.render("pages/invoices", {
  title: "Invoices",
  type: "data",
  invoices,
  INRupee, // <<<< Indian National Rupee
  info: req.flash("info")[0],
 });
};
```

- After passing the object, you can use it in the `invoiceData.ejs` file as follows:

```html
<td> <%= INRupee.format(invoice.amount) %> </td>
```

- Now if you open the invoices page, you see the number formatted as 💲300.00.
- Looks nice!

### Creating the Dashboard Controller

- The dashboard page of the application will show several important insights to the user.
- First, there are `4` boxes showing the `total sum` of `invoices` that have been `paid`, are still `pending`, `total invoices` created, and `total customers`:
- Because the dashboard doesn’t create new data, we don’t need a model.
- In the `controllers/` folder, create a new file named `dashboard.controller.js` and write the code below:

```js
const Custoemer = require("../libs/models/customer.model");
const Invoice = require("../libs/models/invoice.model");

const { INRupee } = require("../libs/formatter");

const showDashboard = async (req,res) => {
  // ...
}

module.exports = {
  showDashboard,
}
```

- The `showDashboard()` function needs to get the data required by the dashboard page.
- Inside the function, get the total count of the customers and invoices using the `countDocument()` method first as:

```js
const query = { owner: req.session.userId };

// getting counts of invoices and customers of the user(owner)
const invoiceCount = await Invoice.countDocuments(query);
const customerCount = await Customer.countDocuments(query);
```

- Next, you need to get all invoices created by the user, then pull the customer name using `populate()` like this:

```js
// getting all invoices data
 const allInvoices = await Invoice.find(query).populate({
  path: "customer",
  model: Customer,
  select: "_id name", // getting `_id` and `name` of customer
});
```

- The above code will fetch all invoice data.
- You can then use the `reduce()` JavaScript function to get the total amount of `paid` and `pending` invoices:
  
```js
// getting total paid amount
const totalPaid = allInvoices.reduce((sum, invoice) => {
  return invoice.status === "paid" ? sum + invoice.amount : sum;
}, 0);

const totalPending = allInvoices.reduce((sum, invoice) => {
  return invoice.status === "pending" ? sum + invoice.amount : sum;
}, 0);
```

- Now call the `res.render()` method in the `dashboard.controller.js` file to render the view:

```js
// rendering the view
res.render("pages/dashboard", {
  title: "Dashboard",
  invoiceCount,
  customerCount,
  totalPaid,
  totalPending,
  INRupee,
  info: req.flash("info")[0],
});
```

### Updating the Dashboard View

- With the controller completed, it’s time to add the 4 boxes to the view template.
- Update the `pages/dashboard.ejs` template as shown below:

```html
 <!DOCTYPE html>
 <html lang="en">
 <%- include('../partials/head') %>
 <body class="bg-gray-100">
  <div class="flex h-screen overflow-hidden">
    <%- include('../partials/navbar') %>
    <div class="ml-56 flex-grow p-10 overflow-y-auto">
      <h1 class=" mb-4 text-2xl"><%= title %></h1>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl bg-white p-2 shadow-sm">
          <div class="flex p-4">
           <i aria-hidden="true" class="fa-solid fa-money-bills"></i>
            <h3 class="ml-2 text-sm font-medium">Collected</h3>
          </div>
          <p class=" truncate rounded-xl border-slate-200 border px-4 py-8 text-center text-2xl">
            <%= INRupee.format(totalPaid) %>
          </p>
        </div>
        <div class="rounded-xl bg-white p-2 shadow-sm">
          <div class="flex p-4">
            <i aria-hidden="true" class="fa-regular fa-clock"></i>
            <h3 class="ml-2 text-sm font-medium">Pending</h3>
          </div>
          <p class=" truncate rounded-xl border-slate-200 border px-4 py-8 text-center text-2xl">
            <%= INRupee.format(totalPending) %>
          </p>
        </div>
        <div class="rounded-xl bg-white p-2 shadow-sm">
          <div class="flex p-4">
            <i aria-hidden="true" class="fa-regular fa-folder-open"></i>
            <h3 class="ml-2 text-sm font-medium">Total Invoices</h3>
          </div>
          <p class=" truncate rounded-xl border-slate-200 border px-4 py-8 text-center text-2xl">
            <%= invoiceCount %>
          </p>
        </div>
        <div class="rounded-xl bg-white p-2 shadow-sm">
          <div class="flex p-4">
            <i aria-hidden="true" class="fa-solid fa-users"></i>
            <h3 class="ml-2 text-sm font-medium">Total Customers</h3>
          </div>
          <p class=" truncate rounded-xl border-slate-200 border px-4 py-8 text-center text-2xl">
            <%= customerCount %>
          </p>
        </div>
      </div>
    </div>
  </div>
  <%- include('../partials/script') %>
 </body>
 </html>
```

- The code above uses CSS grid to make the layout of the 4 boxes responsive.
- Now if you open the dashboard page, you will see the insights shown.

### Showing the Revenue Chart

- Below the 4 boxes, we’re going to add a revenue chart that shows the revenue for the last 6 months.
- We’re going to use `Chart.js` to do this, and if you never use `Chart.js` before, don’t worry because it’s quite simple to use.
- Basically, `Chart.js` allows you to create a chart on top of the HTML `<canvas>` element by calling a function and specifying the options for the chart.
- Back in the `dashboard.ejs` file, you can create an empty `<canvas>` element below the `<div>` with grid class as follows:

```html
<!-- <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"> -->
<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
  <div class="w-full md:col-span-4">
    <h2 class=" mb-4 text-2xl">
      Recent Revenue
    </h2>
    <div class="rounded-xl bg-white p-4">
      <canvas id="revenueChart" width="600" height="400"></canvas>
      <div class="flex items-center pb-2 pt-6">
        <i aria-hidden="true" class="fa-regular fa-calendar fa-lg"></i>
        <h3 class="ml-2 text-sm text-slate-1000">Last 6 months</h3>
      </div>
    </div>
  </div>
</div>
```

- Now we can render the chart on the `revenueChart` canvas.
- At the bottom of the file, add a link to fetch `Chart.js` code, then create a new chart instance by calling the new `Chart()` function:

```html
 <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
 <script>
  const canvas = document.getElementById('revenueChart');
  Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Revenue',
        data: [100, 200, 300, 400, 500, 600],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
</script
```

- When you call the `new Chart()` function, pass the `canvas` as the first argument, and the chart `options` as the `second` argument.
- Here, we pass the `type` of the chart we want to render, which is the `bar chart`.
- The `data` object allows you to specify the data to use in the `chart`.
- The `labels` here will label each bar generated.
- The `datasets` property contains various options, but the most important one is the `data array`, which is the value represented by the chart.
- The above script will generate the chart.

- To make the chart represent our invoice data, we only need to adjust the `labels` and `data array`.
- Back in the `invoice.controller.js` file, update the `showDashboard()` function with the following code:

```js
const revenueData = [];

// for last 6 months
for (let i = 0; i < 6; i++) {
  const today = new Date();
  today.setMonth(today.getMonth() - i);
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const month = today.toLocaleString("default", { month: "short" });

  const revenueForMonth = allInvoices
    .filter((invoice) => {
      return (
        new Date(invoice.date) >= firstDay &&
        new Date(invoice.date) <= lastDay
      );
    })
    .reduce((total, invoice) => total + invoice.amount, 0);

  revenueData.unshift({ month, revenue: revenueForMonth });
}
```

- The code looks a bit complicated, but the main point is that the for loop will run 6 times, and in each loop, we get the `revenue` data for a month.
- The loop begins in the current month, and then moves backward for the last 6 months.
- As a result, the `revenueData` variable becomes an array of objects that contain the `name` of the `month` and the `revenue` for that month like this:
  
```js
[
  { month: 'Nov', revenue: 300 },
  { month: 'Dec', revenue: 100 },
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 400 },
  { month: 'Mar', revenue: 50 },
  { month: 'Apr', revenue: 350 }
]
```

- Next, pass the `revenueData` to the `dashboard` page as a `JSON string` in `res.render()` in `dashboard.controller.js` file:

```js
res.render('pages/dashboard', {
  title: 'Dashboard',
  revenueData: JSON.stringify(revenueData),
  // ...
 });
```

- Now you can use the `revenueData` variable on the `<script>` tag for rendering the chart:

```html
<script>
    const revenueData = JSON.parse('<%- revenueData %>');
    const canvas = document.getElementById('revenueChart');
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: revenueData.map(item => item.month),
        datasets: [{
          label: 'Revenue',
          data: revenueData.map(item => item.revenue),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      // options ...
    });
</script>
```

- The `revenueData` is parsed using the `JSON.parse()` method, then the values are passed to the `labels` and `data` options using the array `map()` method.
- Now if you `refresh` the dashboard page, your invoice data will be reflected on the chart:

### Showing Five Latest Invoices

- The last part of the dashboard page will show the customer `name`, `amount`, and `status` of `5 latest invoices`.
- In the dashboard controller, you need to `sort` the `allInvoices` data in `descending order`, then `slice` the **first 5 elements** of the array as follows in the `dashboard.controller.js` in `showDashboard()`function:

```js
// sort in descending order
allInvoices.sort((a, b) => new Date(b.date) - new Date(a.date));

const latestInvoices = allInvoices.slice(0, 5);
```

- Now pass the `latestInvoices` data to the `view`:
  
```js
res.render('pages/dashboard', {
  title: 'Dashboard',
  latestInvoices,
  // ...
});
```

- And update the `view` template from `dashboard.ejs` to render the invoices as shown below:

```html
 <!-- <div class="w-full md:col-span-4"> -->
 <div class="flex w-full flex-col md:col-span-4">
  <h2 class=" mb-4 text-2xl">
    Latest Invoices
  </h2>
  <div class="flex grow flex-col justify-between rounded-xl bg-white p-4">
    <div class="border-slate-200 border px-6">
      <% latestInvoices.forEach(invoice => { %>
      <div class="flex flex-row items-center justify-between py-4">
        <div class="flex items-center">
          <p class="truncate font-semibold text-base">
            <%= invoice.customer.name %>
          </p>
          <p class="hidden text-sm text-slate-1000 sm:block">
            <% if(invoice.status === 'paid') { %>
            <span class="ml-2 badge badge-sm badge-success p-3 gap-3 text-white">
              Paid <i class="fa-regular fa-circle-check"></i>
            </span>
            <% } else { %>
            <span class="ml-2 badge badge-sm badge-ghost p-3 gap-3">
              Pending <i class="fa-regular fa-clock"></i>
            </span>
            <% } %>
          </p>
        </div>
        <p class=" truncate font-medium">
         <%= INRupee.format(invoice.amount) %>
        </p>
      </div>
      <% }) %>
    </div>
    <div class="flex items-center pb-2 pt-6">
      <i aria-hidden="true" class="fa-regular fa-note-sticky fa-lg"></i>
      <h3 class="ml-2 text-sm text-slate-1000">Last 5 invoices</h3>
    </div>
  </div>
 </div>
```

- And that’s it.
- Now you should be able to see the last 5 invoices as shown below:
- And that’s it. Now you should be able to see the last 5 invoices as shown below:

## ADDING THE SEARCH FEATURE

- With the dashboard page done, the last feature to develop is the `search feature` on the `customer` and `invoice` pages.
- If you type something into the `search bar` and then press Enter, you will see that the input value is already added to the `URL` query parameter under the `?search` parameter:
- This means that the view is already reacting to the user action.
- You only need to update the `controller` to take into account the search value and filter the returned results.

### Adding Customer Search

- Let’s do the customer search first.
- In the `showCustomers()` function, get the `search` query parameter from the `req.query` object as follows:

```js
const query = { owner: req.session.userId };

const { search } = req.query;
if (search) {
  query["$or"] = [
   { name: { $regex: search, $options: "i" } },
   {
    email: { $regex: search, options: "i" },
   },
   {
    phone: { $regex: search, options: "i" },
   },
   {
    address: { $regex: search, options: "i" },
   },
  ];
 }
```

- When the `search` variable is defined, we add the `$or` operator so that `Mongoose` will `search` for any matching value in the `name`, `email`, `phone`, and `address` fields.
- The rest of the code stays the same, so if you do a search now, you will see only matching customer data on the table.

### Adding Invoice Search

- The next step is to add a `search` function to the `invoice`.
- We need to make the invoice searchable using the customer’s name.
- In the `showInvoices()` function from `invoices.controller.js` file, `unpack` the search value from `req.query` object, then pass it to the `populateInvoices()` function as follows:

```js
const { search } = req.query;

const invoices = await populateInvoices(Invoice.find(query), search);
```

- The next step is to update the `populateInvoices()` function. You need to add the match option when the `search` argument is defined.
- To make this possible, separate the options passed to the populate option as a variable, then modify the populate option only when `search` is defined:

```js
const populateInvoices = (query, search) => {
  const populateOptions = {
    path: 'customer',
    model: Customer,
    select: '_id name',
  };
  if (search) {
    populateOptions['match'] = { name: { $regex: search, $options: 'i' } };
  }
 };
```

- The customer property will be `null` when the customer data doesn’t match the `search` value, so you need to filter the invoice data and remove all invoices that have the customer value of `null`.
- This can be done on the `return` statement, where you can chain the `populate()` method call with a `then()` as follows:

```js
return query
 .populate(populateOptions)
 .then(invoices => invoices.filter(invoices => invoices.customer != null));
```

- Alright, now the invoices can be filtered by the `customer-name` field.
