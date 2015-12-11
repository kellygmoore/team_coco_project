/**
 * Created by kellygarskemoore on 12/10/15.
 */
//Controller for the THETOP header clock/////////////////////////////////////////
myApp.controller('TimeCtrl', ["$scope", "$timeout", function($scope, $timeout) {

    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms

    var tick = function() {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);

    }]);

//Controller for the CALENDAR ////////////////////////////////////////////////////////
myApp.controller('CalendarCtrl', ["$scope", "$location", function($scope, $location){
    $scope.bambooDataArray = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];





}]);