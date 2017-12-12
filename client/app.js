var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/',{
		controller:'EventsController',
		templateUrl: 'views/events.html'
	})
	.when('/events',{
		controller: 'EventsController',
		templateUrl: 'views/events.html'
	})
	.when('/events/details/:id',{
		controller:'EventsController',
		templateUrl:'views/event_details.html'
	})
	.when('/events2017/admin',{
		controller: 'EventsController',
		templateUrl: 'views/add_event.html'
	})
	.when('/events/edit/:id',{
		controller:'EventsController',
		templateUrl:'views/edit_event.html'
	})
	.when('/login',{
		controller:'UsersController',
		templateUrl:'views/login.html'
	})
	.when('/events2017/venues/add',{
		controller:'VenuesController',
		templateUrl:'views/add_venue.html'
	})
	.otherwise({
		redirectTo:'/'
	});
});