var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Venue = require('./models/venues');
Event = require('./models/events');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/events', { useMongoClient: true });  

var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Please use /events!s');
});

// GET events
app.get('/events2017/events', function(req, res){
	Event.getEvents(function(err, events){
		if(err){
			throw err;
		}
		res.json(events);
	});
});

// GET event by ID 
app.get('/events2017/events/get/:_id', function(req, res){
	Event.getEventByID(req.params._id, function(err, event){
		if(err){
			throw err;
		}
		res.json(event);
	});
});

// POST event 
app.post('/events2017/events/add', function(req, res){
	var event = req.body;
	Event.addEvent(event, function(err, event){
		if(err){
			throw err;
		}
		res.json(event);
	});
});

// UPDATE event 
app.put('/events2017/events/get/:_id', function(req, res){
	var id = req.params._id;
	var event = req.body;
	Event.updateEvent(id, event, {}, function(err, event){
		if(err){
			throw err;
		}
		res.json(event);
	});
});

// DELETE event
app.delete('/events2017/events/:_id', function(req, res){
	var id = req.params._id;
	Event.removeEvent(id, function(err, event){
		if(err){
			throw err;
		}
		res.json(event);
	});
});

// GET venue 
app.get('/events2017/venues', function(req, res){
	Venue.getVenues(function(err, venues){
		if(err){
			throw err;
		}
		res.json(venues);
	});
});

// GET venue by ID 
app.get('/events2017/venues/:_id', function(req, res){
	Venue.getVenueById(req.params._id, function(err, venue){
		if(err){
			throw err;
		}
		res.json(venue);
	});
});
/*// POST venue 
app.post('/api/venues', function(req, res){	
	var venue = req.body;
	res.send(venue);
	Venue.addVenue(venue, function(err, venue){
		if(err){
			throw err;
		}
		res.json(venue);
	});
});*/


// POST venue 
app.post('/events2017/venues', function(req, res){
	var venue = req.body;
	Venue.addVenue(venue, function(err, venue){
		if(err){
			throw err;
		}
		res.json(venue);
	});
});



// UPDATE venue by ID
app.put('/events2017/venues/:_id', function(req, res){
	var id = req.params._id;
	var venue = req.body;
	Venue.updateVenue(id, venue, {}, function(err, venue){
		if(err){
			throw err;
		}
		res.json(venue);
	});
});

// DELETE venue
app.delete('/events2017/venues/:_id', function(req, res){
	var id = req.params._id;
	Venue.removeVenue(id, function(err, venue){
		if(err){
			throw err;
		}
		res.json(venue);
	});
});

var User = require('./models/users');
var secretKey = 'Concertina'; 

function createToken(user, req) {
  var token = jwt.sign({
    id: user._id,
    name: user.name,
    username: user.username,
  }, secretKey, {
    expiresIn: 120
  });
  return token;
}
	//create user route
app.post('/signup', function(req, res) {
	var user = new User({
    	//name: req.body.name,
      	username: req.body.username,
      	password: req.body.password
    });
    user.save(function(err) {
    	if (err) {
        	/*res.send(err);
        	return;*/
        	throw err;
      	}
      	res.json({
      		user,
        	message: "A new user has been created!"
      	});
    });
});

//get all users route
app.get('/users', function(req, res) {
	User.find({}, function(err, users) {
    	if (err) {
        	res.send(err);
        	return;
      	}
      	res.json(users);
    	}); //mongoose find method
  });

//L O G I N  R O U T E w/JWT DESTINATION A
app.post('/login', function(req, res) {
	User.findOne({
    	username: req.body.username
    	}).select('password').exec(function(err, user) {
      	if(err) throw err;
      	//console.log(req.body.password);
      	if (!user) {
        	res.send({
          	message: "This user does not exist.",
          	success: false
        	});
    	} 

    	else if(user){
	    	user.comparePassword(req.body.password, function(err,valid){
	    		//console.log(req.body.password);
	        	if (err) {
	        	} else {
	        		if (valid){
			        	var token = createToken(user);
			          	res.json({
			            	success: true,
			            	message: "Successful Login!",
			            	token: token
			          	});
	        		} else {
	        			//console.log(req.body.password);
			        	res.send({
			        		success: false, 
			            	message: "Invalid Password!",
			          	})
	        		}
	        	}
	        });
    	}
    });
  });
///
//MIDDLEWARE //After user succesfully logs in...check for authentication: MIDDLEWARE
app.use(function(req, res, next) {
    console.log("User entered the app!");   
    //CHECK for the token.. token is stored here.. body or headers.. 
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    //VERIFY if token exist
    if (token) {
      //use our jwt object 
    	jwt.verify(token, secretKey, function(err, decoded) {
        if (err) {
        	res.status(403).send({
            	success: false,
            	message: "Failed to authenticate user"
          	});
        } else {
        	req.decoded = decoded;//user successfully has a token!
        	next();
        	}
      	});
      //VERIFY if token DOES NOT exist    
    } else {
    	res.status(403).send({
        	success: false,
        	message: "There's no token!"
      	});
    }	

//authenticate for angular api
//in order to get/fetch the decoded/logged in user's token/data..
app.get('/me', function(req, res) {
    res.json(req.decoded);
  });
      return app;
  });

app.listen(process.env.PORT || 3000);
console.log('Running on port 3000...');