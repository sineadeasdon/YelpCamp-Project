var express     = require("express"), 
    bodyParser  = require("body-parser"),
    app         = express(),
    mongoose    = require("mongoose"),
    request     = require("request"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", function(req, res){
   res.render("landing"); 
});

//INDEX - Display all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
        console.log(err);
        } else {
        res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});  

//NEW - Display form to add new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

//CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res){
    console.log(req);
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}; 
    // Add newCampground to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
        console.log(err);
        } else {
        res.redirect("/campgrounds");
        }
    });
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//====================
//COMMENT ROUTES
//====================

//Render comment form
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Add comment to show page
app.post("/campgrounds/:id/comments", function(req, res){
   Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server is running");
});