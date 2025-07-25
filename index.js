const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const { verifyUser } = require("./libs/middleware");

require("dotenv").config();
require("./libs/dbConnect");

const userRouter = require("./routes/user.route");
const dashboardRouter = require("./routes/dashboard.route");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		secret: process.env.AUTH_SECRET,
		saveUninitialized: true,
		resave: false,
	})
);

app.use(flash());

// app.get("/", (req, res) => {
// 	res.render("index", { message: "Hello From Node.js" });
// });

app.use("/", userRouter);
app.use("/dashboard", verifyUser, dashboardRouter);
// app.get("*", (req, res) => {
// 	res.status(404).render("index", { message: "Not Found" });
// });
// REPLACING
app.use("/{*any}", (req, res) => {
	res.status(404).render("index", { message: "Not Found", title: "Not Found" });
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// npm install -D  autoprefixer postcss postcss-cli tailwindcss@3

// npm install --save-dev daisyui

// npm run devcss

// https://github.com/codewithnathan97/finly/tree/chapter-17
