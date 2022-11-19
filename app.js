const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

    const firstName = req.body.fname; 
    const lastName = req.body.lname;
    const email = req.body.email;

    var data = {
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }  
        }     
      ]
    };

    var jsonData = JSON.stringify("data");
    const url = "https://us21.api.mailchimp.com/3.0/lists/bb699cc8dc"

    const options = {
        method : "POST",
        auth: "sumit2:104978902f6b50cc312de1a69b9fc0fc-us21"
    }

   const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }

          response.on("data", function(data){
            console.log(JSON.parse(data));
          });
    });

    request.write(jsonData);
    request.end();

});

app.listen(3000, function(){
    console.log("server is running on port 3000");
});


// 104978902f6b50cc312de1a69b9fc0fc-us21
// bb699cc8dc.