/**
 * Created by samuelmoss on 1/4/16.
 */

myApp.controller('ReserveBookCtrl',['$scope', 'SharedTimeData', 'SharedBookedNameData', function($scope, SharedTimeData, SharedBookedNameData){
    //console.log("we are in the RBC");
//RESERVEBOOK SCREEN
    //SharedTimeData is a factory that holds start time selected with ng-click by the user on the calendar view

    $scope.sharedTimeData = SharedTimeData;
    $scope.sharedBookedName = SharedBookedNameData;
    $scope.meetingTimesArray = undefined;


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


    if ($scope.meetingTimesArray == undefined) {
        $scope.updateMeetingTimeData();
    }


    //Starts the script.


    //if($scope.sharedBookedName.setBambooData() === null){
    //    $scope.sharedBookedName.retrieveBambooData()
    //        .then(function(){
    //            $scope.meetingTimesArray = $scope.sharedBookedName.setBambooData();
    //            console.log("(if) here is the data here: ", $scope.meetingTimesArray);
    //        }
    //    )
    //} else {
    //    $scope.meetingTimesArray = $scope.sharedBookedName.setBambooData();
    //    console.log("(else) here is the data here: ", $scope.meetingTimesArray)
    //}



    //$scope.tapToBook=function(hour){
    //    $scope.sharedTimeData.setTimeData(hour);
    //    $location.path("/reserveBookScreen");
    //};

    //startHour variable holds start time of meeting
    $scope.startHour = $scope.sharedTimeData.retrieveTimeData();

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