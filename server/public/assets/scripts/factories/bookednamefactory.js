
myApp.factory('SharedBookedNameData', ["$http", "dateFilter", function($http, dateFilter) {
    //console.log("In booked name factory");
    var payor = {};
    var data = undefined;
    var formattedData = [];
    var todaysDate = new Date();


    var addHour5pm = {milTime:"17:00", stdTime: "5:00", milsec:todaysDate.setHours(17,0), isBooked:false};
    var addHour515pm = {milTime:"17:15", stdTime: "5:15", milsec:todaysDate.setHours(17,15), isBooked:false};
    var addHour530pm = {milTime:"17:30", stdTime: "5:30", milsec:todaysDate.setHours(17,30), isBooked:false};
    var addHour545pm = {milTime:"17:45", stdTime: "5:45", milsec:todaysDate.setHours(17,45), isBooked:false};




    //hours that room can be booked 8am - 5pm// needs to be 6pm for certain location
    //use milTime for comparing and logic, use stdTime for display on calendar

    var timeArray = [
        {milTime: "08:00", stdTime: "8:00", milsec: todaysDate.setHours(8, 0), isBooked: false},
        {milTime: "08:15", stdTime: "8:15", milsec: todaysDate.setHours(8, 15), isBooked: false},
        {milTime: "08:30", stdTime: "8:30", milsec: todaysDate.setHours(8, 30), isBooked: false},
        {milTime: "08:45", stdTime: "8:45", milsec: todaysDate.setHours(8, 45), isBooked: false},
        {milTime: "09:00", stdTime: "9:00", milsec: todaysDate.setHours(9, 0), isBooked: false},
        {milTime: "09:15", stdTime: "9:15", milsec: todaysDate.setHours(9, 15), isBooked: false},
        {milTime: "09:30", stdTime: "9:30", milsec: todaysDate.setHours(9, 30), isBooked: false},
        {milTime: "09:45", stdTime: "9:45", milsec: todaysDate.setHours(9, 45), isBooked: false},
        {milTime: "10:00", stdTime: "10:00", milsec: todaysDate.setHours(10, 0), isBooked: false},
        {milTime: "10:15", stdTime: "10:15", milsec: todaysDate.setHours(10, 15), isBooked: false},
        {milTime: "10:30", stdTime: "10:30", milsec: todaysDate.setHours(10, 30), isBooked: false},
        {milTime: "10:45", stdTime: "10:45", milsec: todaysDate.setHours(10, 45), isBooked: false},
        {milTime: "11:00", stdTime: "11:00", milsec: todaysDate.setHours(11, 0), isBooked: false},
        {milTime: "11:15", stdTime: "11:15", milsec: todaysDate.setHours(11, 15), isBooked: false},
        {milTime: "11:30", stdTime: "11:30", milsec: todaysDate.setHours(11, 30), isBooked: false},
        {milTime: "11:45", stdTime: "11:45", milsec: todaysDate.setHours(11, 45), isBooked: false},
        {milTime: "12:00", stdTime: "12:00", milsec: todaysDate.setHours(12, 0), isBooked: false},
        {milTime: "12:15", stdTime: "12:15", milsec: todaysDate.setHours(12, 15), isBooked: false},
        {milTime: "12:30", stdTime: "12:30", milsec: todaysDate.setHours(12, 30), isBooked: false},
        {milTime: "12:45", stdTime: "12:45", milsec: todaysDate.setHours(12, 45), isBooked: false},
        {milTime: "13:00", stdTime: "1:00", milsec: todaysDate.setHours(13, 0), isBooked: false},
        {milTime: "13:15", stdTime: "1:15", milsec: todaysDate.setHours(13, 15), isBooked: false},
        {milTime: "13:30", stdTime: "1:30", milsec: todaysDate.setHours(13, 30), isBooked: false},
        {milTime: "13:45", stdTime: "1:45", milsec: todaysDate.setHours(13, 45), isBooked: false},
        {milTime: "14:00", stdTime: "2:00", milsec: todaysDate.setHours(14, 0), isBooked: false},
        {milTime: "14:15", stdTime: "2:15", milsec: todaysDate.setHours(14, 15), isBooked: false},
        {milTime: "14:30", stdTime: "2:30", milsec: todaysDate.setHours(14, 30), isBooked: false},
        {milTime: "14:45", stdTime: "2:45", milsec: todaysDate.setHours(14, 45), isBooked: false},
        {milTime: "15:00", stdTime: "3:00", milsec: todaysDate.setHours(15, 0), isBooked: false},
        {milTime: "15:15", stdTime: "3:15", milsec: todaysDate.setHours(15, 15), isBooked: false},
        {milTime: "15:30", stdTime: "3:30", milsec: todaysDate.setHours(15, 30), isBooked: false},
        {milTime: "15:45", stdTime: "3:45", milsec: todaysDate.setHours(15, 45), isBooked: false},
        {milTime: "16:00", stdTime: "4:00", milsec: todaysDate.setHours(16, 0), isBooked: false},
        {milTime: "16:15", stdTime: "4:15", milsec: todaysDate.setHours(16, 15), isBooked: false},
        {milTime: "16:30", stdTime: "4:30", milsec: todaysDate.setHours(16, 30), isBooked: false},
        {milTime: "16:45", stdTime: "4:45", milsec: todaysDate.setHours(16, 45), isBooked: false}
    ];


    // If location is downtown add an extra  2 hour to the start time
    // 129 is the location id for Downtown , might need to be changed in production to match real location id
    if (localStorage.selectLocation === '129'){
       timeArray.push(addHour5pm);
        timeArray.push(addHour515pm);
        timeArray.push(addHour530pm);
        timeArray.push(addHour545pm);

    }else{
        console.log("not happening bub, this ain't downtown");
    }

    //PRIVATE//////////////////////////////////
    var getCallResponse = function(){
        var todayDate = dateFilter(Date.now(),'yyyy-MM-dd');
        //console.log("In factory, function getCallResponse");
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
            //console.log("in public factory formatted data: ",formattedData);
          return formattedData;
        },
        setCalendarData: function(){
            return data;
        },
        //retrieveTime: function(){
        //    return getTime();
        //},
        setTime: function(){
            return timeArray;
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
