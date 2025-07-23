const verifyUser = (req, res, next) => {
	if (!req.session.userId) return res.redirect("/login");
	next();
};

const redirectAuthenticated = (req, res, next) => {
	// todo:(imp) when user is logged-in and try to get the "login" and "signup" page then he has to stay on only "dashboard" page.
	if (req.session.userId) return res.redirect("/dashboard");
	next();
};

module.exports = {
	verifyUser,
	redirectAuthenticated,
};
