myApp.factory('SharedTimeData', ["$http", function ($http) {

    //PRIVATE
    var meetingTime = {};
    var bookedTimeArray = [];
    var roomCapacity;
    var memberId, memberName;
    var memberData = undefined;
    var memberMeetingData = undefined;
    var confirmedMeetingTimesObject = {};

    var getMemberResponse = function () {
        return $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/me",
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        })
    };


    var getMemberData = function (id) {
        return $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/members/" + id + "/meetingRoomHours",
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        });
    };

    //PUBLIC
    var publicTime = {
        retrieveStartTime: function () {
            console.log("In retrieve, TimeData: ", meetingTime);
            return meetingTime.clickedHour;
        },
        retrieveBookedTimes: function () {
            console.log("bookedTimeArray: ", bookedTimeArray);
            return bookedTimeArray;
        },
        retrieveCapacity: function () {
            return roomCapacity;
        },
        retrieveConfirmedMeetingTimes: function(){
            return confirmedMeetingTimesObject;
        },
        setTimeData: function (hour, timeArray, capacity) {
            meetingTime = {clickedHour: hour};
            bookedTimeArray = timeArray;
            roomCapacity = capacity;
            //console.log("In retrieve, TimeData: ", meetingTime);
        },
        setConfirmedMeetingTimes: function(startTime, endTime){
            confirmedMeetingTimesObject.startTime = startTime;
            confirmedMeetingTimesObject.endTime = endTime;
        },
        retrieveMemberData: function () {
          return getMemberResponse()
                .then(function (response) {
                    memberData = response.data;
                    console.log("In factory, here is memberdata: ", memberData);
                    memberId = (memberData.id).toString();
                    memberName = memberData.firstName;
                    return getMemberData(memberId)
                        .then(function (response) {
                            memberMeetingData = response.data;
                            console.log("TOP membermeetingdata: ", memberMeetingData);
                            return memberMeetingData;
                        });
                }
            );
        },
        setMemberData: function () {
            console.log("BOTTOM membermeetingdata: ", memberMeetingData);
            return memberMeetingData;
        }

    };

    return publicTime;
}]);
