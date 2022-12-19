const mongoose = require("mongoose");


// CREATING A DATABASE

const weather_databaseSchema = new mongoose.Schema({
    
    username:{
        type: String,
        required: true
    }, 

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },  

    confirm_password:{
        type: String,
        required: true
    }
})


// CREATING A COLLECTION

const Register = new mongoose.model("Register", weather_databaseSchema);

// EXPORT

module.exports = Register;