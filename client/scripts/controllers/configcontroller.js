/**
 * Created by Zeo on 12/11/15.
 */
myApp.controller('ConfigController', ["$scope","$http","$location","$timeout", function($scope,$http,$location,$timeout) {

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

//Whenever the Submit and Save Setting buttons is click the results are stored on to local host
    $scope.saveSettings=function(){
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.selectLocation=$scope.data.selectLocation;
            localStorage.selectRoom=$scope.data.selectRoom;

            localStorage.calendarTimeout=convertSecondsToMs($scope.data.calendarTimeout);
            localStorage.boookingTimeout=convertSecondsToMs($scope.data.bookingTimeout);
            localStorage.resultsTimeout=convertSecondsToMs($scope.data.resultsTimeout);


            // The $timeout() method calls a function or evaluates an expression after a specified number of milliseconds.
            // function that sends users back to the default page
            // We need to set the set-time-out function to their appropriate pages and pull the time frame from the local storage of the browser

            $timeout(function(){$location.path("/defaultscreen"); }, localStorage.calendarTimeout);
            //Tip: 1000 ms = 1 second.

        } else {
           console.log("here is localStorage",localStorage.selectLocation);
        }

        //console.log("selectlocation",$scope.data.selectLocation);
        //console.log("Select Room",$scope.data.selectRoom);
        //console.log("calendar time out",$scope.data.calendarTimeout);
    };


    //convert seconds to ms
    function convertSecondsToMs(sec){
        var ms= sec* 1000;
        return ms;

    };
}]);

