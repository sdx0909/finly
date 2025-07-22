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
  <main class="flex mx-auto w-full max-w-[460px] flex-col space-y-2.5 p-4 mt-12">
    <div class="flex h-24 w-full items-end rounded-lg bg-green-500 p-3">
      <div class="flex flex-row items-center text-white">
        <i aria-hidden="true" class="fa-3x fa-solid fa-coins pr-4">
        </i>
        <p class="text-[44px]">Finly</p>
      </div>
    </div>
    <!-- adding from-for-signup  -->
    <span>
      Already have an account? <a href='/login' class="link link-primary link-hover">Log in</a>
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
            <i class="opacity-70 fa-solid fa-envelope">
            </i>
            <input 
                name="email" 
                type="email" 
                class="grow" 
                placeholder="Email" 
                <!-- value-element -->
            />
        </label>
        <label class="input input-bordered flex items-center gap-2">
            <i class="opacity-70 fa-solid fa-key">
            </i>
            <input 
                name="password" 
                type="password" 
                class="grow" 
                placeholder="Password" 
                <!-- value-element -->
            />
        </label>
        <label class="input input-bordered flex items-center gap-2">
            <i class="opacity-70 fa-solid fa-key">
            </i>
            <input 
                name="repeatPassword" 
                type="password" 
                class="grow" 
                placeholder="Repeat Password" 
                <!-- value-element -->
            />
        </label>
    </div>
    <button class="btn btn-primary w-full">
        Sign up
        <i aria-hidden="true" class="ml-auto fa-solid fa-arrow-right fa-lg">
        </i>
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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/styles/style.css" rel="stylesheet" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />
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
app.use(express.urlencoded({    
    extended: false 
}));
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
const { 
    validateSignup, 
    signup 
} = require("../controllers/user.controller");

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
}
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
    req.flash("key","value");
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
<% if(typeof errors !== 'undefined') { %>
  <% errors.forEach(function(error) { %>
    <div role="alert" class="alert alert-error">
      <i class="fa-regular fa-circle-xmark"></i>
      <span><%= error.msg %></span>
    </div>
  <% }) %>
<% } %>
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
    value="<%= user?.email || '' %>" 
/>

<input 
    name="password" 
    type="password" 
    class="grow" 
    placeholder="Password" 
    value="<%= user?.password || '' %>" 
/>

<input 
    name="repeatPassword" 
    type="password" 
    class="grow" 
    placeholder="Repeat Password" 
    value="<%= user?.repeatPassword || '' %>" 
/>
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
  