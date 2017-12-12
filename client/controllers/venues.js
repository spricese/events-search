var myApp = angular.module('myApp');

myApp.controller('VenuesController', ['$scope', '$http','$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('VenuesController loaded...');

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

	$scope.addVenue = function(){
		console.log($scope.venue);
		$http.post('/events2017/venues/',$scope.venue).then(function(response){
			window.location.href = '#!/events/add';
		});
	}

	$scope.removeVenue = function(id){
		$http.delete('/events2017/venues/'+id).then(function(response){
			window.location.href='#!/login';
		});
	}

}]);