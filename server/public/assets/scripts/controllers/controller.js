/**
 * Created by kellygarskemoore on 12/10/15.
 */
//Controller for the THETOP header clock/////////////////////////////////////////
myApp.controller('TimeCtrl', ["$scope", "$timeout",  'SharedRoomData', function($scope, $timeout, SharedRoomData) {

    $scope.room = [];
    $scope.sharedRoomData = SharedRoomData;

    if($scope.sharedRoomData.setRoomData() === undefined){
        $scope.sharedRoomData.retrieveRoomData();
    }

    $scope.room = $scope.sharedRoomData.retrieveRoomData();

    console.log("Shared room data: ", $scope.room);

    /////////////////////////////
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
    //$scope.twelveHourClockArray = [];
    $scope.bambooDataArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    //$scope.bambooDataArray = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];//minutes practice
    //placeholder for who is in the room for that booked time//
    $scope.memberInRoom = "Santa Claus";

    //function to see if timeblock on ng-repeat should be shaded like past time, passes in timeblock
    $scope.checkPastTime = function(hour){

        var dateNow = new Date();       //gets current date and time
        //console.log("DateNow: " + dateNow);
        $scope.rightNowHour = dateNow.getHours();      //pulls the hours off of the current date and time
        //$scope.rightNowHour = dateNow.getMinutes();
        //console.log("Rightnow: ", $scope.rightNowHour);

        //if statement compares current hour to past hours, called from ng-repeat
        if($scope.rightNowHour > hour){
                return true;
            }
            return false;
        };
}]);




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


<<<<<<< HEAD


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
        //.then(function(answer) {
        //    $scope.status = 'You said the information was "' + answer + '".';
        //}, function() {
        //    $scope.status = 'You cancelled the dialog.';
        //});
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

function DialogController($scope, $mdDialog, $http) {
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
    $scope.submit = function(){

        $http({
            method: 'POST',
            //fill in with API
            url: '/someUrl'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if (response.status == 200) {
                //redirect to calendar view logged in
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //do we want to have a pop-up message here?
        });

    }
}

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
        while($scope.meetingValues.people < 1){
            $scope.meetingValues.people = 1;
        }
    };

    $scope.hourRemove= function(){
        $scope.meetingValues.hours--;
        while($scope.meetingValues.hours < 0){
            $scope.meetingValues.hours = 0;
        }
    };

    $scope.hourAdd= function(){
        $scope.meetingValues.hours++;
    };
}
=======
////////*****CONTROLLER FOR MODAL WINDOWS: LOGIN/SUCCESSFUL BOOK & FAILED TO BOOK
//
//myApp.controller('AppCtrl', ['$scope', '$mdDialog', '$mdMedia', '$location', function($scope, $mdDialog, $mdMedia, $location){
//
//    $scope.status = '  ';
//
//    $scope.customFullscreen = $mdMedia('sm');
//
//    //Holds the number of people and hours of the meeting
//
//$scope.showLogin = function(ev) {
//    console.log("show advanced");
//    $mdDialog.show({
//        controller: DialogController,
//        templateUrl: 'assets/views/routes/login.html',
//        parent: angular.element(document.body),
//        targetEvent: ev,
//        clickOutsideToClose:true,
//        fullscreen: $mdMedia('sm') && $scope.customFullscreen
//    });
//        //.then(function(answer) {
//        //    $scope.status = 'You said the information was "' + answer + '".';
//        //}, function() {
//        //    $scope.status = 'You cancelled the dialog.';
//        //});
//    $scope.$watch(function() {
//        return $mdMedia('sm');
//    }, function(sm) {
//        $scope.customFullscreen = (sm === true);
//    });
//};
//
//    //Modal window for setting meeting time and number of people
//    $scope.showBooking = function(ev) {
//        console.log("show booking");
//        $mdDialog.show({
//            controller: BookingTimeController,
//            templateUrl: 'assets/views/routes/bookingTime.tmpl.html',
//            parent: angular.element(document.body),
//            targetEvent: ev,
//            clickOutsideToClose:true,
//            fullscreen: $mdMedia('sm') && $scope.customFullscreen
//        });
//        $scope.$watch(function() {
//            return $mdMedia('sm');
//        }, function(sm) {
//            $scope.customFullscreen = (sm === true);
//        });
//    };
//
//
//    //Modal if booking if successful
//    $scope.bookingSuccess = function(ev) {
//    console.log("show success booking");
//    $mdDialog.show({
//        controller: okController,
//        templateUrl: 'assets/views/routes/bookingSuccess.html',
//        parent: angular.element(document.body),
//        targetEvent: ev,
//        clickOutsideToClose:true,
//        fullscreen: $mdMedia('sm') && $scope.customFullscreen
//    });
//
//    $scope.$watch(function() {
//        return $mdMedia('sm');
//    }, function(sm) {
//        $scope.customFullscreen = (sm === true);
//    });
//};
//
//    //Modal if booking fails
//    $scope.bookingFail = function(ev) {
//        console.log("show fail booking");
//        $mdDialog.show({
//            controller: okController,
//            templateUrl: 'assets/views/routes/bookingFail.html',
//            parent: angular.element(document.body),
//            targetEvent: ev,
//            clickOutsideToClose:true,
//            fullscreen: $mdMedia('sm') && $scope.customFullscreen
//        });
//
//        $scope.$watch(function() {
//            return $mdMedia('sm');
//        }, function(sm) {
//            $scope.customFullscreen = (sm === true);
//        });
//    };
//
//}]);
//
//function DialogController($scope, $mdDialog, $http) {
//    console.log("Dialog controller");
//    $scope.hide = function() {
//        $mdDialog.hide();
//    };
//    $scope.cancel = function() {
//        $mdDialog.cancel();
//    };
//    $scope.answer = function(answer) {
//        $mdDialog.hide(answer);
//    };
//    $scope.submit = function(){
//
//        $http({
//            method: 'POST',
//            //fill in with API
//            url: '/someUrl'
//        }).then(function successCallback(response) {
//            // this callback will be called asynchronously
//            // when the response is available
//            if (response.status == 200) {
//                //redirect to calendar view logged in
//            }
//        }, function errorCallback(response) {
//            // called asynchronously if an error occurs
//            // or server returns response with an error status.
//            //do we want to have a pop-up message here?
//        });
//
//    }
//}
//
////This provides functionality for the booking window (bookingscreen.html).
////It populates the modal with initial values and allows for incrementing
////and decrementing those values. These values are then to be sent
////to the server on submission to reserve the room.
//function BookingTimeController($scope, $mdDialog) {
//
//    $scope.meetingValues = {
//        people: 2,
//        hours: 1
//    };
//
//    $scope.peopleAdd = function(){
//        $scope.meetingValues.people++;
//    };
//
//    $scope.peopleRemove= function(){
//        $scope.meetingValues.people--;
//    };
//
//    $scope.hourRemove= function(){
//        $scope.meetingValues.hours--;
//    };
//
//    $scope.hourAdd= function(){
//        $scope.meetingValues.hours++;
//    };
//}
//
////This provides functionality in the booking success/failure modals(bookingSuccess.html & bookingFail.html).
////When user clicks OK they will be redirected to the default screen.
//
//function okController ($scope, $location, $mdDialog) {
//    $scope.gotoDefault = function(){
//        console.log("OK is clicked");
//        $location.path('/defaultscreen');
//        $scope.cancel = function() {
//            $mdDialog.cancel();
//        };
//        $mdDialog.cancel();
//    }
//}
>>>>>>> feature_freshstart
