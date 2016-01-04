/**
 * Created by samuelmoss on 12/17/15.
 */

//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", "SharedRoomData", "SharedBookedNameData", "$timeout", "$interval", "dateFilter", function($scope, $location, SharedRoomData, SharedBookedNameData, $timeout, $interval, dateFilter){
//change out to data from Bamboo

    //console.log("name of room", localStorage.selectRoomName);
    $scope.roomName =localStorage.selectRoomName;
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
    //if($scope.roomData.retrieveRoomData() === undefined){
    //    $scope.roomData.setRoomData();
    //    $scope.roomData.retrieveRoomData();
    //}




    //This function updates the meeting time factory with the
    //meeting times from the Bamboo meeting API then continues on to
    //the meeting time switch. This function is called at the end
    //of every meeting and before every meeting.
    $scope.updateMeetingTimeData = function(){
        $scope.bookingData.retrieveBambooData()
        .then(function(){
            $scope.meetingTimesArray = SharedBookedNameData.setBambooData();
            $scope.meetingTimeSwitch();
                console.log("Here is the booked data: ", $scope.bookedData);
            }
        );
    };


    //Starts the script.
    $scope.updateMeetingTimeData();



    ////This function searches through all the meeting for the locations, feature_default_screen_logic
    ////pulls out all those which are for the room the tablet has been configured to,
    ////Then formats them as numbers and pushes them to the meetingTimesArray for later use.
    //$scope.updateMeetingTimesArray = function(){
    //    $scope.meetingTimesArray = [];
    //    $scope.bookedData.map(
    //        function(obj) {
    //            if(obj.meetingRoom.id === parseInt(localStorage.selectRoomId)){
    //                $scope.meetTimeObj = {};
    //                $scope.meetTimeObj.start = {};
    //                $scope.meetTimeObj.end = {};
    //                var startTime = new Date(obj.startDate);
    //                var endTime = new Date(obj.endDate);
    //                $scope.meetTimeObj.startTime = startTime.getTime();
    //                $scope.meetTimeObj.endTime = endTime.getTime();
    //                $scope.meetTimeObj.elapse = $scope.meetTimeObj.endTime - $scope.meetTimeObj.startTime;
    //                $scope.meetTimeObj.start.hour = parseInt(obj.startDate.slice(11, 13));
    //                $scope.meetTimeObj.start.minute = parseInt(obj.startDate.slice(14, 16));
    //                $scope.meetTimeObj.end.hour = parseInt(obj.endDate.slice(11, 13));
    //                $scope.meetTimeObj.end.minute = parseInt(obj.endDate.slice(14, 16));
    //                $scope.meetingTimesArray.unshift($scope.meetTimeObj);
    //            }
    //        }
    //    );
    //};

    //This function pulls in the current time, checks to see whether it is ahead of any meetings
    //for the day, adjusts the meeting array accordingly then checks to see if
    //there is an active meeting currently going on. If there is a meeting in session then
    //the function switches to the active meeting mode/function otherwise it switches to the inactive mode/function.
    //This allows the script to be booted at any time and immediately update.
    $scope.meetingTimeSwitch = function(){
        if(stop){
            $timeout.cancel(stop);
        }
        if(meetingTimeout){
            $interval.cancel(meetingTimeout);
        }
        currentTime = Date.now();
        //console.log("Meeting times array: ", $scope.meetingTimesArray);
        if($scope.meetingTimesArray[0]){
            while(currentTime > $scope.meetingTimesArray[0].endTime){
            $scope.meetingTimesArray.shift();
            }
        }
        if (currentTime > $scope.meetingTimesArray[0].startTime){
            $scope.activeMeetingLogic();
        } else {
            $scope.inActiveMeetingLogic();
        }
    };

    //This function runs when the current time is greater than the next meeting start time
    //and less than the next meeting end time (i.e. there is a meeting currently going on.
    //It makes the page red, calculates and displays the time until the meeting is over.
    //It also sets a timeout which calculates the time left untill the meeting is over
    // and runs the updateMeetingTimeData function.
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
            $scope.updateMeetingTimeData, $scope.meetingLength());
    };

    //This function runs when there is no active meeting (i.e. the current time is less than the
    //next meeting's start time). This changes the page to a green color and sets a timeout to the differance
    //between the current time and the next meeting start time.
    $scope.inActiveMeetingLogic = function(){
        currentTime = Date.now();
        $scope.roomBooked = false;
        $scope.nextMtgAt = $scope.meetingTimesArray[0]?$scope.timeFormat($scope.meetingTimesArray[0].start):"No Upcoming Meetings";
        $scope.meetingTimeout = $timeout(
            $scope.updateMeetingTimeData, ($scope.meetingTimesArray[0].startTime - currentTime)
        )
    };

    //This series of functions formats the next meeting time.
    $scope.timeFormat = function(timeObject){
      return "" + $scope.hourFormat(timeObject.hour) + ":" + $scope.minuteFormat(timeObject.minute) + ""
    };

    //Formats the hour from military time to standard time.
    $scope.hourFormat = function(nextMeetingHour){
      if(nextMeetingHour > 12){
          return (nextMeetingHour - 12);
      } else {
          return nextMeetingHour;
      }
    };

    //Formats single digit minutes (i.e. '6') to prexif with 0 (i.e. '06')
    $scope.minuteFormat = function(nextMeetingMinute){
        stringyNextMeetingMinute = "" + nextMeetingMinute + "";
        if(stringyNextMeetingMinute.length < 2){
            return "0" + stringyNextMeetingMinute;
        } else {
            return stringyNextMeetingMinute;
        }
    };

    //Routes to the calendar view.
    $scope.gotoCalendar = function(){
        $location.path('/calendarview');
    };

}]);