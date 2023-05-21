import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RequestedItemsSchema = Schema({
    Full_name:{
        type: String,
        required: true
    },
    Requested_Item:{
        type: String,
        required: true
    },
    Item_Code:{
        type: String,
        required: true
    },
    Quantity:{
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true
    }
},
{
    timestamps: true,
}


)
const RequestedItems = mongoose.model('RequestedItems',RequestedItemsSchema)
export default RequestedItems;