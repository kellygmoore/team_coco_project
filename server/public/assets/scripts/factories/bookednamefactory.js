
myApp.factory('SharedBookedNameData', ["$http", function($http) {
    //console.log("In booked name factory");
    var payor = {};
    var data = undefined;


    //PRIVATE//////////////////////////////////
    var getCallResponse = function(){
<<<<<<< HEAD
        console.log("In function getCallResponse");
        var startDate="2015-12-18";
        var endDate="2015-12-18";
        var locationId="129";
=======

        var startDate="2015-12-17";  //this will need to be today's date
        var endDate="2015-12-17";   //this will need to be today's date
        var locationId="130";
>>>>>>> d387bba3ee3d501d545ae37ed20a27cb010eaa46

        var promise = $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/locations/"+locationId+"/meetings?start="+startDate+"&end="+endDate,
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        }).then(function(response){
                    data = response.data;
<<<<<<< HEAD
                    console.log("Async data response: ", data);
=======
                    //console.log("Async data response: ", data);
>>>>>>> d387bba3ee3d501d545ae37ed20a27cb010eaa46
                });
        return promise;
    };

//PUBLIC
    var publicBookedName = {
        retrieveBambooData: function(){
            return getCallResponse();
        },
        setBambooData: function(){
            //console.log("data: ", data);
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
