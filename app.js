var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); 

var request = require('request');

//routes
app.get("/", async function(req, res){
    
 let parsedData = await getImages("lion");
 
 console.dir("parsedData: " + parsedData);
    
 res.render("index", {"images":parsedData});
            
}); //root route


app.get("/results", async function(req, res){
    
    let keyword = req.query.keyword; //get value ands returns GET method
    
    let parsedData = await getImages(keyword);

    res.render("results", {"images":parsedData});
    
});//route for the results

function getImages(keyword){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=15451226-748d708b832ac6ef8a248a904&q='+keyword,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { // successful request
                
                 let parsedData = JSON.parse(body); //converting string to json 
                 
                 resolve(parsedData);
                
                // let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                // // res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                // res.render("index", {"images":parsedData});
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}

app.get('/error', function(req, res){
   res.render('error'); 
});

// server Listener <-- DO NOT UNCOMMENT -->
// app.listen("8081","127.0.0.1", function(){
// 	console.dir("Express server is Running ...");
// });
// starting server <-- do not uncomment -->

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});


