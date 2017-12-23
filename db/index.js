const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let MONGO_URL;
const MONGO_LOCAL_URL = 'mongodb://localhost/barexam';

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
	MONGO_URL = process.env.MONGODB_URI;
} else {
	mongoose.connect(MONGO_LOCAL_URL);
	MONGO_URL = MONGO_LOCAL_URL;
}


const db = mongoose.connection;
db.on('error', function(err) {
	console.log(`There was an error connecting to the database: ${err}`);
});
db.once('open', function() {
	console.log(
		`You have successfully connected to your mongo database: ${MONGO_URL}`
	);
});

module.exports = db;