//////*****CONTROLLER FOR MODAL WINDOWS: LOGIN/SUCCESSFUL BOOK & FAILED TO BOOK

myApp.controller('AppCtrl', ['$scope', '$mdDialog', '$mdMedia', '$location', function($scope, $mdDialog, $mdMedia, $location){

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
        });
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


    //Modal displays if booking is successful
    $scope.bookingSuccess = function(ev) {
        console.log("show success booking");
        $mdDialog.show({
            controller: okController,
            templateUrl: 'assets/views/routes/bookingSuccess.html',
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

    //Modal if booking fails
    $scope.bookingFail = function(ev) {
        console.log("show fail booking");
        $mdDialog.show({
            controller: okController,
            templateUrl: 'assets/views/routes/bookingFail.html',
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
    };

    $scope.hourRemove= function(){
        $scope.meetingValues.hours--;
    };

    $scope.hourAdd= function(){
        $scope.meetingValues.hours++;
    };
}

//This provides functionality in the booking success/failure modals(bookingSuccess.html & bookingFail.html).
//When user clicks OK they will be redirected to the default screen.

function okController ($scope, $location, $mdDialog) {
    $scope.gotoDefault = function(){
        console.log("OK is clicked");
        $location.path('/defaultscreen');
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $mdDialog.cancel();
    }
}