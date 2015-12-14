/**
 * Created by kellygarskemoore on 12/10/15.
 */
//Controller for the THETOP header clock/////////////////////////////////////////
myApp.controller('TimeCtrl', ["$scope", "$timeout", function($scope, $timeout) {

    $scope.bookingMember = "The Grinch";
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms

    var tick = function() {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);

    }]);

//Controller for the CALENDAR ////////////////////////////////////////////////////////
myApp.controller('CalendarCtrl', ["$scope", "$location", function($scope, $location){
    //dummy data for time hours that room can be booked//
    $scope.bambooDataArray = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
    //placeholder for who is in the room for that booked time//
    $scope.memberInRoom = "Santa Claus";
}]);

   //$scope.pastTime = false;
   // var rightNow, booked, middle;
   // var d = new Date();
   // var c = new Date();
   // //console.log(d + " " + c);
   //
   // rightNow = d.getHours();
   // //console.log("Rightnow: ", rightNow);
   // middle = c.setHours(9);
   // var next = new Date(middle);
   // //console.log("middle: ", next);
   // booked = next.getHours();
   // //booked = middle.getHours();
   // //console.log("booked: ", booked);
   //
   // console.log("right now: ", rightNow + "booked: ", booked);
   //
   // if (booked < rightNow) {
   //     $scope.pastTime = true;
   // } else {
   //     $scope.pastTime = false;
   // }
//Controller for RESERVATION view page///////////////////////////////////////////////
myApp.controller('ReserveCtrl', ["$scope", "$location", function($scope, $location){
    //change out to data from Bamboo
    $scope.available = 10;
    $scope.thisMeeting = 2;
    $scope.balance = $scope.available - $scope.thisMeeting;
    var chargeByHour = 25;
    $scope.paymentDue = chargeByHour * $scope.thisMeeting;

    $scope.nevermind = function(){
        $location.path("/defaultscreen");
    }
}]);

//Controller for DEFAULT screen view////////////////////////////////////////////////////
myApp.controller('DefaultCtrl', ["$scope", "$location", function($scope, $location){
//change out to data from Bamboo
    $scope.roomName = "The Library";
    $scope.timeLeftHr = 1;
    $scope.timeLeftMin = 36;
    $scope.nextMtgAt = "3:00";      //string or number?
    $scope.roomBooked = true;

    $scope.gotoCalendar = function(){
        $location.path('/calendarview');
    };


    //if statement goes here to check if room is currently booked, then set roomBooked to true

}]);




myApp.controller('AppCtrl', ['$scope', '$mdDialog', '$mdMedia', function($scope, $mdDialog, $mdMedia){

    $scope.status = '  ';

    $scope.customFullscreen = $mdMedia('sm');

    //Holds the number of people and hours of the meeting

$scope.showLogin = function(ev) {
    console.log("show advanced");
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'assets/views/routes/login.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $mdMedia('sm') && $scope.customFullscreen
    })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    $scope.$watch(function() {
        return $mdMedia('sm');
    }, function(sm) {
        $scope.customFullscreen = (sm === true);
    });
};

    //Modal window for setting meeting time and number of people
    $scope.showBooking = function(ev) {
        console.log("show booking");
        $mdDialog.show({
            controller: BookingTimeController,
            templateUrl: 'assets/views/routes/bookingTime.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $mdMedia('sm') && $scope.customFullscreen
        });
        $scope.$watch(function() {
            return $mdMedia('sm');
        }, function(sm) {
            $scope.customFullscreen = (sm === true);
        });
    };

}]);

function DialogController($scope, $mdDialog) {
    console.log("Dialog controller");
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}

<<<<<<< HEAD
//This provides functionality for the booking window (bookingscreen.html).
//It populates the modal with initial values and allows for incrementing
//and decrementing those values. These values are then to be sent
//to the server on submission to reserve the room.
function BookingTimeController($scope, $mdDialog) {

    $scope.meetingValues = {
        people: 2,
        hours: 1
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
}
=======
>>>>>>> master
