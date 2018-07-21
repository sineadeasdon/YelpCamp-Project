var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
    
mongoose.connect("mongodb://localhost/yelp_camp");

var data = [
    {
        name: "Campy McCamp Camp",
        image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffdbb5e90a2c129258d4540ef0f29d06&auto=format&fit=crop&w=500&q=60",
        description: "Lovely campground for making camp. Dis a place to camp. Lorem ipsum dolor amet biodiesel edison bulb ramps banh mi. Enamel pin banh mi 3 wolf moon vaporware poutine. Sartorial succulents lomo fixie, subway tile swag semiotics small batch vice banjo. Schlitz photo booth narwhal, hella wayfarers copper mug synth gochujang 90's four dollar toast meh. Pop-up chia gluten-free, tacos pok pok meggings hoodie hell of 8-bit cray four dollar toast prism tbh meh. Gentrify celiac brunch deep v, cray single-origin coffee pour-over tattooed cred aesthetic letterpress migas 8-bit. Mustache enamel pin migas selfies helvetica."
    },
    {
        name: "Lord of the Camps",
        image: "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8998dc495eb8297e462e31d15857bd72&auto=format&fit=crop&w=500&q=60",
        description: "All the camping you could ever want. Camp here for many camps. Lorem ipsum dolor amet biodiesel edison bulb ramps banh mi. Enamel pin banh mi 3 wolf moon vaporware poutine. Sartorial succulents lomo fixie, subway tile swag semiotics small batch vice banjo. Schlitz photo booth narwhal, hella wayfarers copper mug synth gochujang 90's four dollar toast meh. Pop-up chia gluten-free, tacos pok pok meggings hoodie hell of 8-bit cray four dollar toast prism tbh meh. Gentrify celiac brunch deep v, cray single-origin coffee pour-over tattooed cred aesthetic letterpress migas 8-bit. Mustache enamel pin migas selfies helvetica."
    },
    {
        name: "Wow Dis Camp",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=500&q=60",
        description: "So much camp. Wow camp. Magic campcamp. Lorem ipsum dolor amet biodiesel edison bulb ramps banh mi. Enamel pin banh mi 3 wolf moon vaporware poutine. Sartorial succulents lomo fixie, subway tile swag semiotics small batch vice banjo. Schlitz photo booth narwhal, hella wayfarers copper mug synth gochujang 90's four dollar toast meh. Pop-up chia gluten-free, tacos pok pok meggings hoodie hell of 8-bit cray four dollar toast prism tbh meh. Gentrify celiac brunch deep v, cray single-origin coffee pour-over tattooed cred aesthetic letterpress migas 8-bit. Mustache enamel pin migas selfies helvetica."
    },
    {
        name: "Campadoodle Doo",
        image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=500&q=60",
        description: "A camptastic place to camp. Lorem ipsum dolor amet biodiesel edison bulb ramps banh mi. Enamel pin banh mi 3 wolf moon vaporware poutine. Sartorial succulents lomo fixie, subway tile swag semiotics small batch vice banjo. Schlitz photo booth narwhal, hella wayfarers copper mug synth gochujang 90's four dollar toast meh. Pop-up chia gluten-free, tacos pok pok meggings hoodie hell of 8-bit cray four dollar toast prism tbh meh. Gentrify celiac brunch deep v, cray single-origin coffee pour-over tattooed cred aesthetic letterpress migas 8-bit. Mustache enamel pin migas selfies helvetica."
    },
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("campgrounds removed!");
    //Add seed data (campgrounds)
            data.forEach(function(seed){
                Campground.create(seed,function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground!");
    //Add seed data (comments)
                        Comment.create(
                            {
                                text: "This campground knows what's up",
                                author: "Campophile"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
