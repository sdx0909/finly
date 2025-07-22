const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

try {
	mongoose.connect(MONGODB_URI, {
		dbName: "finly-db",
		bufferCommands: true,
	});
	console.log("connected to MongoDb");
} catch (error) {
	console.log(error);
}
