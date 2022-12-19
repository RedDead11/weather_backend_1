const express = require("express"); // import express module
const path = require("path");
const hbs = require("hbs");

const app = express(); // app has all the method/properties of express
//DataBase Connection
mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/weather_database');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})


// API Implementation-------------------------------

// const https = require("https");
// const { STATUS_CODES } = require("http");

// const apiKey = "150c8e70337ea4249f64e127ec906f48";
// const location = "Lahore";
// const api =
//   "https://api.openweathermap.org/data/2.5/weather?q=" +
//   location +
//   "&appid=" +
//   apiKey;

// app.get("/", function (req, res) {
//   https.get(api, function (response) {
//     console.log(response.statusCode); // Check connection
//   });

//   res.send("api thingy working ?");
// });

// -------------------------------------------------



const Register = require("./models/user_register");
const exp = require("constants");

const port = process.env.PORT || 3000; // Port not local

// PATHS
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.get("/login", (req, res) => {
  res.render("login.hbs");
});

app.get("/ContactUs", (req, res) => {
  res.render("ContactUs.hbs");
});

app.get("/register", (req, res) => {
  res.render("register.hbs");
});


// Create a new user in our database
app.post("/register", async (req, res) => {

    try {

      const password  = req.body.password;
      const cpassword = req.body.confirm_password;

      if(password === cpassword)
      {
        const registerEmployee = new Register({

          username: req.body.username,
          email: req.body.email,
          password: password,
          confirm_password: cpassword

        })

        const registered = await registerEmployee.save();
        res.status(201).render(index);

      }
      else
      {
        res.send("Invalid Password");
      }
      
    } catch (error) {
        res.status(400).send(error);
    }
    	db.collection('userOne').insertOne(registerEmployee,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
		
	//return res.render('signup_success.ejs');
});


// handling contact functionality
app.post('/ContactUs', function(req,res){
	var name = req.body.name;
	var message = req.body.message;
	var email =req.body.email;
	

	var data = {
		"name": name,
    "email": email,
		"message":message
		
	}

db.collection('contactus').insertOne(data,function(err, collection){  // find one
	if (err) throw err;
	console.log("feedback inserted Successfully");
		  
});

// return res.render('feedback_success.ejs');
})



app.post('/login', function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	
	

db.collection('register').findOne({username:username}, {password:password},function(err, collection){  // find one
	if (err) throw err;
	console.log("Login Success");
		  
});

   return res.render('login_success.hbs');
})

app.listen(port, () => {
  console.log("Server running at port: " + port);
});