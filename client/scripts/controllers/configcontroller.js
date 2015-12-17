/**
 * Created by Zeo on 12/11/15.
 */
myApp.controller('ConfigController', ["$scope","$http","$location","$timeout", function($scope,$http,$location,$timeout) {
    console.log("config controller" );
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

//** *Whenever the Submit and Save Setting buttons is click the results are stored on to local host*/
    $scope.saveSettings = function(){
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
// Allows us to accesss the test API // Need to be signed in online for it to work http://testing.bamboo.cocomsp.com As well calling the auth in the code before getting any information
    $scope.authorize = function() {
        //Create the log in Variables
        var emailAddress= 'bsmalls@iremote.com';
        var password='t4h7pvWt';

        $http({
            method: "POST",
            url: "http://testing.bamboo.cocomsp.com/api/signIn",
            data: "emailAddress=" + emailAddress + "&password=" + password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }).success(
            function( response ) {
                console.log("this is the auth response", response);
            }
        );
    };
// This will get all the meetings booked for this specific location  . We Need to filter so we get the specific room  that is choosen
    $scope.getRoomsTest = function() {
        var startDate="2015-12-17";
        var endDate="2015-12-17";
        var locationId="129";

        //GET some meetings
        $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/locations/"+locationId+"/meetings?start="+startDate+"&end="+endDate,
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        }).success(function( response ) {
                console.log("This is meeting room response", response);
            }
        );
    };

// This will sign us out of the test server // used to sort of reset// remember to log back in
    $scope.signOut = function (){
        $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/signOut"
        }).success(function( response ) {
                console.log("this is GET SignOut  response", response);
            }
        );

    };


// Books room  based off of the meeting room id. I'm assuming this is unique
    $scope.bookRoom = function() {
        //Create the book Room Variables
        // Start and end Times need to be in 24 hours
        var startDate= "2015-12-17";
        var startTime= "14:00:00";
        var endDate="2015-12-17";
        var endTime="14:30:00";
        var meetingRoomId="1";
        var numOfAttendees="3";
        var description="Post Request from Development Code Prime";
        var personId="19455";




        $http({
            method: "POST",
            url: "http://testing.bamboo.cocomsp.com/api/meetings",
            data: "startDate="+ startDate +"T"+startTime+"&endDate=" +endDate+"T" +endTime+ "&meetingRoomId="
                    +meetingRoomId+"&numOfAttendees=" +numOfAttendees+ "&description="+description+ "&personId="+ personId,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }).success(
            function( response ) {
                console.log("this is bookingroom response", response);
            }
        );
    };

    //POST https://members.explorecoco.com/api/meetings
    //startDate - booking start date and time, formatted as YYYY-MM-DDTHH:mm:ss
    //example: 2015-12-04T16:30:00
    //endDate - booking end date and time, formatted as YYYY-MM-DDTHH:mm:ss
    //meetingRoomId - meeting room ID
    //numOfAttendees - number of people attending the meeting
    //description - description of booking (i.e. name for meeting)
    //personId - ID of the person creating the booking




// Edit a meeting already book. This is dependant on the bookingID


    $scope.editMeetingRoomBooking = function() {
        //Create the book Room Variables
        // Start and end Times need to be in 24 hours
        var bookingId="107";
        var startDate= "2015-12-17";
        var startTime= "14:00:00";
        var endDate="2015-12-17";
        var endTime="15:30:00";
        var meetingRoomId="1";
        var numOfAttendees="3";
        var description="Post  Update Request from Development Code Prime";



        $http({
            method: "POST",
            url: "http://testing.bamboo.cocomsp.com/api/meetings/"+bookingId,
            data: "&startDate="+ startDate +"T"+startTime+"&endDate=" +endDate+"T" +endTime+ "&meetingRoomId="
            +meetingRoomId+"&numOfAttendees=" +numOfAttendees+ "&description="+description,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }).success(
            function( response ) {
                console.log("this is EDIT bookingroom response", response);
            }
        );
    };



    //
    //    URL Parameters
    //bookingId - ID of the booking
    //
    //Form URL-Encoded
    //startDate - booking start date and time, formatted as YYYY-MM-DDTHH:mm:ss
    //example: 2015-12-04T16:30:00
    //endDate - booking end date and time, formatted as YYYY-MM-DDTHH:mm:ss
    //meetingRoomId - meeting room ID
    //numOfAttendees - number of people attending the meeting
    //description - description of booking (i.e. name for meeting)

// Get Member Meeting Room Hours
// NEED PERSON ID
    $scope.getMemberMeetingRoomHours = function() {

        var personId="19455";

        //GET some meetings
        $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/members/"+personId+"/meetingRoomHours",
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        }).success(function( response ) {
                console.log("Member meeting room Hours  response", response);
            }
        );
    };

    //GET https://members.explorecoco.com/api/members/personId/meetingRoomHours
    //URL Parameters
    //personId - ID of the person








}]);



