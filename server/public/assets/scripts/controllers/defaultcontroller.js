/**
 * Created by samuelmoss on 12/17/15.
 */
//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", "SharedRoomData", function($scope, $location, SharedRoomData){
//change out to data from Bamboo

    $scope.sharedRoomData = SharedRoomData;

    if($scope.sharedRoomData.setRoomData() === undefined){
        $scope.sharedRoomData.retrieveRoomData();
    }

    $scope.room = $scope.sharedRoomData.retrieveRoomData();

    console.log("Shared room data: ", $scope.room);




    //$scope.roomName = "The Library";
    //$scope.timeLeftHr = 1;
    //$scope.timeLeftMin = 36;
    //$scope.nextMtgAt = "3:00";      //string or number?
    //$scope.roomBooked = true;
    //
    //$scope.gotoCalendar = function(){
    //    $location.path('/calendarview');
    //};


    //if statement goes here to check if room is currently booked, then set roomBooked to true

}]);