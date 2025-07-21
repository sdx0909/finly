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
