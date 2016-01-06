/**
 * Created by Zeo on 1/5/16.
 */
myApp.factory('TimeOut', ["$timeout", "$location", function ($timeout, $location) {

    var _timer;

    console.log("hello I'm timeout factory");

    //sets for a timeout on the page
    this.startTimerCalendar = function () {
        _timer = $timeout(function () {
            $location.path("/defaultscreen");
        },  localStorage.calendarTimeout);
        return _timer;
    };


    //ends the timer
    this.endTimer = function(){
        $timeout.cancel(_timer);
    };


    return this;

}]);