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
    $scope.memberInRoom = [];
    $scope.bookedColor = true;
    //hours that room can be booked 8am - 5pm//
    $scope.bambooDataArray = [8, 9, 10, 11, 12, 13, 14, 15, 16];

    $scope.sharedBookedNameData = SharedBookedNameData;
    //$scope.booking = [];

    if($scope.sharedBookedNameData.setBambooData() === undefined){
        //console.log("first set is undefined (in controller).");
        $scope.sharedBookedNameData.retrieveBambooData()
            .then(function() {
                //console.log("In then in controller");
                $scope.booking = $scope.sharedBookedNameData.setBambooData();
                //console.log("response back (in then controller): ", $scope.booking);
                var dateStartString = [];
                var stringToHourStart = [];
                var stringToMinStart = [];
                var dateEndString = [];
                var stringToHourEnd = [];
                var stringToMinEnd = [];
                var bookedName = [];
                //console.log("In .then, here is bamboodata: ", $scope.bambooDataArray);
                //if there are NO meetings, then nothing has to happen//////
                if($scope.booking.length === 0){
                    console.log("in first if where length is zero");
                    return;
                } else {
                console.log("length of array: ", $scope.booking.length);
                    for (i = 0; i < $scope.booking.length; i++) {
                    //console.log("Name of room: ", $scope.booking[i].meetingRoom.name);
                        if ($scope.booking[i].meetingRoom.name === "Tap Room") {
                            //console.log("i", i);
                            dateStartString[i] = $scope.booking[i].startDate;
                            stringToHourStart.push(parseInt(dateStartString[i].slice(11, 13)));
                            stringToMinStart.push(dateStartString[i].slice(14, 16));

                            dateEndString[i] = $scope.booking[i].endDate;
                            stringToHourEnd.push(dateEndString[i].slice(11, 13));
                            stringToMinEnd.push(dateEndString[i].slice(14, 16));

                            bookedName.push($scope.booking[i].payor.fullName);
                            console.log("Full name: ", bookedName);
                            console.log("Hour array: ", stringToHourStart);
                            for(k=0; k<$scope.bambooDataArray.length; k++){
                                console.log("In k loop.");
                                for(j=0; j<stringToHourStart.length; j++){
                                    console.log("In j loop.");
                                    console.log(stringToHourStart[j]);
                                    console.log($scope.bambooDataArray[k]);
                                    if(stringToHourStart[j] === $scope.bambooDataArray[k]){
                                        console.log("j: ", + j + " k: ", k);
                                        console.log("bookedName: ", bookedName[j]);
                                        $scope.memberInRoom = bookedName[j];
                                        console.log("scope.memberinroom: ", $scope.memberInRoom);
                                        $scope.bookedColor = false;
                                    }
                                }
                            }

                            //$scope.isHourBooked = function(hour) {
                            //    console.log("In isHourBooked function!", hour + " array: ", stringToHourStart);
                            //    for (j = 0; j < stringToHourStart.length; j++) {
                            //        if (stringToHourStart[j] === hour) {
                            //            return true;
                            //        }
                            //        return false;
                            //    }
                            //}
                        }
                    }
                }
            });
    } else {
        //console.log("In else on controller");
        $scope.booking = $scope.sharedBookedNameData.setBambooData();
        console.log("response back (in else controller): ", $scope.booking);
    }


    console.log("1st array returned here.");

    //function to see if timeblock on ng-repeat should be shaded like past time, passes in timeblock
    $scope.checkPastTime = function(hour){

        var dateNow = new Date();       //gets current date and time
        //console.log("DateNow: " + dateNow);
        $scope.rightNowHour = dateNow.getHours();      //pulls the hours off of the current date and time
        //console.log("Rightnow: ", $scope.rightNowHour);

        //if statement compares current hour to past hours, called from ng-repeat
        if($scope.rightNowHour > hour){
                return true;
            }
            return false;
        };

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



