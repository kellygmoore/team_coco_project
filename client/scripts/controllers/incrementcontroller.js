/**
 * Created by lahusiak on 12/16/15.
 */
//This controller provides functionality to the reserveBookScreen, incrementing hours, minutes, and people.
//    It connects with a factory to populate the start time selected by the user on the calendar view page.

myApp.controller('IncrementCtrl', ['$scope', 'SharedTimeData', function($scope, SharedTimeData){
    ///SharedTimeData is a factory that holds start time selected with ng-click by the user on the calendar view

    $scope.sharedTimeData = SharedTimeData;

    $scope.data = {
        //selectStartTime: null,
        //availableStartTime: [
        //    {startTime: '10:00am'},
        //    {startTime:'10:15am'},
        //    {startTime:'10:30am'},
        //    {startTime:'10:45am'}
        //],

        //selectDuration:null,
        //availableDuration: [
        //    {duration:'15 minutes'},
        //    {duration:'30 minutes'},
        //    {duration:'45 minutes'},
        //    {duration:'60 minutes'},
        //]
    };



$scope.startHour = $scope.sharedTimeData.retrieveTimeData();
    //console.log("This is startHour incrementCtrl", $scope.startHour);
    //
    //$scope.endHour = $scope.startHour.clickedHour+1;

    ///Global variable
    $scope.meetingValues = {
        people: 2,
        hours: 1,
        minutes: "00"

    };

    $scope.peopleAdd = function(){
        $scope.meetingValues.people++;
    };

    $scope.peopleRemove= function(){
        $scope.meetingValues.people--;
        if($scope.meetingValues.people - 1 <=0){
            $scope.meetingValues.people = 0
        } else {
            $scope.meetingValues.people--;
        }
    };

    $scope.hourRemove= function(){
        $scope.meetingValues.hours--;
        $scope.endHour--;
        if(($scope.meetingValues.hours - 1) <=0){
            $scope.meetingValues.hours = 0

        } else {
            $scope.meetingValues.hours--;
        }
    };

    $scope.hourAdd= function(){
        $scope.meetingValues.hours++;
        $scope.endHour++;
    };

    $scope.minuteAdd= function (){
        $scope.meetingValues.minutes+=15;
        if($scope.meetingValues.minutes > 45){
            $scope.meetingValues.minutes = 45;
        } else{$
            scope.meetingValues.minutes+=15}
    };

    $scope.minuteRemove=function(){
        $scope.meetingValues.minutes-=15;
        if($scope.meetingValues.minutes - 15 <=0){
            $scope.meetingValues.minutes = "00"
        } else {
            $scope.meetingValues.minutes-=15;
        }
    };

}]);


