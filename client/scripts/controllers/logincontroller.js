myApp.controller('LoginCtrl', ["$scope", "$http", "$location", function($scope, $http, $location){

    $scope.submit = function() {
        //Create the log in Variables
        //var emailAddress= 'bsmalls@iremote.com';
        //var password='t4h7pvWt';
        //var data = {};

        //var modEmail = emailAddress.replace("@", "%40");
        //console.log("modemail: ", modEmail);

        //$scope.authorize = function() {
            //Create the log in Variables
            var emailAddress= 'bsmalls@iremote.com';
            var password='t4h7pvWt';

            $http({
                method: "POST",
                url: "http://testing.bamboo.cocomsp.com/api/signIn",
                data: "emailAddress=" + emailAddress + "&password=" + password,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }).success(
                function( response ) {
                    console.log("this is the auth response", response);
                }
            );
        };

    //    $http({
    //        method: "GET",
    //        url: "http://testing.bamboo.cocomsp.com/api/me",
    //        withCredentials: true,
    //        data: "emailAddress=" + emailAddress + "&password=" + password,
    //        headers: {
    //            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    //    }
    //}).then(function(response){
    //    data = response.data;
    //    console.log("Here is response call to api/me", data);
    //    });


    //    $http({
    //        method: "POST",
    //        url: "http://testing.bamboo.cocomsp.com/api/signIn",
    //        withCredentials: true,
    //        data: "emailAddress=" + emailAddress + "&password=" + password,
    //        headers: {
    //            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    //        }
    //    }).success(
    //        function(response) {
    //            $http({
    //                method: "GET",
    //                url: "http://testing.bamboo.cocomsp.com/api/me",
    //                withCredentials: true,
    //                data: "emailAddress=" + emailAddress + "&password=" + password,
    //                headers: {
    //                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    //                }
    //            }).then(function(response){
    //                data = response.data;
    //                console.log("Here is response after successful login and call to api/me", response);
    //            })
    //        }
    //    );
    //};

    //emailAddress=bsmalls%40iremote.com&password=t4h7pvWt

}]);