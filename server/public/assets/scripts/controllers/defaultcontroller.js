/**
 * Created by samuelmoss on 12/17/15.
 */
//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", "SharedRoomData", "SharedBookedNameData", "$timeout", "$interval",function($scope, $location, SharedRoomData, SharedBookedNameData, $timeout, $interval){
//change out to data from Bamboo

    //console.log("default controller works");
    $scope.roomName = undefined;
    $scope.timeLeftHr = 1;
    $scope.timeLeftMin = 36;
    $scope.nextMtgAt = "No Scheduled Meetings";      //string or number?
    $scope.roomBooked = undefined;
    $scope.roomData = SharedRoomData;
    $scope.bookingData = SharedBookedNameData;
    $scope.meetingTimesArray = [];
    $scope.bootTime = Date.now();
    $scope.meetingTimeout = undefined;
    $scope.interMeetingTimeout = undefined;
    $scope.stop = undefined;


    //Conditional to check and see if room data had been pulled into the roomData Factory.
    //If not it calls a method in the factory which hits the API and gets all the
    //information for the room.
    if($scope.roomData.retrieveRoomData() === undefined){
        $scope.roomData.setRoomData();
        $scope.roomData.retrieveRoomData();
    }

    $scope.roomName = $scope.roomData.name;

    //Conditional to check and see if the booking data for the room has populated.
    //If not it calls as method in the bookingData factory to hit the API and pulls down
    //all the data for the meeting for the day.
    if($scope.bookingData.setBambooData() === undefined) {
        $scope.bookingData.retrieveBambooData()
                .then(function(){
                    $scope.bookedData = $scope.bookingData.setBambooData();
                    //console.log("promise meeting data: ", $scope.bookedData);
                $scope.updateMeetingTimesArray();
                //console.log("Meeting times array: ", $scope.meetingTimesArray);
                $scope.meetingTimeSwitch();
                });
    } else {
        $scope.bookedData = $scope.bookingData.setBambooData();
        //console.log("promise meeting data: ", $scope.bookedData);
        $scope.updateMeetingTimesArray();
        //console.log("Meeting times array: ", $scope.meetingTimesArray);
        $scope.meetingTimeSwitch();
    }

    //Function which searches through all the meeting for the locations,
    //pulls out all those which are for the room the tablet has been configured to,
    //Then formats them as numbers and pushed them to the meetingTimesArray for later use.
    $scope.updateMeetingTimesArray = function(){
        $scope.bookedData.map(
            function(obj) {
                if(obj.meetingRoom.id === 2/*$scope.roomData.id*/){
                    $scope.meetTimeObj = {};
                    $scope.meetTimeObj.start = {};
                    $scope.meetTimeObj.end = {};
                    var startTime = new Date(obj.startDate);
                    var endTime = new Date(obj.endDate);
                    //meetTimeObj.startTime = {};
                    //meetTimeObj.endTime = {};
                    $scope.meetTimeObj.startTime = startTime.getTime();
                    $scope.meetTimeObj.endTime = endTime.getTime();
                    $scope.meetTimeObj.elapse = $scope.meetTimeObj.endTime - $scope.meetTimeObj.startTime;
                    $scope.meetTimeObj.start.hour = parseInt(obj.startDate.slice(11, 13));
                    $scope.meetTimeObj.start.minute = parseInt(obj.startDate.slice(14, 16));
                    $scope.meetTimeObj.end.hour = parseInt(obj.endDate.slice(11, 13));
                    $scope.meetTimeObj.end.minute = parseInt(obj.endDate.slice(14, 16));
                    $scope.meetingTimesArray.unshift($scope.meetTimeObj);
                    console.log("meeting times array is reached");
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
        while($scope.bootTime > $scope.meetingTimesArray[0].endTime){
            $scope.meetingTimesArray.shift();
        }
        console.log("Boot time: ", $scope.bootTime);
        console.log("Next start time: ", $scope.meetingTimesArray[0].startTime);

        if ($scope.bootTime > $scope.meetingTimesArray[0].startTime){
            console.log("The if at switch is hit");
            $scope.activeMeetingLogic();
        } else {
            console.log("The else at switch is hit");
            $scope.inActiveMeetingLogic();
        }
    };

    $scope.activeMeetingLogic = function(){
        var currentTime = Date.now();
        //console.log("active was reached");
        //console.log("Here is the meeting array: ", $scope.meetingTimesArray);
        $scope.roomBooked = true;
        //console.log("Is the room booked?",$scope.roomBooked);
        $scope.updateTime = function(){
            currentTime = new Date();
            $scope.timeLeftHr = (($scope.meetingTimesArray[0].end.hour - currentTime.getHours()));
            $scope.timeLeftMin = ($scope.meetingTimesArray[0].end.minute - currentTime.getMinutes());
            if($scope.timeLeftMin < 0){
                $scope.timeLeftMin+=60
            }
        };
        $scope.updateTime();
        $scope.stop = $interval($scope.updateTime(), 60000);
        $scope.meetingTimeout = $timeout(
            $scope.inActiveMeetingLogic, ($scope.meetingTimesArray[0].endTime - currentTime)
        )
    };

    $scope.inActiveMeetingLogic = function(){
        //console.log("Here is the meeting array: ", $scope.meetingTimesArray);
        //console.log("inactive was reached");
        $interval.cancel($scope.stop);
        $scope.currentTime = Date.now();
        $scope.roomBooked = false;
        $scope.nextMtgAt = "" + ($scope.meetingTimesArray[0].start.hour)%12 + ":" + $scope.meetingTimesArray[0].start.minute +"";
        $scope.meetingTimeout = $timeout(
            $scope.inActiveMeetingLogic, ($scope.meetingTimesArray[0].startTime - $scope.currentTime)
        )
    };

    $scope.adjustTimeLength = function(){
        $scope.rawTime = "" + $scope.meetingTimesArray[0].end.minute + "";
        if($scope.rawTime.length < 2){
            $scope.rawTime = "0" + $scope.rawTime;
        }
        return $scope.rawTime;
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