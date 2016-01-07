/**
 * Created by samuelmoss on 1/4/16.
 */

myApp.controller('ReserveBookCtrl',['$scope', 'SharedTimeData', 'SharedBookedNameData', 'dateFilter', function($scope, SharedTimeData, SharedBookedNameData, dateFilter){
    //console.log("we are in the RBC");
    //RESERVEBOOK SCREEN
    //SharedTimeData is a factory that holds start time selected with ng-click by the user on the calendar view

    $scope.sharedTimeData = SharedTimeData;
    $scope.sharedBookedName = SharedBookedNameData;
    $scope.allStartTimes = $scope.sharedBookedName.setTime();
    $scope.meetingTimesArray = undefined;
    $scope.cleanArray = undefined;
    $scope.cleanEndArray = undefined;
    var startTime = {};
    var endTime = {};
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
        };
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
                //UNCOMMENT AT START OF DAY!!!
                // if((obj.milsec > Date.now()) && (obj.isBooked === false))
                    if((obj.isBooked === false)){
                    $scope.cleanArray.push(obj);
                }
            }
        )
    };

    //This is the model used for the start time dropdown menu
    $scope.data = {
        selectStartTime: null,
        cleanArray: cleanStartTime($scope.allStartTimes),
    };

    //The cleanEndTime function creates an array of available End Times
    //based on the start time selected in the drop down
    $scope.cleanEndTime = function(){
        $scope.cleanEndArray = [];
        if($scope.data.selectStartTime!==null){
            searchForStart($scope.allStartTimes);
            //buildArray();

        }
    };

    var searchForStart = function(basicArray){
        console.log("This is allStartTimes/basicArray", basicArray);
        //console.log("$scope.data.selectStartTime", $scope.data.selectStartTime);
        for(var i = 0; i< basicArray.length; i++) {
            //console.log("milsec value in index ", i, " of basic array=", basicArray[i].milsec);
            console.log("milsec value of selected start time =", $scope.data.selectStartTime);
            //
            //console.log("Index basicArray index 18", basicArray[18]);
            if((basicArray[i].milsec) === ($scope.data.selectStartTime.milsec)){
                console.log("I made a match!");

                startIndex = i;
            }
        }
        console.log("this is start index", startIndex);
        //This for loop loops through an array based on the startIndex point established above
        //Start Index is the index point of the selectedStartTime
        //The loop will create a new array of objects
        for(var i=(startIndex+1); i<basicArray.length; i++){
            if(basicArray[i].isBooked===false){
                $scope.cleanEndArray.push(basicArray[i]);
            }else{
                $scope.cleanEndArray.push(basicArray[i]);
                break;
            }
        }
        //console.log("this is cleanEndArray", $scope.cleanEndArray);

        $scope.selectEndTime = null;
        $scope.availableEndTime = $scope.cleanEndArray;
    };



    $scope.constructTimeObject = function(time){
        //This function is going to be called every time there is a start time without a meeting in
        //session and is going to construct and object consisting of a key of start time
        //then a value of the hour and the minutes.
    };

    $scope.constructTimeArray = function(meetingTimes){
        $scope.data.availableStartTime = [];

        for(var i = startTime.hour ;i < endTime.hour ; i++){
            $scope.constructTimeObject(i);
        }
        //We'll need to know: what time it is, how long until the building closes
        //and also all the times where meetings are being held.
        //Then we are going to construct a start and end bound time and
        //create a time object for each of these, skipping over all the times
        //where a meeting is in session.
        //Return some array that we will set 'availableStartTime' to.
    };

    //$scope.constructTimeArray(meetingTimesArray);


}]);