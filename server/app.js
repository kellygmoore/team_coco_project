/**
 * Created by kellygarskemoore on 12/10/15.
 */

var express = require('express');
var app = express();
var path = require('path');


//App Set//
app.set("port", process.env.PORT || 5000);


app.get('/*', function(req, res){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get("port"), function(){
    console.log("Listening on port:", app.get("port"));

});

