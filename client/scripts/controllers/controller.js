/**
 * Created by kellygarskemoore on 12/10/15.
 */
myApp.controller('TimeCtrl', ["$scope", "$timeout", function($scope, $timeout) {
    var d = new Date();
    $scope.dateNow = d.toDateString();
    $scope.timeNow = d.toLocaleTimeString();

    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms

    var tick = function() {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);








    }]);