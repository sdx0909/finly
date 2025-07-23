const express = require("express");
const router = express.Router();
const customerRouter = require("./customer.route");

router.get("/", (req, res) => {
	res.render("pages/dashboard", {
		title: "Dashboard",
		info: req.flash("info")[0],
	});
});

// NESTING ROUTE
router.use("/customers",customerRouter)

module.exports = router;
