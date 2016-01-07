/**
 * Created by kellygarskemoore on 12/10/15.
 */

myApp.controller('TimeCtrl', ["$scope", "$timeout", "$location", function($scope, $timeout,$location,TimeOut) {

    //Page will timeout back to default page based of config settings


    //make call to factory to get shared data - here we are getting room name
    $scope.room = localStorage.selectRoomName;


    //console.log("Shared room data: ", $scope.room);

    /////////////////////////////
    $scope.bookingMember = "The Grinch";
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms

    var tick = function() {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);

    }]);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Controller for the CALENDAR & RESERVE-BOOK-SCREEN////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////

    myApp.controller('CalendarCtrl', ['$scope','$timeout', '$location', 'SharedBookedNameData','SharedTimeData','TimeOut', function($scope, $timeout, $location, SharedBookedNameData, SharedTimeData,TimeOut ){


    // Start Timeout which send view back to default view
    TimeOut.endTimer();
     TimeOut.startTimerCalendar();
        //console.log("what is timeout.endtimer",TimeOut);

    $scope.sharedBookedNameData = SharedBookedNameData;

    //$scope.booking = [];
    //pull data from factory
    if($scope.sharedBookedNameData.setCalendarData() === undefined){
        //console.log("first set is undefined (in controller).");
        $scope.sharedBookedNameData.retrieveBambooData()
            .then(function() {
                //console.log("In then in controller");
                $scope.booking = $scope.sharedBookedNameData.setCalendarData();
            });
    } else {
        //console.log("In else on controller");
        $scope.booking = $scope.sharedBookedNameData.setCalendarData();
        console.log("response back (in else controller): ", $scope.booking);
    }

    $scope.timeArray = $scope.sharedBookedNameData.setTime();

                //console.log("response back (in then controller): ", $scope.booking);
                //set variables to hold data in arrays
                $scope.bookedColor = false;

                var dateStartString = [];
                var timeStringArray = [];
                var endTimeStringArray = [];
                var dateEndString = [];
                var bookedName = [];

                //console.log("In .then, here is bamboodata: ", $scope.timeArray);
                //if there are NO meetings, then nothing has to happen//////
                if($scope.booking.length === 0){
                    console.log("in first if where length is zero");
                    return;
                } else {
                //console.log("length of $scope.booking array: ", $scope.booking.length);
                    //loop over array of booked times to find matching room name
                    for (i = 0; i < $scope.booking.length; i++) {
                        //console.log("Name of room: ", $scope.booking[i].meetingRoom.name);
                        //find room match, then push start times, end times, and name onto arrays
                        if ($scope.booking[i].meetingRoom.name === localStorage.selectRoomName) {
                            //save the names to new array
                            bookedName.push($scope.booking[i].payor.fullName);
                            //pull off the start dates into array
                            dateStartString[i] = $scope.booking[i].startDate;
                            //console.log("StartDate: ", dateStartString[i]);
                            dateEndString[i] = $scope.booking[i].endDate;
                            //console.log("EndDate: ", dateEndString[i]);
                            timeStringArray.push(dateStartString[i].slice(11, 13) + ":" + dateStartString[i].slice(14, 16));
                            endTimeStringArray.push(dateEndString[i].slice(11, 13) + ":" + dateEndString[i].slice(14, 16));
                            var findBookedTime = new Date();
                            var findEndBookedTime = new Date();
                            var meetingTime = [];
                            var endMeetingTime = [];
                            //console.log("timeString: ", timeStringArray + ", endString: " + endTimeStringArray);
                            //convert times in arrays to milliseconds for comparison

                        }
                    }
                            console.log("timeStringArray.length: ", timeStringArray.length);
                            for(q=0; q<timeStringArray.length; q++) {

                                findBookedTime.setHours(parseInt(timeStringArray[q].slice(0, 2)), parseInt(timeStringArray[q].slice(3, 5)));
                                console.log("q: ", q + "findBookedTime: ", findBookedTime);
                                meetingTime[q] = Date.parse(findBookedTime);
                                console.log("Meeting time in milliseconds: ", meetingTime[q]);

                                findEndBookedTime.setHours(parseInt(endTimeStringArray[q].slice(0, 2)), parseInt(endTimeStringArray[q].slice(3, 5)));
                                console.log(findEndBookedTime);
                                endMeetingTime[q] = Date.parse(findEndBookedTime);
                                //console.log("End Meeting time in milliseconds: ", endMeetingTime[q]);
                            }



                            //console.log("Full name array: ", bookedName);
                            //add those arrays to scope

                            $scope.timeStringArray = timeStringArray;
                            $scope.endTimeStringArray = endTimeStringArray;
                            $scope.nameInRoom = bookedName;

                            //as ng-repeat in calendarview.html is building calendar,
                            //loops over timeArray and timeStringArray to find matched hours
                            //for booked meeting times, if matched, styles the block red,
                            //and continues to shade red until end time is reached

                            console.log("timestringarray: ", $scope.timeStringArray);
                            console.log("endtimestringarray: ", endTimeStringArray);
                            console.log("timearray: ", $scope.timeArray);
                            for(k=0; k<$scope.timeStringArray.length; k++) {
                                for(j=0; j<$scope.timeArray.length; j++){

                                        if($scope.timeStringArray[k] === $scope.timeArray[j].milTime) {
                                            //console.log("Found match: ", $scope.timeStringArray[k] + ", " + $scope.timeArray[j].milTime);

                                            //$scope.timeArray[j].isBooked = true;
                                            var d = 0;
                                            //console.log("end is: " + endMeetingTime[k]);
                                            while(j + d < $scope.timeArray.length && endMeetingTime[k] > $scope.timeArray[j+d].milsec){
                                                //console.log("booked time is " + $scope.timeArray[j+d].milsec);
                                                $scope.timeArray[j+d].isBooked = true;
                                                //console.log($scope.timeArray);
                                                d++;
                                            }

                                            //console.log("match true? ", $scope.timeArray[j].isBooked);
                                            $scope.whoInRoom = $scope.nameInRoom[k];
                                        }
                                        //else {
                                        //$scope.timeArray.isBooked = true;

                                        //    $scope.timeArray[j].isBooked = false;
                                        //}
                                    }
                                }

                        }
    //        });
    //} else {
    //    //console.log("In else on controller");
    //    $scope.booking = $scope.sharedBookedNameData.setCalendarData();
    //    console.log("response back (in else controller): ", $scope.booking);
    //}


    //function to see if timeblock on ng-repeat should be shaded like past time, passes in timeblock
    $scope.pastTime = "";
    $scope.checkPastTime = function(hour){
        //console.log("Hour (in checkPastTime: ", hour);
        var dateNow = new Date();       //gets current date and time
        //console.log("DateNow: " + dateNow);
        $scope.rightNowHour = dateNow.getHours();      //pulls the hours off of the current date and time
        $scope.rightNowMinutes = dateNow.getMinutes();
        $scope.rightNowTime = $scope.rightNowHour.toString() + ":" + $scope.rightNowMinutes.toString();
        //console.log("rightNowTime: ", $scope.rightNowTime);
        $scope.pastTime = new Date();
        $scope.pastTime.setHours(parseInt($scope.rightNowHour), parseInt($scope.rightNowMinutes));
        //console.log("pastTime: ", $scope.pastTime);
        $scope.calendarTime = new Date();
        $scope.calendarTime.setHours(parseInt(hour.slice(0,2)), parseInt(hour.slice(3,5)));
        //console.log("calendarTime: ", $scope.calendarTime);
        //console.log("Rightnow hour: ", $scope.rightNowHour + " Rightnow Minutes: ", $scope.rightNowMinutes.toString());
        //console.log("pastTime: ", $scope.pastTime);
        //if statement compares current hour to past hours, called from ng-repeat

        //console.log("$scope.pastTime: " + Date.parse($scope.pastTime) + ", hour: ", Date.parse(hour));
        //console.log("pastTime: ", Date.parse($scope.pastTime) + "calendarTime: ", Date.parse($scope.calendarTime));
        if(Date.parse($scope.pastTime) > Date.parse($scope.calendarTime)){
                //console.log("$scope.pastTime: " + Date.parse('01/01/16' + $scope.pastTime) + ", hour: ", Date.parse('01/01/16' + $scope.calendarTime));
                //console.log("returning true");
                return true;
            }
        //console.log("false hour: ", hour);
            return false;
        };

        //When page is active cancel timeout and reset it
        //Page will timeout back to default page based of config settings
        $scope.inactiveMouseTimeOut = function(){
            TimeOut.endTimer();
            TimeOut.startTimerCalendar();
            console.log("Hey the mouse is moving");
        };

        $scope.inactiveTouchTimeOut = function(){
            TimeOut.endTimer();
            TimeOut.startTimerCalendar();
            console.log("Hey clicking is happening");
        };

        //    startTimer= $timeout(function (){$location.path("/defaultscreen");}, 4000);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////RESERVEBOOK SCREEN/
    ////SharedTimeData is a factory that holds start time selected with ng-click by the user on the calendar view
    //
    $scope.sharedTimeData = SharedTimeData;
    //
    $scope.tapToBook=function(hour){

        $scope.sharedTimeData.setTimeData(hour, $scope.timeArray, $scope.booking[0].meetingRoom.maxOccupancy);

        $location.path("/reserveBookScreen");
    };

}]);


//Controller for RESERVATION view page///////////////////////////////////////////////
//myApp.controller('ReserveCtrl', ["$scope", "$location", function($scope, $location){
//
//    //change out to data from Bamboo
//    $scope.available = 10;
//    $scope.thisMeeting = 2;
//    $scope.balance = $scope.available - $scope.thisMeeting;
//    var chargeByHour = 25;
//    $scope.paymentDue = chargeByHour * $scope.thisMeeting;
//
//    $scope.nevermind = function(){
//        $location.path("/defaultscreen");
//    };
//    $scope.goback = function(){
//        $location.path("/bookingscreen");
//    }
//}]);
