/**
 * Created by Zeo on 1/5/16.
 */
myApp.controller('TimeCtrl', ["$scope", "$timeout", "$location", 'dateFilter','SharedRoomData', 'SharedTimeData', function($scope, $timeout,$location, dateFilter, SharedRoomData, SharedTimeData) {



    //$timeout.cancel($rootScope.backToDefault);
    //Page will timeout back to default page based of config settings
    // var timeOut = $timeout(function(){$location.path("/defaultscreen"); },localStorage.boookingTimeout);
    //    timeOut;
    //
    //$timeout.cancel(timeOut);
    //Reset timeout if user has interacted with page
    //inactivityTime();
    //var inactivityTime = function () {
    //    var t;
    //    window.onload = resetTimer;
    //    document.onmousemove = resetTimer;
    //    document.onkeypress = resetTimer;
    //
    //
    //    function resetTimer() {
    //        clearTimeout(t);
    //        t = setTimeout(logout, 3000);
    //        // 1000 milisec = 1 sec
    //    }
    //};




    //make call to factory to get shared data - here we are getting room name

    $scope.room = localStorage.selectRoomName;

    //$scope.sharedRoomData = SharedRoomData;
    //
    //if($scope.sharedRoomData.setRoomData() === undefined){
    //    $scope.sharedRoomData.retrieveRoomData();
    //}
    //
    //$scope.room = $scope.sharedRoomData.retrieveRoomData();

    //console.log("Shared room data: ", $scope.room);

    /////////////////////////////
    $scope.sharedTimeData = SharedTimeData;
    $scope.bookingMember = "The Grinch";
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms
    $scope.startTime;
    $scope.endTime;
    $scope.meetingTimesObject = $scope.sharedTimeData.retrieveConfirmedMeetingTimes;


    var tick = function() {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    $scope.convertTimes = function(){
      var format = 'hh:mm';
        console.log("here is the meeting times object: ", $scope.meetingTimesObject);
        $scope.startTime = dateFilter($scope.meetingTimesObject.startTime,format);
        $scope.endTime = dateFilter($scope.meetingTimesObject.endTime,format);
    };

    $scope.convertTimes();

    // Start the timer
    $timeout(tick, $scope.tickInterval);

}]);