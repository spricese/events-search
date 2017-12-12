var myApp = angular.module('myApp');
	
myApp.controller('EventsController', ['$scope', '$http','$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('EventsController loaded...');

	$scope.getRemoteEvents = function() {  
	 var oArgs = {
	        app_key: "GwxNCNsWfn4HxvFT",
	        q: "music",
	        where: "United Kingdom", 
	        "date": "2010061000-2015062000",
	        page_size: 10,
	        sort_order: "popularity",
	     };
	 EVDB.API.call("/events/search", oArgs, function(oData) {
	    var obj = oData;
	    console.log(obj);
	    function simplifyObject(obj){
	        return obj.events.event.map((x) => { return { title: x.title, desc: x.description, date: x.start_time, venue_name: x.venue_name, venue_address: x.venue_address, postal_code: x.postal_code, icon: x.image } });	
	    }
	    result = simplifyObject(obj);
	    $scope.events = ($scope.events || []).concat(result);
	    console.log($scope.events);
	 });

	//$scope.getEvents = function(){
	    $http.get('/events2017/events').then(function(response){
	        $scope.events = ($scope.events || []).concat(response.data);
	    });
	//}
	console.log($scope.events);

	}

	$scope.getEvent = function(){
		var id = $routeParams.id;
		$http.get('/events2017/events/get/'+id).then(function(response){
			$scope.event = response.data;
		});
	}

	$scope.addEvent = function(){
		console.log($scope.event);
		$http.post('/events2017/events/',$scope.event).then(function(response){
			window.location.href = '#/events';
		});
	}

	$scope.removeEvent = function(id){
		$http.delete('/events2017/events/'+id).success(function(response){
			window.location.href='#/events';
		});
	}

	$scope.getVenues = function(){
		$http.get('/events2017/venues').then(function(response){
			$scope.venues = response.data;
		});
	}

	$scope.getVenue = function(){
		var id = $routeParams.id;
		$http.get('/events2017/venues/'+id).then(function(response){
			$scope.venue = response.data;
		});
	}

	$scope.removeVenue = function(id2){
		$http.delete('/events2017/venues/'+id2).then(function(response){
			window.location.href='#!/events/';
		});
	}


	/*$scope.search = function (event) {
    //$scope.searchString is the model of matching string input field
    var query = $scope.searchString.toLowerCase(),
       fullText = event.name.toLowerCase() + ' ' + event.venue.toLowerCase() + event.desc.toLowerCase();

    if (fullText.indexOf(query) != -1) {
    	return true;
    }
    return false;
    }*/


/*const mongoose = require('mongoose')
const events = require('./events.js')

let query = Event.findOne({ name: "Hoxton of London"})

query.exec((err, user) => {
	if (err) {
		console.log(err)
	}

	event.venue = venue

 })*/
}]);