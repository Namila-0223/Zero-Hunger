import express from "express";
import cors from "cors";
import 'dotenv/config';
import logger from "./src/utils/logger.js";
import {connect} from "./src/utils/database.connection.js";
import StoreItems from "./src/api/models/store_items.js";

const app = express();
const port = process.env.port || "8090";

app.use(cors());
app.use(express.json({limit:"20mb"}));

app.get("/", (req, res, next) => {
    res.send("<h1>Welcome</h1>");
    next();
});
///////////////////////////// API FOR STORE DETAILS
//Get method(retrieve/find method)
app.get('/store_items', async (req, res) => {
    try {
        const store_items = await StoreItems.find({});
        res.status(200).json(store_items);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.get('/store_items/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const store_items = await StoreItems.findById(id);
        res.status(200).json(store_items);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
//put method (update/edit data)
app.put('/store_items/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const store_items = await StoreItems.findByIdAndUpdate(id,req.body);
        //cannot find data in DB
        if(!store_items){
            return res.statusCode(404).json({message:`cannot find requester details with ID ${id}`});
        }
        const updated_store_items = await StoreItems.findByIdAndUpdate(id);
        res.status(200).json(updated_store_items);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
// delete data from database
app.delete('/store_items/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const store_items = await StoreItems.findByIdAndDelete(id);
        if(!store_items){
            return res.status(404).json({message:`cannot find item details with ID ${id}`})
        }
        res.status(200).json(store_items);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
//post method(crates)

app.post("/store_items", async(req, res) => {
    try{
        const store_items = await StoreItems.create(req.body);
        res.status(200).json(store_items);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

















app.listen(port, () => {
    logger.info("this is a test")
    console.log(`Server is up and running on port ${port}`);
    connect();
});






