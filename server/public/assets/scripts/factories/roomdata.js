myApp.factory('SharedRoomData', ["$http", function($http){
    var meetingRoom = undefined;

    //console.log("In room factory");
    //PRIVATE
    var roomData = function() {
         meetingRoom = {
            id: 2,
            name: "The Library",
            location: {
                id: 129,
                name: "Minneapolis, Downtown",
                code: "MPLS_DT"
            },
            maxOccupancy: 10,
            hourlyCost: 25,
            calendarHeaderClassName: "mpls-dt-library"
        };
        //console.log("MeetingRoom Private: ", meetingRoom);
    };


    //PUBLIC
    var publicRoom = {
        retrieveRoomData: function(){
            //console.log("In retrieve, meetingRoom: ", meetingRoom);
            return meetingRoom;
        },
        setRoomData: function(){
            //console.log("In roomData");
            return roomData();
        }

    };

    return publicRoom;
}]);
