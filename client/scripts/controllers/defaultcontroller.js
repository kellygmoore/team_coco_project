/**
 * Created by samuelmoss on 12/17/15.
 */
//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", "SharedRoomData", "SharedBookedNameData", function($scope, $location, SharedRoomData, SharedBookedNameData){
//change out to data from Bamboo

    //console.log("default controller works");

    $scope.roomData = SharedRoomData;

    $scope.bookingData = SharedBookedNameData;

    $scope.meetingTimesArray = [];


    if($scope.roomData === undefined){
        $scope.roomData.setRoomData();
        $scope.roomData = $scope.roomData.retrieveRoomData();
    }

    if($scope.bookingData.setBambooData() === undefined) {
        $scope.bookingData.retrieveBambooData()
                .then(function(){
                    $scope.bookedData = $scope.bookingData.setBambooData();
                    console.log("promise meeting data: ", $scope.bookedData);
                $scope.updateMeetingTimesArray();
                console.log("Meeting times array: ", $scope.meetingTimesArray);
                });
    } else {
        $scope.bookedData = $scope.bookingData.setBambooData();
        console.log("promise meeting data: ", $scope.bookedData);
        $scope.updateMeetingTimesArray();
        console.log("Meeting times array: ", $scope.meetingTimesArray);
    }

    $scope.updateMeetingTimesArray = function(){
        $scope.bookedData.map(
            function(obj) {
                if(obj.meetingRoom.id === 1/*$scope.roomData.id*/){
                    var meetTimeObj = {};
                    meetTimeObj.startTime = obj.startDate.slice(11, 16);
                    meetTimeObj.endTime = obj.endDate.slice(11, 16);
                    $scope.meetingTimesArray.push(meetTimeObj);
                }
            }
        );
    };

    //if($scope.userService.userData() === undefined) {
    //    console.log("getting user list from user service");
    //    $scope.userService.userList()
    //        .then(function() {
    //            $scope.users = $scope.userService.userData();
    //        });
    //} else {
    //    $scope.users = $scope.userService.userData();
    //}


    //console.log("Shared room data: ", $scope.room);

    $scope.roomName = $scope.roomData.name;
    $scope.timeLeftHr = 1;
    $scope.timeLeftMin = 36;
    $scope.nextMtgAt = "3:00";      //string or number?
    $scope.roomBooked = true;


    //$scope.meetingTimeCalc = function(){
    //
    //};
    //if statement goes here to check if room is currently booked, then set roomBooked to true

    $scope.gotoCalendar = function(){
        $location.path('/calendarview');
    };

}]);