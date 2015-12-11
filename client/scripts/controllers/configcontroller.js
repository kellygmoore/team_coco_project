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
        selectRoom:null,
        availableRooms:[
            {id: '11', name: 'Option Room 1'},
            {id: '12', name: 'Option Room 2'},
            {id: '13', name: 'Option Room 3'}
        ],
        calenderTimeout:null,
        bookingTimeout:null,
        resultsTimeout:null
    };

// Collect data input from what users selects
// push information into factory
// Still need to reroute when the button is clicked

    $scope.saveSettings=function(){
        console.log("selectlocation",$scope.data.selectLocation);
        console.log("Select Room",$scope.data.selectRoom);
        console.log("calendar time out",$scope.data.calendarTimeout);
    };

}]);