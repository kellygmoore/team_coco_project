console.log("hello");

var myApp = angular.module("myApp", ['ngRoute', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngMdIcons']);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/defaultscreen',{
            templateUrl: "assets/views/routes/defaultscreen.html"
        }).
        when('/calendarview', {
            templateUrl: "assets/views/routes/calendarview.html",
            //controller: "TimeCtrl"
        }).
        when('/configview', {
            templateUrl: "assets/views/routes/configview.html",
            controller: "ConfigController"
        }).
        when('/bookingscreen', {
            templateUrl: "assets/views/routes/bookingscreen.html",
            controller: "AppCtrl"
        }).
        otherwise({
            redirectTo: 'defaultscreen'
        })
}]);



