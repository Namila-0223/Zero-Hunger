import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StoreItemsSchema = Schema({
    Full_name:{
        type: String,
        required: true
    },
    Store_Item:{
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
    InDate:{
        type: String,
        required: true
    },
    ExpireDate:{
        type: String,
        required: true
    },

},
{
    timestamps: true,
}


)
const StoreItems = mongoose.model('StoreItems',StoreItemsSchema)
export default StoreItems;