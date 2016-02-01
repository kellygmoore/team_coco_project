/**
 * Created by samuelmoss on 1/4/16.
 */

myApp.controller('ReserveBookCtrl',['$scope', '$http','$mdDialog','$mdMedia','$location', 'SharedTimeData', 'SharedBookedNameData', 'dateFilter', 'TimeOut',
    function($scope,$http,$mdDialog,$mdMedia, $location, SharedTimeData, SharedBookedNameData, dateFilter, TimeOut){

    //console.log("we are in the RBC");
    //RESERVEBOOK SCREEN
    //SharedTimeData is a factory that holds start time selected with ng-click by the user on the calendar view
    TimeOut.endTimer();

    $scope.sharedTimeData = SharedTimeData;
    $scope.sharedBookedName = SharedBookedNameData;
    $scope.allStartTimes = $scope.sharedBookedName.setTime();
    $scope.meetingTimesArray = undefined;
    $scope.cleanArray = undefined;
    $scope.cleanEndArray = undefined;
    $scope.meetingDuration = '.25';
    $scope.clickedHour = $scope.sharedTimeData.retrieveStartTime();
    console.log("here's clickedHour:", $scope.clickedHour);
    $scope.showHoursMethod = true;
    $scope.showHoursAndChargeMethod = false;
    $scope.showChargeMethod = false;

    //$scope.selectEndTime = null;
    var startTime = {};
    var endTime = {};

    //Pulls the room capacity from the shared time factory for use in limiting the room attendance.
    var roomCapacity = $scope.sharedTimeData.retrieveCapacity();
    $scope.stageArray = [];

    var startIndex = 0;

    $scope.updateMeetingTimeData = function(){
        //console.log("step 2");
        $scope.sharedBookedName.retrieveBambooData()
            .then(function(){
                $scope.meetingTimesArray = undefined;
                $scope.meetingTimesArray = $scope.sharedBookedName.setBambooData();
                //$scope.meetingTimeSwitch();
                //console.log("Here is the booked data: ", $scope.meetingTimesArray);
            }
        );
    };

    var startTimeSet = function() {
        var currentHour = parseInt(dateFilter(Date.now(), 'HH'));
        var currentMinute = parseInt(dateFilter(Date.now(), 'mm'));
        switch (true) {
            case (currentMinute > 0 && currentMinute < 15):
                currentMinute = 15;
                break;
            case(currentMinute >= 15 && currentMinute < 30):
                currentMinute = 30;
                break;
            case(currentMinute >= 30 && currentMinute < 45):
                currentMinute = 45;
                break;
            case(currentMinute >= 45):
                currentMinute = 0;
                currentHour++;
                break;
        }
        startTime.hour = currentHour;
        startTime.minute = currentMinute;
    };

    startTimeSet();

    var endTimeSet = function(){
        endTime.minute = 0;
        if(localStorage.selectLocation == 129){
            endTime.hour = 6
        } else {
            endTime.hour = 5;
        }
    };

    endTimeSet();

    //console.log("start time: ", startTime);
    //console.log("end time: ", endTime);


    if ($scope.meetingTimesArray == undefined) {
        $scope.updateMeetingTimeData();
    }

    //The following populates the dropdown menus on the reserveBookScreen

   //The cleanStartTime function takes passes in the array of all available times for the room
    //It takes out anytimes that are booked and makes a new array called cleanArray
    //The cleanArray is used to display the available start times of a meeting

    var cleanStartTime = function(dirtyArray){
        $scope.cleanArray = [];
        dirtyArray.map(
            function(obj){
                 //TURN BACK ON AT START OF DAY
                 if((obj.milsec > Date.now()) && (obj.isBooked === false)){
                 //   if((obj.isBooked === false)){
                    $scope.cleanArray.push(obj);
                }
            }
        );
        return $scope.cleanArray;
    };

    //function thisMeeting(){
    //    var durationMilliseconds;
    //    durationMilliseconds = ($scope.data.selectEndTime.milsec) - ($scope.data.selectStartTime.milsec);
    //    $scope.meetingDuration = ((durationMilliseconds)/3600000).toString();
    //    console.log("This meeting is", $scope.meetingDuration, "long");
    //};
    //
    //$scope.updateMeetingInfo = thisMeeting;

    // uses side-effects to properly init $scope.cleanEndArray
    function initializeCleanEndArray(){
        $scope.cleanEndArray = [];
        var fullClickedHourObject = findClickedHour(cleanArray, $scope.clickedHour);
        searchForStart($scope.allStartTimes, fullClickedHourObject);
        buildArray($scope.allStartTimes);

        //thisMeeting();

    }


    //The cleanEndTime function creates an array of available End Times on page load
    //based on the start time selected in the drop down
    $scope.cleanEndTime = initializeCleanEndArray;


    var findClickedHour = function(array, clickedhour){
        for(var i= 0; i < array.length; i++){
            if(array[i].milTime === clickedhour) {
                return array[i];
            }
        }
        console.log("uh oh");
    };

    var searchForStart = function(basicArray, availableTimeInfo) {

        //console.log("$scope.data.selectStartTime", $scope.data.selectStartTime);
        for (var i = 0; i < basicArray.length; i++) {
            //console.log("milsec value in index ", i, " of basic array=", basicArray[i].milsec);
            //console.log("Index basicArray index 18", basicArray[18]);

            if ((basicArray[i].milsec) === (availableTimeInfo.milsec)) {
                console.log("I made a match!");
                startIndex = i;

            }
        }
    };

        //console.log("this is start index", startIndex);

        //This buildArray function loops through an array based on the startIndex point established above
        //Start Index is the index point of the selectedStartTime
        //The loop will create a new array of objects

    var buildArray = function(basicArray){
        console.log("This is start index:", startIndex);
        for(var i = (startIndex + 1); i<basicArray.length; i++){
            if(basicArray[i].isBooked===false){
                $scope.cleanEndArray.push(basicArray[i]);
            }else{
                $scope.cleanEndArray.push(basicArray[i]);
                //break;
            }
        }
        console.log("this is cleanEndArray", $scope.cleanEndArray);

    };
        //The cleanEndTimeUpdate is called on the ng-change of the start time drop down
        //It's job is to update the End Time dropdown display.

        $scope.cleanEndTimeUpdate = function(){
            $scope.cleanEndArray = [];
            searchForStart($scope.allStartTimes,$scope.data.selectEndTime);
            buildArray($scope.allStartTimes);
            console.log("In cleanEndTimeUpdate", $scope.data.selectEndTime);
        };


    var cleanArray = cleanStartTime($scope.allStartTimes);
    console.log("Here's cleanArray", cleanArray);


    console.log("about to init cleanEndArray on initial load");
    initializeCleanEndArray();
    console.log("finished init-ing cleanEndArray on initial load", $scope.cleanEndArray);

    //This is the model used for the start time & attendance dropdown menu
    $scope.data = {
        cleanArray: cleanArray,
        selectStartTime: findClickedHour(cleanArray, $scope.clickedHour),
        selectEndTime: $scope.cleanEndArray[0],
        availableEndTime: $scope.cleanEndArray,
        selectAttendance: null,
        availableCapacity: $scope.stageArray
    };

        //CAPACITY OBJECT
        var constructCapacityObject = function(){
            for(var i = 2; i <= roomCapacity; i++){
                $scope.attendObject = {};
                $scope.attendObject.attendees = (i).toString();
                $scope.stageArray.push($scope.attendObject);
            }
        };
        constructCapacityObject();
        console.log("here is room cap: ", roomCapacity);
        console.log("here is stage array: ", $scope.stageArray);

        $scope.memberDataArray = {};

        if($scope.sharedTimeData.setMemberData() === undefined){
            $scope.sharedTimeData.retrieveMemberData()
                .then(function() {
                    $scope.memberDataArray = $scope.sharedTimeData.setMemberData();
                    console.log("In controller retrieve member: ", $scope.memberDataArray);
                    $scope.memberAvailableHour = $scope.memberDataArray.remainingIncludedHours;
                    console.log("memberavailablehour: ", $scope.memberAvailableHour);
                });
        } else {
            $scope.memberDataArray = $scope.sharedTimeData.setMemberData();
            console.log("response back (in else controller): ", $scope.memberDataArray);
        }

        $scope.thisMeeting = function(){

            $scope.sharedTimeData.setConfirmedMeetingTimes($scope.data.selectStartTime.milsec, $scope.data.selectEndTime.milsec);
            console.log("This meeting is", $scope.meetingDuration, "long");
            var durationMilliseconds;
            var chargeByHour = 25;
            durationMilliseconds = ($scope.data.selectEndTime.milsec) - ($scope.data.selectStartTime.milsec);
            $scope.meetingDuration = (((durationMilliseconds)/3600000));
            console.log("meetingDuration: ", $scope.meetingDuration);

            if($scope.memberAvailableHour === 0){
                $scope.showHoursMethod = false;
                $scope.showChargeMethod = true;
                $scope.paymentDue = chargeByHour * $scope.meetingDuration;
                //$scope.showHoursAndChargeMethod = false;
            } else if($scope.memberAvailableHour < $scope.meetingDuration){
                $scope.showHoursMethod = false;
                $scope.showHoursAndChargeMethod = true;
                $scope.paymentDue = formatPrice(chargeByHour * ($scope.meetingDuration - $scope.memberAvailableHour));
            }

            $scope.balance = $scope.memberAvailableHour - $scope.meetingDuration;
            console.log("balance: ", $scope.balance);
            console.log("payment due", $scope.paymentDue);
        };

        //This function pulls in the price and formats it $DD.cc.
        var formatPrice = function(price){

        };

    //THIS CONTROLS THE BOOKING SUMMARY DIV ON RESERVEBOOK VIEW

    $scope.nevermind = function(){
        $location.path("/defaultscreen");
    };
    $scope.goback = function(){
        $location.path("/bookingscreen");
    };



        //// Post call to book room for the selected amount of time
        $scope.bookThatMeeting = function (memberId,startTime,endTime,numOfAttendees){
            console.log("is this the start time?",$scope.data.selectStartTime.milTime);
            console.log("is this the end time?",$scope.data.selectEndTime.milTime);
            console.log("is this the end time?",$scope.data.selectAttendance.attendees);


            ////Create the book Room Variables
            //// Start and end Times need to be in 24 hours
            var startDate = dateFilter(Date.now(),'yyyy-MM-dd');
            var startTime= $scope.data.selectStartTime.milTime +":00";
            var endDate = dateFilter(Date.now(),'yyyy-MM-dd');
            var endTime=$scope.data.selectEndTime.milTime + ":00";
            var meetingRoomId = localStorage.selectRoomId;
            var numOfAttendees=$scope.data.selectAttendance.attendees;
            var description="Request made from room Tablet";
            var personId = $scope.sharedTimeData.setMemberData().memberId;

            console.log("is this the start time?",startTime);
            console.log("is this personid?",personId);
            console.log("is this the end time?",$scope.data.selectAttendance.attendees);
            console.log("is this memberdata?", $scope.sharedTimeData.setMemberData().memberId);

            $http({
                method: "POST",
                url: "http://testing.bamboo.cocomsp.com/api/meetings",
                data: "startDate="+ startDate +"T"+startTime+"&endDate=" +endDate+"T" +endTime+ "&meetingRoomId="
                +meetingRoomId+"&numOfAttendees=" +numOfAttendees+ "&description="+description+ "&personId="+ personId,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }).then(function successCallback(ev) {
                console.log("hey it works");



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





                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                console.log("Nopes");
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });



        };



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





}]);


//jason@foundrymakes.com / 64W955Aq

//jason.spidle@gmail.com / LxLiWyE2





