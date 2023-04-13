import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RequesterDetailsSchema = new Schema({
    Full_name:{
        type: String,
        required: true
    },
    ID_No:{
        type: String,
        required: true
    },
    Email_Address:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    Phone_Number:{
        type: String,
        required: true
    }
},
{
    timestamps: true,
}


) 
const RequesterDetails = mongoose.model('RequesterDetails',RequesterDetailsSchema)
export default RequesterDetails;