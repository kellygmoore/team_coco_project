console.log("hello");

var myApp = angular.module("myApp", ['ngRoute', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngMdIcons']);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/defaultscreen',{
            templateUrl: "assets/views/routes/defaultscreen.html",
            controller: "DefaultCtrl"
        }).
        when('/calendarview/', {
            templateUrl: "assets/views/routes/calendarview.html"
        }).
        when('/configview', {
            templateUrl: "assets/views/routes/configview.html",
            controller: "ConfigController"
        }).
        when('/bookingscreen', {
            templateUrl: "assets/views/routes/bookingscreen.html",
            controller: 'AppCtrl'
        }).
        when('/reservationview', {
            templateUrl: "assets/views/routes/reservationview.html"
            //controller: "ReserveCtrl"
        }).
        when('/reserveBookScreen', {
            templateUrl: "assets/views/routes/reserveBookScreen.html"
        }).
        otherwise({
            redirectTo: 'defaultscreen'
        })
}]);



