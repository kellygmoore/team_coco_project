console.log("hello");

var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/defaultscreen',{
            templateUrl: "assets/views/routes/defaultscreen.html"
        }).
        when('/calendarview', {
            templateUrl: "assets/views/routes/calendarview.html"
        }).
        when('/configview', {
            templateUrl: "assets/views/routes/configview.html",
            controller: "ConfigController"
        }).
        when('/reservationview', {
            templateUrl: "assets/views/routes/reservationview.html"
            //controller: "ReserveCtrl"
        }).
        otherwise({
            redirectTo: 'defaultscreen'
        })
}]);



