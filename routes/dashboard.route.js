const express = require("express");
const router = express.Router();
const customerRouter = require("./customer.route");
const invoiceRouter = require("./invoice.route");
const { invoiceCount } = require("../controllers/dashboard.controller");
const { showDashboard } = require("../controllers/dashboard.controller");

// router.get("/", (req, res) => {
// 	res.render("pages/dashboard", {
// 		title: "Dashboard",

// 		info: req.flash("info")[0],
// 	});
// });

router.get("/", showDashboard);

// NESTING ROUTE :: for CUSTOMERS
router.use("/customers", customerRouter);

// NESTING ROUTE :: for INVOICES
router.use("/invoices", invoiceRouter);

module.exports = router;
