
myApp.factory('SharedBookedNameData', ["$http", function($http) {
    console.log("In booked name factory");
    var payor = {};


    //PRIVATE
    var getMember = function(){
        payor = {
            id: 99999,
            firstName: "Santa",
            lastName: "Claus"
        };
        console.log("Payor: ", payor);
    };

//PUBLIC
    var publicBookedName = {
        retrieveBookedName: function () {
            return payor;
        },
        setBookedName: function () {
            return getMember();
        }
    };
    return publicBookedName;
}]);
