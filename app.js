//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");

mongoose.set('strictQuery',true);
 
//connect to MongoDB by specifying port to access MongoDB server
mongoose.connect('mongodb+srv://Abhinav121vashisht:0121DAv%3F%29@cluster0.zwhtp6r.mongodb.net/blogsDB').then(
  () => { 
     console.log("Connected to DB!");
 },
  err => { 
    console.log(err);
 }
);
//create a SCHEMA that sets out the fields each document will have and their datatypes
const postSchema = new mongoose.Schema ({
	title: String, 
	content: String
});
 
//create a MODEL
const Post = new mongoose.model ("Post", postSchema)

 

 



const homeStartingContent = "Publish your passions ,your way. Create a unique and beautiful blog easily.";
const aboutContent = "Platform where  we will provide you only interesting content, which you will like very much. We're dedicated to providing you the best of Blogs  with a focus on dependability ,where people can write blogs";
const contactContent = "Email us at abc@gmail.com with any question or inquiries or call us at 89xx10xx11.We would be happy to answer your questions and set up a meeting with you.Feel free to contact us";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
  Post.find({},function(err,posts)
  {
      res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });    
  });
  // res.render("home", {
  //   startingContent: homeStartingContent,
  //   posts: posts
  //   });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  //create a DOCUMENT
const post = new Post ({
	title: req.body.postTitle,
	content: req.body.postBody
});
post.save(function(err){
  if(!err)
  {
    res.redirect("/");
  }
});
});
app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });

app.listen(3001, function() {
  console.log("Server started on port 3000");
});
