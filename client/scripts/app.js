console.log("hello");

var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/defaultscreen',{
            templateUrl: "assets/views/routes/defaultscreen.html",
            controller:"DefaultController"
        }).
        when('/calendarview', {
            templateUrl: "assets/views/routes/calendarview.html",
            //controller: "TimeCtrl"
        }).
        when('/configview', {
            templateUrl: "assets/views/routes/configview.html",
            controller: "ConfigController"
        }).
        otherwise({
            redirectTo: 'defaultscreen'
        })
}]);



