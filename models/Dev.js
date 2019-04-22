var mongoose = require('mongoose');

var DevSchema = new mongoose.Schema({
	id: String,
	name: String,
	username: String,
	timestamp: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Dev', DevSchema);
