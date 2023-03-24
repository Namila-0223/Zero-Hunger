const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donaterprofile = new Schema({

    Name : {
        type : String,
        required : true
    },
     
    email : {
        type : String,
        required : true
    },

    ContactNumber : {
        type : String,
        required : true
    },

    address: {
        type : String,
        required : true
    },

    password: {
        type : String,
        required : true
    },


    
})
//send data to the database//routes
const profileSchema = mongoose.model("donaterprofile",donaterprofile);

module.exports = profileSchema;