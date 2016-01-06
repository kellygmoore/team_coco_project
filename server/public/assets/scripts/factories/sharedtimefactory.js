myApp.factory('SharedTimeData', ["$http", function($http){

    //PRIVATE
    var meetingTime = {};
    var bookedTimeArray = [];
    var roomCapacity;

    //var getMemberResponse = function(){
    //
    //    var promise = $http({
    //        method: "GET",
    //        url: "http://testing.bamboo.cocomsp.com/api/me,
    //        withCredentials: true,
    //        headers: {
    //            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    //        }
    //    }).then(function(response){
    //        data = response.data;






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
        },
        retrieveMemberData: function(){
            return memberData;
        },
        setMemberData: function(){
            return getMemberResponse();
        }

    };

    return publicTime;
}]);
