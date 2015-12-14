/**
 * Created by kellygarskemoore on 12/10/15.
 */
myApp.controller('TimeCtrl', ["$scope", "$timeout", function($scope, $timeout) {
    var d = new Date();
    $scope.dateNow = d.toDateString();
    $scope.timeNow = d.toLocaleTimeString();

    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms

    var tick = function() {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);








    }]);

myApp.controller('AppCtrl', ['$scope', '$mdDialog', '$mdMedia', function($scope, $mdDialog, $mdMedia){

$scope.status = '  ';

$scope.customFullscreen = $mdMedia('sm');

$scope.showLogin = function(ev) {
    console.log("show advanced");
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'assets/views/routes/dialog1.tmpl.html',
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
//$scope.showTabDialog = function(ev) {
//    $mdDialog.show({
//        controller: DialogController,
//        templateUrl: 'tabDialog.tmpl.html',
//        parent: angular.element(document.body),
//        targetEvent: ev,
//        clickOutsideToClose:true
//    })
//        .then(function(answer) {
//            $scope.status = 'You said the information was "' + answer + '".';
//        }, function() {
//            $scope.status = 'You cancelled the dialog.';
//        });
//};
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
