const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donaters_register = new Schema({

    Name : {
        type : String,
        required : true
    },

    Address :
    {
        type : String,
        required : true
    },

    Email : {
        type : String,
        required : true
    },
    
    ContactNumber : {
        type : String,
        required : true
    },

    Password: {
        type : String,
        required : true
    },
    


})
//send data to the database routes
const donaters_registerSchema = mongoose.model("donaters_register",donaters_register);

module.exports = donaters_registerSchema;
