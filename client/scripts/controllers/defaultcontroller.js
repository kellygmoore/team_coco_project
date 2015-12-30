/**
 * Created by samuelmoss on 12/17/15.
 */
//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", "SharedRoomData", "SharedBookedNameData", "$timeout", "$interval", "dateFilter", function($scope, $location, SharedRoomData, SharedBookedNameData, $timeout, $interval, dateFilter){
//change out to data from Bamboo

    //console.log("default controller works");
    $scope.roomName = undefined;
    $scope.timeLeftHr = undefined;
    $scope.timeLeftMin = undefined;
    $scope.nextMtgAt = "No Upcoming Meetings";
    $scope.roomBooked = undefined;
    $scope.roomData = SharedRoomData;
    $scope.bookingData = SharedBookedNameData;
    $scope.meetingTimesArray = [];
    $scope.bootTime = Date.now();
    $scope.meetingTimeout = undefined;
    $scope.interMeetingTimeout = undefined;
    var stop, meetingTimeout;
    var currentTime = undefined;



    //Conditional to check and see if room data had been pulled into the roomData Factory.
    //If not it calls a method in the factory which hits the API and gets all the
    //information for the room.
    if($scope.roomData.retrieveRoomData() === undefined){
        $scope.roomData.setRoomData();
        $scope.roomData.retrieveRoomData();
    }

    $scope.roomName = $scope.roomData.name;

    //Conditional to check and see if the booking data for the room has populated.
    //If not it calls a method in the bookingData factory to hit the API and pulls down
    //all the data for the meetings for the day.
    if($scope.bookingData.setBambooData() === undefined) {
        $scope.bookingData.retrieveBambooData()
                .then(function(){
                    $scope.bookedData = $scope.bookingData.setBambooData();
                $scope.updateMeetingTimesArray();
                $scope.meetingTimeSwitch();
                });
    } else {
        $scope.bookedData = $scope.bookingData.setBambooData();
        $scope.updateMeetingTimesArray();
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
                    $scope.meetTimeObj.startTime = startTime.getTime();
                    $scope.meetTimeObj.endTime = endTime.getTime();
                    $scope.meetTimeObj.elapse = $scope.meetTimeObj.endTime - $scope.meetTimeObj.startTime;
                    $scope.meetTimeObj.start.hour = parseInt(obj.startDate.slice(11, 13));
                    $scope.meetTimeObj.start.minute = parseInt(obj.startDate.slice(14, 16));
                    $scope.meetTimeObj.end.hour = parseInt(obj.endDate.slice(11, 13));
                    $scope.meetTimeObj.end.minute = parseInt(obj.endDate.slice(14, 16));
                    $scope.meetingTimesArray.unshift($scope.meetTimeObj);
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
        if(stop){
            $timeout.cancel(stop);
        }
        if(meetingTimeout){
            $interval.cancel(meetingTimeout);
        }
        currentTime = Date.now();
        console.log("Meeting times array: ", $scope.meetingTimesArray);
        while(currentTime > $scope.meetingTimesArray[0].endTime){
            $scope.meetingTimesArray.shift();
        }
        if (currentTime > $scope.meetingTimesArray[0].startTime){
            $scope.activeMeetingLogic();
        } else {
            $scope.inActiveMeetingLogic();
        }
    };

    $scope.activeMeetingLogic = function(){
        $scope.roomBooked = true;
        $scope.meetingLength = function(){
            return $scope.meetingTimesArray[0].endTime - currentTime;
        };
        $scope.updateTime = function(){
            currentTime = Date.now();
            $scope.timeLeftHr = ($scope.meetingTimesArray[0].end.hour - dateFilter(currentTime, 'HH') - 1);
            $scope.timeLeftMin = ($scope.meetingTimesArray[0].end.minute - dateFilter(currentTime, 'mm'));
            if($scope.timeLeftMin < 0){
                $scope.timeLeftMin+=60
            }
        };
        $scope.updateTime();
        stop = $interval($scope.updateTime, 60000);
        meetingTimeout = $timeout(
            $scope.meetingTimeSwitch, $scope.meetingLength());
    };

    $scope.inActiveMeetingLogic = function(){
        currentTime = Date.now();
        $scope.roomBooked = false;
        $scope.nextMtgAt = $scope.meetingTimesArray[0]?$scope.timeFormat($scope.meetingTimesArray[0].start):"No Upcoming Meetings";
        $scope.meetingTimeout = $timeout(
            $scope.meetingTimeSwitch, ($scope.meetingTimesArray[0].startTime - currentTime)
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

    //This series of functions formats the next meeting time from military time to standard.
    $scope.timeFormat = function(timeObject){
      return "" + $scope.hourFormat(timeObject.hour) + ":" + $scope.minuteFormat(timeObject.minute) + ""
    };

    $scope.hourFormat = function(nextMeetingHour){
      if(nextMeetingHour > 12){
          return (nextMeetingHour - 12);
      } else {
          return nextMeetingHour;
      }
    };

    $scope.minuteFormat = function(nextMeetingMinute){
        stringyNextMeetingMinute = "" + nextMeetingMinute + "";
        if(stringyNextMeetingMinute.length < 2){
            return "0" + stringyNextMeetingMinute;
        } else {
            return stringyNextMeetingMinute;
        }
    };

    $scope.gotoCalendar = function(){
        $location.path('/calendarview');
    };

}]);