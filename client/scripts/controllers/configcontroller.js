/**
 * Created by Zeo on 12/11/15.
 */
myApp.controller('ConfigController', ["$scope","$http","$location","TimeOut", function($scope,$http,$location,TimeOut) {
    //console.log("config controller" );

    TimeOut.endTimer();




    $scope.selectLocation= null;
    $scope.selectRoom=null;

    getLocations();



// Runs when user selects a location. calls for the rooms of that specific location
    $scope.locationSelected = function(){


            getRooms($scope.selectLocation);
            //$scope.rooms = $scope.data.availableRoom[$scope.data.selectLocation];

            //console.log("this is selected location", $scope.selectLocation);

    };
////Runs when user selects room
//    $scope.roomSelected = function(hello){
//
//
////        //$scope.rooms = $scope.data.availableRooms[$scope.data.selectLocation];
//        console.log("this is selected room object",$scope.selectRoom.id);
//        console.log("this is whats comming in", hello);
//
////        console.log("this is selected room id",$scope.selectRoom.id);
////        console.log("this is selected room Name",$scope.selectRoom.name);
//    };

//** *Whenever the Submit and Save Setting buttons is click the results are stored on to local storage on the browser*/
//    this way the other page views can use that information to make calls to the API
//    It also converts seconds to milliseconds so we utilize the time out functions across all views
    $scope.saveSettings = function(){
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.selectLocation=$scope.selectLocation;
            localStorage.selectRoomId=$scope.selectRoom.id;
            localStorage.selectRoomName=$scope.selectRoom.name;

            localStorage.calendarTimeout=convertSecondsToMs($scope.data.calendarTimeout);
            localStorage.boookingTimeout=convertSecondsToMs($scope.data.bookingTimeout);
            localStorage.resultsTimeout=convertSecondsToMs($scope.data.resultsTimeout);


            // The $timeout() method calls a function or evaluates an expression after a specified number of milliseconds.
            // function that sends users back to the default page
            // We need to set the set-time-out function to their appropriate pages and pull the time frame from the local storage of the browser

            $location.path("/defaultscreen");
            //Tip: 1000 ms = 1 second.

        } else {
           console.log("here is localStorage",localStorage.selectLocation);
        }

        //console.log("selectlocation",$scope.data.selectLocation);
        //console.log("Select Room",$scope.data.selectRoom);
        //console.log("calendar time out",$scope.data.calendarTimeout);
    };


    // The $timeout() method calls a function or evaluates an expression after a specified number of milliseconds.
    // function that sends users back to the default page
    // We need to set the set-time-out function to their appropriate pages and pull the time frame from the local storage of the browser

    //$timeout(function(){$location.path("/defaultscreen"); }, localStorage.calendarTimeout);
    //Tip: 1000 ms = 1 second.

    //convert seconds to ms
    function convertSecondsToMs(sec){
        var ms= sec* 1000;
        return ms;
    };





/// GET LOCATIONS Information from BAMBOO API
    function getLocations(){


        $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/locations ",
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        }).success(function( response ) {



                $scope.availableLocation=response;
                //console.log("location respone", $scope.availableLocation);



            }
        );

    };


/// GET Room Ids Information from BAMBOO API
    function getRooms(locationid){



    var locationId=locationid;

        console.log("this is locationID", locationId);
        $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/locations/"+locationId+"/meetingRooms",
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        }).then(function successCallBack( response ) {


                $scope.availableRoom=response.data;
                //console.log("room response", response.data);
            },
            function errorCallback(response){
                console.log("not working");
            });

    };



    /// GET Member  Information from BAMBOO API

    $scope.callMe = function(){
        $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/me ",
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        }).success(function( response ) {



                console.log("whats me",response);
                //console.log("location respone", $scope.availableLocation);



            }
        );

    };









}]);



