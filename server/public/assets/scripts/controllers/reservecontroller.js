/**
 * Created by lahusiak on 12/16/15.
 */

myApp.controller('reserveCtrl', ['$scope', function($scope){

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
    };

    $scope.hourRemove= function(){
        $scope.meetingValues.hours--;
    };

    $scope.hourAdd= function(){
        $scope.meetingValues.hours++;
    };

    $scope.minuteAdd= function (){
        $scope.meetingValues.minutes+=15;
    };

    $scope.minuteRemove=function(){
        $scope.meetingValues.minutes-=15;
    };
//}

}]);