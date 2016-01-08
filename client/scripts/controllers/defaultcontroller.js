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
    $scope.hasMeeting = false;
    var stop, meetingTimeout;
    var currentTime = undefined;




    //This function updates the meeting time factory with the
    //meeting times from the Bamboo meeting API then continues on to
    //the meeting time switch. This function is called at the end
    //of every meeting and before every meeting.
    $scope.updateMeetingTimeData = function(){
        $scope.bookingData.retrieveBambooData()
        .then(function(){
            $scope.meetingTimesArray = SharedBookedNameData.setBambooData();
                //console.log("Meetingtimesarray: ", $scope.meetingTimesArray[0]);
                if($scope.meetingTimesArray[0] === undefined){
                    $scope.hasMeetings = true;
                } else {
                    $scope.meetingTimeSwitch();
                    console.log("Here is the booked data: ", $scope.bookedData);
                }
            }
        );
    };


    //Starts the script.
    $scope.updateMeetingTimeData();



    //This function pulls in the current time, checks to see whether it is ahead of any meetings
    //for the day, adjusts the meeting array to remove any past meetings then checks to see if
    //there is an active meeting currently going on. If there is a meeting in session then
    //the function switches to the active meeting mode/function otherwise it switches to the inactive mode/function.
    //If there are not scheduled meeting in the future it goes to the 'no scheduled meeting' mode/function.
    //This allows the script to be booted at any time and immediately update.
    $scope.meetingTimeSwitch = function() {
        if (stop) {
            $timeout.cancel(stop);
        }
        if (meetingTimeout) {
            $interval.cancel(meetingTimeout);
        }
        currentTime = Date.now();
        if($scope.meetingTimesArray.length > 0) {
            while (currentTime > $scope.meetingTimesArray[0].endTime) {
                $scope.meetingTimesArray.shift();
                if($scope.meetingTimesArray.length === 0){
                    $scope.noScheduledMeetinglogic();
                }
            }
            if(currentTime > $scope.meetingTimesArray[0].startTime){
                $scope.activeMeetingLogic();
            } else {
                $scope.inActiveMeetingLogic();
            }
        } else {
            $scope.noScheduledMeetinglogic();
        }
    };

    //This function runs when the current time is greater than the next meeting start time
    //and less than the next meeting end time (i.e. there is a meeting currently going on.
    //It makes the page red, calculates and displays the time until the meeting is over.
    //It also sets a timeout which calculates the time left until the meeting is over
    // and runs the updateMeetingTimeData function.
    $scope.activeMeetingLogic = function(){
        console.log("in active meeting logic");
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
        stop = $interval($scope.updateTime, 300000);
        meetingTimeout = $timeout(
            $scope.updateMeetingTimeData, $scope.meetingLength());
    };

    //This function runs when there is no active meeting (i.e. the current time is less than the
    //next meeting's start time). This changes the page to a green color and sets a timeout to the differance
    //between the current time and the next meeting start time.
    $scope.inActiveMeetingLogic = function(){
        console.log("in inactive meeting logic");
        currentTime = Date.now();
        $scope.roomBooked = false;
        $scope.nextMtgAt = $scope.meetingTimesArray[0]?$scope.timeFormat($scope.meetingTimesArray[0].start):"No Upcoming Meetings";
        $scope.meetingTimeout = $timeout(
            $scope.updateMeetingTimeData, ($scope.meetingTimesArray[0].startTime - currentTime)
        )
    };

    //This function kicks in if there are no scheduled meetings.
    //It rechecks the API every 5 minutes in case there has been
    //a meeting scheduled outside the app during that time.
    $scope.noScheduledMeetinglogic = function(){
        console.log("in no scheduled");
        var stop = $timeout($scope.updateMeetingTimeData, 60000);
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