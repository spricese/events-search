var myApp = angular.module('myApp');

myApp.controller('UsersController', ['$scope', '$http','$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('UsersController loaded...');

	$scope.login = function(){
		console.log($scope.user);
		$http.post('/login',$scope.user).then(function(response){
			console.log(response);
			if (response.data.success)
			{
				window.location.href='#!/events2017/admin';
			}
			else 
			{
				window.location.href="#!/events"
			}
		});
	}

}]);