myApp.controller('LoginCtrl', ["$scope", "$http", "$location", function($scope, $http, $location){

    $scope.loginSubmit = function() {
        //Create the log in Variables
        var emailAddress= 'kwest@iremote.com';
        var password='foobarbaz';

        var modEmail = emailAddress.replace("@", "%40");
        //console.log("modemail: ", modEmail);
        $http({
            method: "POST",
            url: "http://testing.bamboo.cocomsp.com/api/signIn",
            withCredentials: true,
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

    //emailAddress=bsmalls%40iremote.com&password=t4h7pvWt


}]);