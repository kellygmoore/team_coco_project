/**
 * Created by Zeo on 1/5/16.
 */
myApp.controller('TimeCtrl', ["$scope", "$timeout", "$location", 'dateFilter','SharedRoomData', 'SharedTimeData', function($scope, $timeout,$location, dateFilter, SharedRoomData, SharedTimeData) {

    //make call to factory to get shared data - here we are getting room name

    $scope.room = localStorage.selectRoomName;

    /////////////////////////////
    $scope.sharedTimeData = SharedTimeData;
    $scope.bookingMember = "The Grinch";
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms
    $scope.startTime = undefined;
    $scope.endTime = undefined;
    $scope.meetingTimesObject = $scope.sharedTimeData.retrieveConfirmedMeetingTimes();


    var tick = function() {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    $scope.convertTimes = function(){
      var format = 'h:mm';
        console.log("here is the meeting times object: ", $scope.meetingTimesObject);
        $scope.startTime = dateFilter($scope.meetingTimesObject.startTime,format);
        $scope.endTime = dateFilter($scope.meetingTimesObject.endTime,format);
    };

    $scope.convertTimes();
    console.log("here is the meeting times object: ", $scope.meetingTimesObject);

    // Start the timer
    $timeout(tick, $scope.tickInterval);

}]);