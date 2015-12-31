myApp.factory('SharedTimeData', ["$http", function($http){
    var meetingTime = {};

    //console.log("In room factory");
    //PRIVATE
    //var timeData = {
    //    meetingTime: ""
    //};

    //PUBLIC
    var publicTime = {
        retrieveTimeData: function(){
            console.log("In retrieve, TimeData: ", meetingTime);

            return meetingTime.clickedHour;
        },
        setTimeData: function(hour){
            meetingTime = {clickedHour: hour};
            console.log("In retrieve, TimeData: ", meetingTime);
        }

    };

    return publicTime;
}]);
