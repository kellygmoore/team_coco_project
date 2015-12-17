/**
 * Created by samuelmoss on 12/17/15.
 */
//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", "SharedRoomData", "SharedBookedNameData", function($scope, $location, SharedRoomData, SharedBookedNameData){
//change out to data from Bamboo

    //console.log("default controller works");

    $scope.roomData = SharedRoomData;

    $scope.bookingData = SharedBookedNameData;

    $scope.meetingTimesArray = [];


    if($scope.roomData === undefined){
        $scope.roomData.setRoomData();
        $scope.roomData = $scope.roomData.retrieveRoomData();
    }

    if($scope.bookingData.setBambooData() === undefined) {
        $scope.bookingData.retrieveBambooData()
                .then(function(){
                    $scope.bookedData = $scope.bookingData.setBambooData();
                    console.log("promise meeting data: ", $scope.bookedData)
                });
    } else {
        $scope.bookedData = $scope.bookingData.setBambooData();
        console.log("promise meeting data: ", $scope.bookedData);
    }

    //if($scope.userService.userData() === undefined) {
    //    console.log("getting user list from user service");
    //    $scope.userService.userList()
    //        .then(function() {
    //            $scope.users = $scope.userService.userData();
    //        });
    //} else {
    //    $scope.users = $scope.userService.userData();
    //}


    //console.log("Shared room data: ", $scope.room);

    $scope.roomName = $scope.roomData.name;
    $scope.timeLeftHr = 1;
    $scope.timeLeftMin = 36;
    $scope.nextMtgAt = "3:00";      //string or number?
    $scope.roomBooked = true;


    //$scope.meetingTimeCalc = function(){
    //
    //};
    //if statement goes here to check if room is currently booked, then set roomBooked to true

    $scope.gotoCalendar = function(){
        $location.path('/calendarview');
    };

}]);