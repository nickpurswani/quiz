var request = require("request");
var express = require("express");

const { parse } = require('querystring')
var app = express();
var HTTP_PORT = 8000;
var data;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    request('https://opentdb.com/api.php?amount=10', function(error , response , body){
        if( !error && response.statusCode == 200 ){
            data = JSON.parse(body);
           
           res.render("index.ejs",{data:data.results}); 

        }
    });
    
});
app.post("/res",(req,res)=>{
    console.log(req.body);
    res.render("result.ejs",{res:req.body});
});
app.listen(process.env.PORT || HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

