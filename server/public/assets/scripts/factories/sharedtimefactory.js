myApp.factory('SharedTimeData', ["$http", function($http){
    var meetingTime = {};
    var bookedTimeArray = [];
    var roomCapacity;

    //PUBLIC
    var publicTime = {
        retrieveStartTime: function(){
            console.log("In retrieve, TimeData: ", meetingTime);
            return meetingTime.clickedHour;
        },
        retrieveBookedTimes: function(){
            console.log("bookedTimeArray: ", bookedTimeArray);
            return bookedTimeArray;
        },
        retrieveCapacity: function(){
            return roomCapacity;
        },
        setTimeData: function(hour, timeArray, capacity){
            meetingTime = {clickedHour: hour};
            bookedTimeArray = timeArray;
            roomCapacity = capacity;
            //console.log("In retrieve, TimeData: ", meetingTime);
            return meetingTime;
        }

    };

    return publicTime;
}]);
