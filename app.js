const express = require("express");
const app = express();
// app.set("view engine", "ejs");
app.use(express.static("public")); 

const request = require('request');

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
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}

// starting server <-- do not uncomment -->

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("RUnning express Server ... ");
});


