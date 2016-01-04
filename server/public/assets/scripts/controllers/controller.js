/**
 * Created by kellygarskemoore on 12/10/15.
 */
//Controller for the THETOP header clock/////////////////////////////////////////

//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", function($scope, $location){
//change out to data from Bamboo
    $scope.roomName = "The Library";
    $scope.timeLeftHr = 1;
    $scope.timeLeftMin = 36;
    $scope.nextMtgAt = "3:00";      //string or number?
    $scope.roomBooked = true;

    $scope.gotoCalendar = function(){
        $location.path('/calendarview');
    };


    //if statement goes here to check if room is currently booked, then set roomBooked to true

}]);


myApp.controller('TimeCtrl', ["$scope", "$timeout",  'SharedRoomData', function($scope, $timeout, SharedRoomData) {

    //make call to factory to get shared data - here we are getting room name
    $scope.room = [];
    $scope.sharedRoomData = SharedRoomData;

    if($scope.sharedRoomData.setRoomData() === undefined){
        $scope.sharedRoomData.retrieveRoomData();
    }

    $scope.room = $scope.sharedRoomData.retrieveRoomData();

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

//Controller for the CALENDAR ////////////////////////////////////////////////////////
myApp.controller('CalendarCtrl', ["$scope", "$location", 'SharedBookedNameData', function($scope, $location, SharedBookedNameData){
    //$scope.memberInRoom = [];
    $scope.bookedColor = false;
    var todaysDate = new Date();
    //hours that room can be booked 8am - 5pm// needs to be 6pm for certain location
    //use milTime for comparing and logic, use stdTime for display on calendar
    $scope.timeArray = [
        {milTime: "08:00", stdTime: "8:00", milsec: todaysDate.setHours(8)},
        {milTime: "08:15", stdTime: "8:15", milsec: todaysDate.setHours(8, 15)},
        {milTime: "08:30", stdTime: "8:30", milsec: todaysDate.setHours(8, 30)},
        {milTime: "08:45", stdTime: "8:45", milsec: todaysDate.setHours(8, 45)},
        {milTime: "09:00", stdTime: "9:00", milsec: todaysDate.setHours(9)},
        {milTime: "09:15", stdTime: "9:15", milsec: todaysDate.setHours(9, 15)},
        {milTime: "09:30", stdTime: "9:30", milsec: todaysDate.setHours(9, 30)},
        {milTime: "09:45", stdTime: "9:45", milsec: todaysDate.setHours(9, 45)},
        {milTime: "10:00", stdTime: "10:00", milsec: todaysDate.setHours(10)},
        {milTime: "10:15", stdTime: "10:15", milsec: todaysDate.setHours(10, 15)},
        {milTime: "10:30", stdTime: "10:30", milsec: todaysDate.setHours(10, 30)},
        {milTime: "10:45", stdTime: "10:45", milsec: todaysDate.setHours(10, 45)},
        {milTime: "11:00", stdTime: "11:00", milsec: todaysDate.setHours(11)},
        {milTime: "11:15", stdTime: "11:15", milsec: todaysDate.setHours(11, 15)},
        {milTime: "11:30", stdTime: "11:30", milsec: todaysDate.setHours(11, 30)},
        {milTime: "11:45", stdTime: "11:45", milsec: todaysDate.setHours(11, 45)},
        {milTime: "12:00", stdTime: "12:00", milsec: todaysDate.setHours(12)},
        {milTime: "12:15", stdTime: "12:15", milsec: todaysDate.setHours(12, 15)},
        {milTime: "12:30", stdTime: "12:30", milsec: todaysDate.setHours(12, 30)},
        {milTime: "12:45", stdTime: "12:45", milsec: todaysDate.setHours(12, 45)},
        {milTime: "13:00", stdTime: "1:00", milsec: todaysDate.setHours(13)},
        {milTime: "13:15", stdTime: "1:15", milsec: todaysDate.setHours(13, 15)},
        {milTime: "13:30", stdTime: "1:30", milsec: todaysDate.setHours(13, 30)},
        {milTime: "13:45", stdTime: "1:45", milsec: todaysDate.setHours(13, 45)},
        {milTime: "14:00", stdTime: "2:00", milsec: todaysDate.setHours(14)},
        {milTime: "14:15", stdTime: "2:15", milsec: todaysDate.setHours(14, 15)},
        {milTime: "14:30", stdTime: "2:30", milsec: todaysDate.setHours(14, 30)},
        {milTime: "14:45", stdTime: "2:45", milsec: todaysDate.setHours(14, 45)},
        {milTime: "15:00", stdTime: "3:00", milsec: todaysDate.setHours(15)},
        {milTime: "15:15", stdTime: "3:15", milsec: todaysDate.setHours(15, 15)},
        {milTime: "15:30", stdTime: "3:30", milsec: todaysDate.setHours(15, 30)},
        {milTime: "15:45", stdTime: "3:45", milsec: todaysDate.setHours(15, 45)},
        {milTime: "16:00", stdTime: "4:00", milsec: todaysDate.setHours(16)},
        {milTime: "16:15", stdTime: "4:15", milsec: todaysDate.setHours(16, 15)},
        {milTime: "16:30", stdTime: "4:30", milsec: todaysDate.setHours(16, 30)},
        {milTime: "16:45", stdTime: "4:45", milsec: todaysDate.setHours(16, 45)}
    ];

    console.log("Today's Date in milliseconds: ", $scope.timeArray[0].milsec);
    $scope.sharedBookedNameData = SharedBookedNameData;
    //$scope.booking = [];
    //pull data from factory
    if($scope.sharedBookedNameData.setBambooData() === undefined){
        //console.log("first set is undefined (in controller).");
        $scope.sharedBookedNameData.retrieveBambooData()
            .then(function() {
                //console.log("In then in controller");
                $scope.booking = $scope.sharedBookedNameData.setBambooData();
                //console.log("response back (in then controller): ", $scope.booking);
                //set variables to hold data in arrays
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
                //console.log("length of array: ", $scope.booking.length);
                    //loop over array of booked times to find matching room name
                    for (i = 0; i < $scope.booking.length; i++) {
                    //console.log("Name of room: ", $scope.booking[i].meetingRoom.name);
                        //find room match, then push start times, end times, and name onto arrays
                        if ($scope.booking[i].meetingRoom.name === "Tap Room") {
                            //console.log("i", i);
                            //pull off the start dates into array
                            dateStartString[i] = $scope.booking[i].startDate;
                            dateEndString[i] = $scope.booking[i].endDate;
                            timeStringArray.push(dateStartString[i].slice(11, 13) + ":" + dateStartString[i].slice(14, 16));
                            endTimeStringArray.push(dateEndString[i].slice(11, 13) + ":" + dateEndString[i].slice(14, 16));
                            var findBookedTime = new Date();
                            var findEndBookedTime = new Date();
                            var meetingTime = [];
                            var endMeetingTime = [];
                            console.log("timeString: ", timeStringArray + ", " + endTimeStringArray);
                            //convert times in arrays to milliseconds for comparison
                            for(q=0; q<timeStringArray.length; q++) {

                                findBookedTime.setHours(parseInt(timeStringArray[q].slice(0, 2)), parseInt(timeStringArray[q].slice(3, 5)));
                                meetingTime[q] = Date.parse(findBookedTime);
                                //console.log("Meeting time in milliseconds: ", meetingTime);

                                findEndBookedTime.setHours(parseInt(endTimeStringArray[q].slice(0, 2)), parseInt(endTimeStringArray[q].slice(3, 5)));
                                endMeetingTime[q] = Date.parse(findEndBookedTime);
                                //console.log("End Meeting time in milliseconds: ", endMeetingTime);


                            }


                           //console.log("timeString: ", timeStringArray);

                            //save the names to new array
                            bookedName.push($scope.booking[i].payor.fullName);
                            //console.log("Full name array: ", bookedName);
                            //add those arrays to scope

                            $scope.timeStringArray = timeStringArray;
                            $scope.endTimeStringArray = endTimeStringArray;
                            $scope.nameInRoom = bookedName;

                            //function called from ng-repeat on calendarview.html to find booked hours
                            //$scope.bookedColor = function(hour) {
                            for(k=0; k<$scope.timeStringArray.length; k++) {
                                for(j=0; j<$scope.timeArray.length; j++){

                                        if($scope.timeStringArray[k] === $scope.timeArray[j].milTime) {
                                            //console.log("Found match: ", $scope.timeStringArray[k] + ", " + $scope.timeArray[j].milTime);
                                            var d = 1;
                                            while(endMeetingTime[k] >= $scope.timeArray[j+d].milsec){
                                                $scope.timeArray[j+d].isBooked = true;
                                                d++;
                                            }
                                            $scope.timeArray[j].isBooked = true;
                                            //console.log("match true? ", $scope.timeArray[j].isBooked);
                                            $scope.whoInRoom = $scope.nameInRoom[k];
                                        }
                                        //else {
                                        //$scope.timeArray.isBooked = true;
                                        //    $scope.timeArray[j].isBooked = false;
                                        //}
                                    }
                                }
                            $scope.getStyle = function(){
                                return "newStyle";
                            }


                        }
                    }
                }
            });
    } else {
        //console.log("In else on controller");
        $scope.booking = $scope.sharedBookedNameData.setBambooData();
        console.log("response back (in else controller): ", $scope.booking);
    }


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

    //when open hour block is tapped, sends the start time hour to reservationview page
    $scope.tapToBook = function(startHour){
        $location.path("/reservationview");
    }

}]);


//Controller for RESERVATION view page///////////////////////////////////////////////
myApp.controller('ReserveCtrl', ["$scope", "$location", function($scope, $location){
    //change out to data from Bamboo
    $scope.available = 10;
    $scope.thisMeeting = 2;
    $scope.balance = $scope.available - $scope.thisMeeting;
    var chargeByHour = 25;
    $scope.paymentDue = chargeByHour * $scope.thisMeeting;

    $scope.nevermind = function(){
        $location.path("/defaultscreen");
    }
}]);



