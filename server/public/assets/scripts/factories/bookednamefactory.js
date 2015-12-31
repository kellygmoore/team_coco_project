
myApp.factory('SharedBookedNameData', ["$http", "dateFilter", function($http, dateFilter) {
    //console.log("In booked name factory");
    var payor = {};
    var data = undefined;


    //PRIVATE//////////////////////////////////
    var getCallResponse = function(){
        var todayDate = dateFilter(Date.now(),'yyyy-MM-dd');
        console.log("In function getCallResponse");
        var startDate= todayDate;
        var endDate= todayDate;
        var locationId=localStorage.selectLocation;
        console.log("this is local storage location id",localStorage.selectLocation);

        var promise = $http({
            method: "GET",
            url: "http://testing.bamboo.cocomsp.com/api/locations/"+locationId+"/meetings?start="+startDate+"&end="+endDate,
            withCredentials: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        }).then(function(response){
                    data = response.data;
                    //console.log("Async data response: ", data);
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
