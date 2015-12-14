/**
 * Created by Zeo on 12/11/15.
 */
myApp.controller('ConfigController', ["$scope","$http", function($scope,$http) {

    $scope.data = {
        selectLocation: null,
        availableLocations: [
            {id: '1', name: 'COCO Location A'},
            {id: '2', name: 'COCO Location B'},
            {id: '3', name: 'COCO Location C'}
        ],
        selectRoom: null,
        availableRooms: [
            {id: '11', name: 'Option Room 1'},
            {id: '12', name: 'Option Room 2'},
            {id: '13', name: 'Option Room 3'}
        ],
        calendarTimeout: null,
        bookingTimeout: null,
        resultsTimeout: null
    };


    $scope.saveSettings=function(){
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.selectLocation=$scope.data.selectLocation;
            localStorage.selectRoom=$scope.data.selectRoom;
            localStorage.calendarTimeout=$scope.data.calendarTimeout;
            localStorage.boookingTimeout=$scope.data.bookingTimeout;
            localStorage.resultsTimeout=$scope.data.resultsTimeout;


        } else {
           console.log("here is localStorage",localStorage.selectLocation);
        }

        console.log("selectlocation",$scope.data.selectLocation);
        console.log("Select Room",$scope.data.selectRoom);
        console.log("calendar time out",$scope.data.calendarTimeout);
    };

}]);