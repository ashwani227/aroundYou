// Declaring and defining node variables

var express = require("express"),
    app = express(),
    mongoose = require("mongoose");
var geo = require('geolocation');
app.set("view engine","ejs");
app.use("/js",express.static("js"))
app.use("/myIcons",express.static("myIcons"))

//Initialising empty list
l1 = [];

//Connecting to local database using Mongo
mongoose.connect("mongodb://localhost/local",{ useNewUrlParser: true });

//Defining schema for the database
var dataSchema = new mongoose.Schema({
    Name: String,
    Latitude : String,
    Longitude : String,
    Type : String,
    Opening_time:String,
    Closing_time : String,
    Rating:String
})

//creating a variable to access Mongo Database from Javascript file
var dataValue = mongoose.model("test",dataSchema);

//Default route
app.get("/",function(req,res){
    res.render("index")
})

//Declaration of lists for table data and graph data
dist_list=[]
cat_list = []
position2=[];

//Route when user hit "sub" path
app.get("/sub",function(req,res){
  dist_list=[]
  cat_list = []
  //Accessing current location's co-ordinates sent by Index file
  position2 = [req.query.latitude,req.query.longitude]
  //Max_dist is the maximum distance upto which data will be shown. 
  var max_dist = parseInt(req.query.distance);
  //Accessing Rating parameter.
  var rating_parameter = parseFloat(req.query.rate);
  //Accessing time value from the user.
  var opening = req.query.opening;
  if(opening==""){

    opening = "Current Time"
  }
  //Hard coded categories of the dataset
  categories = ["Attraction","Ball Diamond","Cricket Field","Playground","Public Library","Soccer Field","Track Sports Field"]
  number_of_categories=[]

  //Changing current time value to simple format
  if((opening[1]=="Current Time")||(opening=="Current Time")){
  var today = new Date();
var opening = today.getHours() + ":" + today.getMinutes() 
}

//Changing time input to float values
opening_array = opening.split(":")
opening_array[0]=parseInt(opening_array[0])
opening_array[1]=parseInt(opening_array[1])
   //Calling database with the dataValue variable
   dataValue.find({},function(err,values){
            if(err){
                console.log("Error");
            }
            else{
                //Assigning data fetched by database to a list

                 l1 = values; 
                for(var i=0;i<l1.length;i++){
                  //getting latitude and longitude of each of the place in database
                  position1 = [(l1[i]).get("Latitude"),(l1[i]).get("Longitude")]
                  //Calculating distance between 2 positions
                  dist = distance(position1,position2)

                  //Changing opening and closing time from database to same format as of input format
                  open_time = (l1[i].get("Opening_time")).split(":")
                  close_time = (l1[i].get("Closing_time")).split(":")
                  open_time[0] = parseInt(open_time[0])
                  open_time[1] = parseInt(open_time[1])              
                  close_time[0] = parseInt(close_time[0])
                  close_time[1] = parseInt(close_time[1])

                  //Filtering the data values.
                  if(dist <= max_dist){

                    if(open_time<=opening_array && close_time>=opening_array&& parseFloat(l1[i].get("Rating"))>=rating_parameter){
                    //dist_list will contain all the data
                    dist_list.push(l1[i])
                    //cat_list will contain all the category types of fetched data
                    cat_list.push(l1[i].get("Type"))
                    }
                   }
}
  //Initialising count variables
  count_cat1=0
  for(var j=0;j<cat_list.length;j++){
    if((cat_list[j]=="Arena")||(cat_list[j]=="Recreation")||(cat_list[j]=="Outdoor Pool"))
    {
      count_cat1+=1
    }
  } 
  number_of_categories[0]=count_cat1
  for(var i=1;i<7;i++)
      {
      count_cat = 0
      for(var j=0;j<cat_list.length;j++)
      {
        if((categories[i]==cat_list[j]))
          {
          count_cat+=1
          }
      } 
      number_of_categories[i]=count_cat
      }
                
            }
          }).sort({Rating:-1});

//Rendering another html page
 setTimeout(function(){ res.render("index",{dist_list:dist_list,cat_list:number_of_categories,categories:categories,position2:position2}
  ); }, 1000);
})

//Calculate distance function
function distance(position1,position2)
		{
			var R = 6371;
			var lat1 = parseFloat(position1[0]);
			var lon1 = parseFloat(position1[1]);
			var lat2 = parseFloat(position2[0]);
			var lon2 = parseFloat(position2[1]);
			   
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1); 
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

var server = app.listen(3000, function() {
    console.log('Ready on port %d', server.address().port);
});