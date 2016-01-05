myApp.factory('SharedTimeData', ["$http", function($http){
    var meetingTime = {};
    var bookedTimeArray = [];

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
        setTimeData: function(hour, timeArray){
            meetingTime = {clickedHour: hour};
            bookedTimeArray = timeArray;
            //console.log("In retrieve, TimeData: ", meetingTime);
        }

    };

    return publicTime;
}]);
