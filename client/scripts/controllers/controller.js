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

myApp.controller('ReserveCtrl', ["$scope", "$location", function($scope, $location){
    $scope.available = 10;
    $scope.thisMeeting = 2;
    $scope.balance = $scope.available - $scope.thisMeeting;
    var chargeByHour = 25;
    $scope.paymentDue = chargeByHour * $scope.thisMeeting;
}]);





//}]);

    //}]);

myApp.controller('AppCtrl', ['$scope', '$mdDialog', '$mdMedia', function($scope, $mdDialog, $mdMedia){

$scope.status = '  ';

$scope.customFullscreen = $mdMedia('sm');

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

