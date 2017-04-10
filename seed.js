// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
  // console.log("Created new campsite", campsite._id)
  // process.exit(); // we're all done! Exit the program.
// }

var food_list = [
	{
		name: "Eggs",
		notes: "Over easy only",
		cookTime: 8,
		proficiency: "High",
		partyReady: true
	},
	{
		name: "Jalepeno Poppers",
		notes: "Vegan option unavailable",
		cookTime: 70,
		proficiency: "Moderate",
		partyReady: true
	},
		{
		name: "Blackened Chicken",
		notes: "Nutritious and delicious",
		cookTime: 30,
		proficiency: "Low",
		partyReady: false
	},
];

db.Food.remove({}, function(err, foods) {
	console.log('removed all foods');
	db.Food.create(food_list, function(err, foods){
		if(err) { 
			console.log(err);
			return;
		}
		console.log('created', foods.length, 'foods');
	});
});



