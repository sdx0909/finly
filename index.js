// 1: requiring the "express" module
const express = require("express");

// 01: requiring the "morgan" module
const morgan = require("morgan");

// 2: creating the express-app
const app = express();

// 02: use the "morgan" with "dev" dependency
app.use(morgan("dev"));

// configurations for "ejs" template files
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("./public"));

// 3-1: get with /:route request in express-server
app.get("/", (req, res) => {
  // res.end("Hello from express-server");\
  res.render("index", { message: "Hello from Express-Server" });
});

// 3-2: get with /contact:route request in express-server
app.get("/contact", (req, res) => {
  //   res.send("The Contact Page");
  res.render("index", { message: "This is Contact Page" });
});

// 3-3: get with /about:route request in express-server
app.get("/about", (req, res) => {
  //   res.send("The About Page");
  res.render("index", { message: "This is About Page" });
});

// 3-4: get with *(any) :route request in express-server
app.get("/{*any}", (req, res) => {
  //   res.status(404).send("Not Found");
  res.render("index", { message: "Page Not Found" });
});

// 4: listening the express-server at PORT:3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

// npm install -D  autoprefixer postcss postcss-cli tailwindcss@3

// npm install --save-dev daisyui

// npm run devcss
