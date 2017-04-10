var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var FoodSchema = new Schema({
	name: String,
	notes: String,
	cookTime: Number,
	proficiency: String,
	partyReady: Boolean,
});

var Food = mongoose.model('Food', FoodSchema);
module.exports = Food;