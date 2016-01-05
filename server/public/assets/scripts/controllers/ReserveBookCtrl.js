/**
 * Created by samuelmoss on 1/4/16.
 */

myApp.controller('ReserveBookCtrl',['$scope', 'SharedTimeData', 'SharedBookedNameData', 'dateFilter', function($scope, SharedTimeData, SharedBookedNameData, dateFilter){
    //console.log("we are in the RBC");
    //RESERVEBOOK SCREEN
    //SharedTimeData is a factory that holds start time selected with ng-click by the user on the calendar view

    $scope.sharedTimeData = SharedTimeData;
    $scope.sharedBookedName = SharedBookedNameData;
    $scope.meetingTimesArray = undefined;
    $scope.cleanArray = undefined;
    var startTime = {};
    var endTime = {};

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


    //$scope.tapToBook=function(hour){
    //    $scope.sharedTimeData.setTimeData(hour);
    //    $location.path("/reserveBookScreen");
    //};

    //startHour variable holds start time of meeting
    $scope.allStartTimes = $scope.sharedTimeData.retrieveBookedTimes();

    var disableTime = function(dirtyArray){
        $scope.cleanArray = dirtyArray.map(
            function(obj){
               if(obj.milsec > Date.now() && obj.isBooked === false){
                   return obj;
               }
            }
        )
    };

    disableTime($scope.allStartTimes);
    console.log ("This is cleanArray", $scope.cleanArray);

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

    //The following populates the dropdown menus on the reserveBookScreen
    $scope.data = {
        selectStartTime: null,
        availableStartTime: [
            {startTime: $scope.startHour + ':', minutes: '00'},
            {startTime: $scope.startHour + ':', minutes: '15'},
            {startTime: $scope.startHour + ':', minutes: '30'},
            {startTime: $scope.startHour + ':', minutes: '45'}
        ],

        selectDuration:null,
        availableDuration: [
            {duration:'15'},
            {duration:'30'},
            {duration:'45'},
            {duration:'60'}
        ]
    };
}]);