/**
 * Created by samuelmoss on 1/4/16.
 */

myApp.controller('ReserveBookCtrl',['$scope', 'SharedTimeData', 'SharedBookedNameData', 'dateFilter', 'TimeOut', function($scope, SharedTimeData, SharedBookedNameData, dateFilter,TimeOut){
    //console.log("we are in the RBC");
    //RESERVEBOOK SCREEN
    //SharedTimeData is a factory that holds start time selected with ng-click by the user on the calendar view
    TimeOut.endTimer();

    $scope.sharedTimeData = SharedTimeData;
    $scope.sharedBookedName = SharedBookedNameData;
    $scope.allStartTimes = $scope.sharedBookedName.setTime();
    $scope.meetingTimesArray = undefined;
    $scope.cleanArray = undefined;
    $scope.cleanEndArray = undefined;
    $scope.meetingDuration = undefined;
    $scope.clickedHour = $scope.sharedTimeData.retrieveStartTime();
    console.log("here's clickedHour:", $scope.clickedHour);
    //$scope.selectEndTime = null;
    var startTime = {};
    var endTime = {};

    //Pulls the room capacity from the shared time factory for use in limiting the room attendance.
    var roomCapacity = $scope.sharedTimeData.retrieveCapacity();
    $scope.stageArray = [];

    var startIndex = 0;

    $scope.updateMeetingTimeData = function(){
        console.log("step 2");
        $scope.sharedBookedName.retrieveBambooData()
            .then(function(){
                $scope.meetingTimesArray = undefined;
                $scope.meetingTimesArray = $scope.sharedBookedName.setBambooData();
                //$scope.meetingTimeSwitch();
                console.log("Here is the booked data: ", $scope.meetingTimesArray);
            }
        );
    };

    var startTimeSet = function() {
        var currentHour = parseInt(dateFilter(Date.now(), 'HH'));
        var currentMinute = parseInt(dateFilter(Date.now(), 'mm'));
        switch (true) {
            case (currentMinute > 0 && currentMinute < 15):
                currentMinute = 15;
                break;
            case(currentMinute >= 15 && currentMinute < 30):
                currentMinute = 30;
                break;
            case(currentMinute >= 30 && currentMinute < 45):
                currentMinute = 45;
                break;
            case(currentMinute >= 45):
                currentMinute = 0;
                currentHour++;
                break;
        }
        startTime.hour = currentHour;
        startTime.minute = currentMinute;
    };

    startTimeSet();

    var endTimeSet = function(){
        endTime.minute = 0;
        if(localStorage.selectLocation == 129){
            endTime.hour = 6
        } else {
            endTime.hour = 5;
        }
    };

    endTimeSet();

    console.log("start time: ", startTime);
    console.log("end time: ", endTime);


    if ($scope.meetingTimesArray == undefined) {
        $scope.updateMeetingTimeData();
    }

    //The following populates the dropdown menus on the reserveBookScreen

   //The cleanStartTime function takes passes in the array of all available times for the room
    //It takes out anytimes that are booked and makes a new array called cleanArray
    //The cleanArray is used to display the available start times of a meeting

    var cleanStartTime = function(dirtyArray){
        $scope.cleanArray = [];
        dirtyArray.map(
            function(obj){
                 //TURN BACK ON AT START OF DAY
                 //if((obj.milsec > Date.now()) && (obj.isBooked === false))
                    if((obj.isBooked === false)){
                    $scope.cleanArray.push(obj);
                }
            }
        )
    };


    //The cleanEndTime function creates an array of available End Times
    //based on the start time selected in the drop down
    $scope.cleanEndTime = function(){
        $scope.cleanEndArray = [];
        if($scope.data.selectStartTime!==null){
            searchForStart($scope.allStartTimes);
            buildArray($scope.allStartTimes);

        }
    };

    var searchForStart = function(basicArray) {
        //console.log("$scope.data.selectStartTime", $scope.data.selectStartTime);
        for (var i = 0; i < basicArray.length; i++) {
            //console.log("milsec value in index ", i, " of basic array=", basicArray[i].milsec);
            //console.log("Index basicArray index 18", basicArray[18]);
            if ((basicArray[i].milsec) === ($scope.data.selectStartTime.milsec)) {
                console.log("I made a match!");
                startIndex = i;
            }
        }
        console.log("this is start index", startIndex);
    };
        //This for loop loops through an array based on the startIndex point established above
        //Start Index is the index point of the selectedStartTime
        //The loop will create a new array of objects

    var buildArray = function(basicArray){
        for(var i=(startIndex+1); i<basicArray.length; i++){
            if(basicArray[i].isBooked===false){
                $scope.cleanEndArray.push(basicArray[i]);
            }else{
                $scope.cleanEndArray.push(basicArray[i]);
                break;
            }
        }
        //console.log("this is cleanEndArray", $scope.cleanEndArray);

        $scope.selectEndTime = $scope.cleanArray[1].stdTime;
        $scope.availableEndTime = $scope.cleanEndArray;
    };

    var constructCapacityObject = function(){
        for(var i = 2; i <= roomCapacity; i++){
            $scope.attendObject = {};
            $scope.attendObject.attendees = (i).toString();
            $scope.stageArray.push($scope.attendObject);
        }
    };
    constructCapacityObject();
    console.log("here is room cap: ", roomCapacity);
    console.log("here is stage array: ", $scope.stageArray);

    //This is the model used for the start time & attendance dropdown menu
    $scope.data = {
        selectStartTime: null,
        cleanArray: cleanStartTime($scope.allStartTimes),
        selectAttendance: null,
        availableCapacity: $scope.stageArray
    };

    //THIS CONTROLS THE BOOKING SUMMARY DIV ON RESERVEBOOK VIEW

    $scope.available = 10;

    $scope.thisMeeting = function(){
        var durationMilliseconds;
        durationMilliseconds = ($scope.selectEndTime.milsec) - ($scope.data.selectStartTime.milsec);
        $scope.meetingDuration = ((durationMilliseconds)/3600000).toString();
        console.log("This meeting is", $scope.meetingDuration, "long");
    };

    $scope.balance = $scope.available - $scope.meetingDuration;
    var chargeByHour = 25;
    $scope.paymentDue = chargeByHour * $scope.meetingDuration;

    $scope.nevermind = function(){
        $location.path("/defaultscreen");
    };
    $scope.goback = function(){
        $location.path("/bookingscreen");
    }

}]);