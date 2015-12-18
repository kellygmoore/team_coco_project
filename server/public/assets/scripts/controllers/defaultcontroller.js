/**
 * Created by samuelmoss on 12/17/15.
 */
//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", "SharedRoomData", "SharedBookedNameData", "$timeout", function($scope, $location, SharedRoomData, SharedBookedNameData, $timeout){
//change out to data from Bamboo

    //console.log("default controller works");
    $scope.roomName = undefined;
    $scope.timeLeftHr = 1;
    $scope.timeLeftMin = 36;
    $scope.nextMtgAt = "No Scheduled Meetings";      //string or number?
    $scope.roomBooked = true;
    $scope.roomData = SharedRoomData;
    $scope.bookingData = SharedBookedNameData;
    $scope.meetingTimesArray = [];
    $scope.bootTime = Date.now();
    $scope.meetingTimeout = undefined;
    $scope.interMeetingTimeout = undefined;


    //Conditional to check and see if room data had been pulled into the roomData Factory.
    //If not it calls a method in the factory which hits the API and gets all the
    //information for the room
    if($scope.roomData === undefined){
        $scope.roomData.setRoomData();
        $scope.roomData = $scope.roomData.retrieveRoomData();
    }

    $scope.roomName = $scope.roomData.name;

    //Conditional to check and see if the booking data for the room has populated.
    //If not it calls as method in the bookingData factory to hit the API and pulls down
    //all the data for the meeting for the day.
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

    //Function which searches through all the meeting for the locations,
    //pulls out all those which are for the room the tablet has been configured to,
    //Then formats them as numbers and pushed them to the meetingTimesArray for later use.
    $scope.updateMeetingTimesArray = function(){
        $scope.bookedData.map(
            function(obj) {
                if(obj.meetingRoom.id === 2/*$scope.roomData.id*/){
                    var meetTimeObj = {};
                    meetTimeObj.start = {};
                    meetTimeObj.end = {};
                    var startTime = new Date(obj.startDate);
                    var endTime = new Date(obj.endDate);
                    //meetTimeObj.startTime = {};
                    //meetTimeObj.endTime = {};
                    meetTimeObj.startTime = startTime.getTime();
                    meetTimeObj.endTime = endTime.getTime();
                    meetTimeObj.length = meetTimeObj.endTime - meetTimeObj.startTime;
                    meetTimeObj.start.hour = parseInt(obj.startDate.slice(11, 13));
                    meetTimeObj.start.minute = parseInt(obj.startDate.slice(14, 16));
                    meetTimeObj.end.hour = parseInt(obj.endDate.slice(11, 13));
                    meetTimeObj.end.minute = parseInt(obj.endDate.slice(14, 16));
                    $scope.meetingTimesArray.push(meetTimeObj);
                }
            }
        );
    };

    //This function pulls in the time when the script load, checks to see whether it is ahead of any meetings
    //for the day,adjusts the meeting array accordingly then checks to see if
    //there is an active meeting currently going on. If there is a meeting in session then
    //it sets itself to the active meeting mode,
    //otherwise it sets itself to inactive mode.
    //This allows the script to be booted at any time and immediately update.
    $scope.meetingTimeSwitch = function(){
        while($scope.bootTime > $scope.meetTimeObj[0].endTime){
            $scope.meetTimeObj.shift();
        }
        if (($scope.bootTime > $scope.meetTimeObj[0].startTime) || ($scope.bootTime = $scope.meetTimeObj[0].startTime)){
            $scope.activeMeetingLogic();
        } else {
            $scope.inActiveMeetingLogic();
        }
    };

    $scope.activeMeetingLogic = function(){
        roombooked = true;
        $scope.timeLeftHr= undefined;
        $scope.timeLeftMin= undefined;
        $scope.meetingTimeout = $timeout(
            $scope.inActiveMeetingLogic, ($scope.meetTimeObj[0].endTime - $scope.meetTimeObj[0].startTime)
        )
    };

    $scope.inActiveMeetingLogic = function(){
        $scope.currentTime = new Date.now();
        roombooked = false;
        $scope.nextMtgAt = ""+$scope.meetTimeObj[0].end.hour+":"+$scope.meetTimeObj[0].end.minute+"";
        $scope.meetingTimeout = $timeout(
            $scope.inActiveMeetingLogic, ($scope.meetTimeObj[0].startTime - $scope.currentTime)
        )
    };

    //$scope.timeCheck = $scope.compareTime(Date.prototype.getHours(), Date.prototype.getMinutes())) ? $scope.roomBooked = true : $scope.roomBooked = false;


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

    //$scope.meetingTimeCalc = function(){
    //
    //};
    //if statement goes here to check if room is currently booked, then set roomBooked to true

    $scope.gotoCalendar = function(){
        $location.path('/calendarview');
    };

}]);