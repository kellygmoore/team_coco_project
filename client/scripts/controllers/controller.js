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
    //hours that room can be booked 8am - 5pm// needs to be 6pm for certain location
    //use milTime for comparing and logic, use stdTime for display on calendar
    $scope.timeArray = [
        {milTime: "8:00", stdTime: "8:00"},
        {milTime: "8:15", stdTime: "8:15"},
        {milTime: "8:30", stdTime: "8:30"},
        {milTime: "8:45", stdTime: "8:45"},
        {milTime: "9:00", stdTime: "9:00"},
        {milTime: "9:15", stdTime: "9:15"},
        {milTime: "9:30", stdTime: "9:30"},
        {milTime: "9:45", stdTime: "9:45"},
        {milTime: "10:00", stdTime: "10:00"},
        {milTime: "10:15", stdTime: "10:15"},
        {milTime: "10:30", stdTime: "10:30"},
        {milTime: "10:45", stdTime: "10:45"},
        {milTime: "11:00", stdTime: "11:00"},
        {milTime: "11:15", stdTime: "11:15"},
        {milTime: "11:30", stdTime: "11:30"},
        {milTime: "11:45", stdTime: "11:45"},
        {milTime: "12:00", stdTime: "12:00"},
        {milTime: "12:15", stdTime: "12:15"},
        {milTime: "12:30", stdTime: "12:30"},
        {milTime: "12:45", stdTime: "12:45"},
        {milTime: "13:00", stdTime: "1:00"},
        {milTime: "13:15", stdTime: "1:15"},
        {milTime: "13:30", stdTime: "1:30"},
        {milTime: "13:45", stdTime: "1:45"},
        {milTime: "14:00", stdTime: "2:00"},
        {milTime: "14:15", stdTime: "2:15"},
        {milTime: "14:30", stdTime: "2:30"},
        {milTime: "14:45", stdTime: "2:45"},
        {milTime: "15:00", stdTime: "3:00"},
        {milTime: "15:15", stdTime: "3:15"},
        {milTime: "15:30", stdTime: "3:30"},
        {milTime: "15:45", stdTime: "3:45"},
        {milTime: "16:00", stdTime: "4:00"},
        {milTime: "16:15", stdTime: "4:15"},
        {milTime: "16:30", stdTime: "4:30"},
        {milTime: "16:45", stdTime: "4:45"}
    ];
        //9, 10, 11, 12, 13, 14, 15, 16];

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
                var stringToHourStart = [];
                var stringToMinStart = [];
                var dateEndString = [];
                var stringToHourEnd = [];
                var stringToMinEnd = [];
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
                            //isolate the hour and minute in two arrays below
                            //stringToHourStart.push(dateStartString[i].slice(11, 13));
                            //stringToMinStart.push(dateStartString[i].slice(14, 16));
                            timeStringArray.push(dateStartString[i].slice(11, 13) + ":" + dateStartString[i].slice(14, 16));
                            console.log("timeString: ", timeStringArray[i]);
                            //timeString.push(stringToHourStart[i] + ":" + stringToMinStart[i]);

                            //dateEndString[i] = $scope.booking[i].endDate;
                            //stringToHourEnd.push(parseInt(dateEndString[i].slice(11, 13)));
                            //stringToMinEnd.push(parseInt(dateEndString[i].slice(14, 16)));

                            //save the names to new array
                            bookedName.push($scope.booking[i].payor.fullName);
                            //console.log("Full name array: ", bookedName);
                            //console.log("Start Hour array: ", stringToHourStart);
                            //console.log("End Hour array: ", stringToHourEnd);

                            //add those 3 arrays to scope
                            //$scope.startArray = stringToHourStart;
                            //$scope.endArray = stringToHourEnd;
                            $scope.timeStringArray = timeStringArray;
                            $scope.nameInRoom = bookedName;

                            //function called from ng-repeat on calendarview.html to find booked hours
                            //$scope.bookedColor = function(hour) {
                                for(j=0; j<$scope.timeArray.length; j++){
                                    for(k=0; k<$scope.timeStringArray.length; k++) {
                                        if($scope.timeStringArray[k] === $scope.timeArray[j].milTime) {
                                            console.log("Found match: ", $scope.timeStringArray[k] + ", " + $scope.timeArray[j].milTime);
                                            $scope.timeArray[j].isBooked = true;
                                            console.log("match true? ", $scope.timeArray[j].isBooked);
                                            $scope.whoInRoom = $scope.nameInRoom[k];
                                        }
                                        //else {
                                        ////$scope.timeArray.isBooked = true;
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

        var dateNow = new Date();       //gets current date and time
        //console.log("DateNow: " + dateNow);
        $scope.rightNowHour = dateNow.getHours();      //pulls the hours off of the current date and time
        $scope.rightNowMinutes = dateNow.getMinutes();
        //console.log("Rightnow hour: ", $scope.rightNowHour + " Rightnow Minutes: ", $scope.rightNowMinutes.toString());
        $scope.pastTime = $scope.rightNowHour + ":" + ($scope.rightNowMinutes).toString();
        //console.log("pastTime: ", $scope.pastTime);
        //if statement compares current hour to past hours, called from ng-repeat
        if($scope.pastTime < hour){
                console.log("$scope.pastTime: " + $scope.pastTime + "hour: ", hour);
                console.log("returning true");
                return true;
            }
        console.log("false hour: ", hour);
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



