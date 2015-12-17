/**
 * Created by lahusiak on 12/16/15.
 */

myApp.controller('IncrementCtrl', ['$scope', function($scope){

    //$scope.reserve = function($scope, $mdDialog) {

    $scope.meetingValues = {
        people: 2,
        hours: 1,
        minutes: 0

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
        if($scope.meetingValues.hours - 1 <=0){
            $scope.meetingValues.hours = 0
        } else {
            $scope.meetingValues.hours--;
        }
    };

    $scope.hourAdd= function(){
        $scope.meetingValues.hours++;
    };

    $scope.minuteAdd= function (){
        $scope.meetingValues.minutes+=15;
        if($scope.meetingValues.minutes + 15 > 45){
            $scope.meetingValues.minutes = 45;
        } else{$
            scope.meetingValues.minutes+=15}
    };

    $scope.minuteRemove=function(){
        $scope.meetingValues.minutes-=15;
        if($scope.meetingValues.minutes - 15 <=0){
            $scope.meetingValues.minutes = 0
        } else {
            $scope.meetingValues.minutes-=15;
        }
    };


}]);