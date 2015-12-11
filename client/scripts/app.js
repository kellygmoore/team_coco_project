console.log("hello");

var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/defaultscreen',{
            templateUrl: "assets/views/routes/defaultscreen.html"
        }).
        when('/calendarview', {
            templateUrl: "assets/views/routes/calendarview.html",
            //controller: "TimeCtrl"
        }).
        otherwise({
            redirectTo: 'defaultscreen'
        })
}]);



