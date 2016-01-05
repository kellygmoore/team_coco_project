
myApp.factory('SharedBookedNameData', ["$http", "dateFilter", function($http, dateFilter) {
    //console.log("In booked name factory");
    var payor = {};
    var data = undefined;
    var formattedData = [];


    //PRIVATE//////////////////////////////////
    var getCallResponse = function(){
        var todayDate = dateFilter(Date.now(),'yyyy-MM-dd');
        console.log("In factory, function getCallResponse");
        var startDate= todayDate;
        var endDate= todayDate;
        var locationId=localStorage.selectLocation;
        //console.log("this is local storage location id",localStorage.selectLocation);

        var promise = $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/locations/"+locationId+"/meetings?start="+startDate+"&end="+endDate,
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        }).then(function(response){
                    data = response.data;
                    dataDefault = response.data;

            //This function searches through all the meeting for the locations, feature_default_screen_logic
            //pulls out all those which are for the room the tablet has been configured to,
            //Then formats them as numbers and pushes them to the meetingTimesArray for later use.
            var updateMeetingTimesArray = function(){
                formattedData = [];
                dataDefault.map(
                    function(obj) {
                        if(obj.meetingRoom.id === parseInt(localStorage.selectRoomId)){
                            var meetTimeObj = {};
                            meetTimeObj.start = {};
                            meetTimeObj.end = {};
                            var startTime = new Date(obj.startDate);
                            var endTime = new Date(obj.endDate);
                            meetTimeObj.startTime = startTime.getTime();
                            meetTimeObj.endTime = endTime.getTime();
                            meetTimeObj.elapse = meetTimeObj.endTime - meetTimeObj.startTime;
                            meetTimeObj.start.hour = parseInt(obj.startDate.slice(11, 13));
                            meetTimeObj.start.minute = parseInt(obj.startDate.slice(14, 16));
                            meetTimeObj.end.hour = parseInt(obj.endDate.slice(11, 13));
                            meetTimeObj.end.minute = parseInt(obj.endDate.slice(14, 16));
                            formattedData.unshift(meetTimeObj);
                        }
                    }
                );
            };
              updateMeetingTimesArray();
                });
        return promise;
    };

//PUBLIC
    var publicBookedName = {
        retrieveBambooData: function(){
            return getCallResponse();
        },
        setBambooData: function(){
            console.log("in public factory formatted data: ",formattedData);
          return formattedData;
        },
        setCalendarData: function(){
            return data;
        }
        //retrieveBookedName: function () {
        //    return payor;
        //},
        //setBookedName: function () {
        //    return getMember();
        //}
    };
    return publicBookedName;
}]);
