/**
 * Created by Zeo on 12/11/15.
 */

//create factory that allows the data  selected from the config file to persist throughout the
myApp.factory('ConfigDataService' , function() {

    //this data populates the select option fields for the config file
     var data = {
        selectLocation: null,
        availableLocations: [
            {id: '1', name: 'COCO Location A'},
            {id: '2', name: 'COCO Location B'},
            {id: '3', name: 'COCO Location C'}
        ],
        selectRoom: null,
        availableRooms: [
            {id: '11', name: 'Option Room 1'},
            {id: '12', name: 'Option Room 2'},
            {id: '13', name: 'Option Room 3'}
        ],
        calenderTimeout: null,
        bookingTimeout: null,
        resultsTimeout: null
    };

    return data;
// Collect data input from what users selects
// push information into factory
// Still need to reroute when the button is clicked

    //
    //var saveSettings=function(){
    //
    //    ConfigDataService = $scope.data;
    //
    //
    //    console.log("selectlocation",$scope.data.selectLocation);
    //    console.log("Select Room",$scope.data.selectRoom);
    //    console.log("calendar time out",$scope.data.calendarTimeout);
    //};
});