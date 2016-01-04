/**
 * Created by samuelmoss on 1/4/16.
 */

myApp.controller('ReserveBookCtrl',['$scope', 'SharedTimeData',function($scope, SharedTimeData){
    console.log("we are in the RBC");
//RESERVEBOOK SCREEN
    //SharedTimeData is a factory that holds start time selected with ng-click by the user on the calendar view

    $scope.sharedTimeData = SharedTimeData;

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