var mongoose = require('mongoose'),
Venue = require('./venues');

//Events schema
var eventSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	desc:{
		type: String,
		required: false 
	},
	date:{
		type: Date,
		required: false
	},
	url:{
		type: String,
		required: false
	},
	venue:{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Venue'
	}
	
	//venue: VenueSchema
});

var Event = module.exports = mongoose.model('Event', eventSchema);

// Get Events
module.exports.getEvents = function(callback, limit){
	Event.find(callback).populate('venue').exec();
	//Event.findOne().populate('venue_id').exec().then(callback);
	//Venue.findOne({ id: req.params.id }).populate('venues').exec().then(callback);
	//Event.find({ venue: venue._id }).exec();
	//Event.Venue.getVenueById().populate('venues').exec();
	//Event.find(callback).limit(limit);
}

// Get Event by ID 
module.exports.getEventByID = function(id, callback){
	//Event.findById(id).populate('venue').exec().then(callback);
	//Event.findOne().populate('venues').exec().then(callback);
	Event.findById(id, callback).populate('venue').exec();
}

// Add Event 
module.exports.addEvent = function(event, callback){
	Event.create(event, callback);
}

// Update Event 
module.exports.updateEvent = function(id, event, options, callback){
	var query = {_id: id};
	var update = {
		name: event.name,
		venue: event.venue
	}
	Event.findOneAndUpdate(query, update, options, callback);
}

// Delete Event 
module.exports.removeEvent = function(id, callback){
	var query = {_id: id};
	Event.remove(query, callback);
}

/*Event.findOne({
  venue: id,
})
   .populate('venue')
   .exec()
   .then((ret) => {
     // ...
   })
   .catch((err) => {
     // ...
   });*/

