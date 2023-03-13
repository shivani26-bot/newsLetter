// jshint esversion:6

const express= require("express");
const bodyParser=require("body-parser");
const request =require("request");
const app=express();
const https=require("https");



// in order to tell our app to use bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
  const firstName= req.body.fname;
  const lastName= req.body.lname;
  const email= req.body.email;
  // console.log(firstName, lastName, email);
   const data={
     members:[
       {
         email_address:email,
         status: "subscribed",
         merge_fields:{
           FNAME:firstName,
           LNAME:lastName
         }
       }
     ]
   }
   const jsonData=JSON.stringify(data);
   const url="https://us21.api.mailchimp.com/3.0/lists/89799a764c";
   const options ={
     method: "POST",
     auth :"shivani1:97e6c5f36c9a61cde28b89025459f78e-us21"
   }
  const request= https.request(url,options,function(response){
    // if(response.statusCode===200){
    //   res.send("Successfully subscribed!");
    // }
    // else{
    //   res.send("There was an error with signing up, please try again!");
    // }
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

     response.on("data",function(data){
       console.log(JSON.parse(data));
     });
   });
   request.write(jsonData);
   request.end();
});


// in order to when we click try again button on failure it should bring us back to the main page or home homeroute
app.post("/failure", function(req,res){
  res.redirect("/");
});





// API Key to authenticate ourselves with their servers
// 6efdc6562d63606fd47f5cb2c006eab3-us10
// 8e55eaffc4a9e37fc822709e9f70f28a-us10
// 036e2f3cdee97b5b2284b2acd4e9582a-us21
// Audience id or list id that helps mailchimp to identify the list you want to put your subscribers into
// cff25d5361
 // 89799a764c





// app.listen(port.env.PORT||3000,function(){
//   console.log("Server started on port 3000");
// });

const port=process.env.PORT|| 3000;
app.listen(process.env.PORT|| 3000,function(){
  console.log(`Server is started on port ${port}`);
});


