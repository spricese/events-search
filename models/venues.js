var mongoose = require('mongoose');

//Venues schema

var venueSchema = mongoose.Schema(
{   
	name:{
		type: String,
		required: true
	},
	postcode:{
		type: String,
		//required: true
	},
	town:{
		type: String,
		//required: true
	},
	url:{
		type: String,
		//required: true
	},
	icon:{
		type: String,
		//required: true
	}
});

var Venue = module.exports = mongoose.model('Venue', venueSchema);
//module.exports = venueSchema;

// Get Venues
module.exports.getVenues = function(callback, limit){
	Venue.find(callback).limit(limit);
}

// Get Venue by ID
module.exports.getVenueById = function(id, callback){
	Venue.findById(id, callback);
}

// Add Venue
module.exports.addVenue = function(venue, callback){
	Venue.create(venue, callback);
}

/*//get Venue by Name 
module.exports.getVenueByName = function(name, callback){
	Venue.find({ name: name }, callback);
}*/

// Update Venue 
module.exports.updateVenue = function(id, venue, options, callback){
	var query = {_id: id};
	var update = {
		name: venue.name,
		icon: venue.icon
	}
	Venue.findOneAndUpdate(query, update, options, callback);
}

// Delete Venue 
module.exports.removeVenue = function(id, callback){
	var query = {_id: id};
	Venue.remove(query, callback);
}