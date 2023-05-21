import express from "express";
import cors from "cors";
import 'dotenv/config';
import logger from "./src/utils/logger.js";
import {connect} from "./src/utils/database.connection.js";
import RequesterDetails from "./src/api/models/requester_details.js";
import RequestedItems from "./src/api/models/requested_items.js";

const app = express();
const port = process.env.port || "8090";

app.use(cors());
app.use(express.json({limit:"20mb"}));

app.get("/", (req, res, next) => {
    res.send("<h1>Welcome</h1>");
    next();
});
///////////////////////////// API FOR REQUESTER DETAILS
//Get method(retrieve/find method)
app.get('/requester_details', async (req, res) => {
    try {
        const req_details = await RequesterDetails.find({});
        res.status(200).json(req_details);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
//fetch data from server
app.get('/requester_details/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const req_details = await RequesterDetails.findById(id);
        res.status(200).json(req_details);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
//put method (update/edit data)
app.put('/requester_details/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const req_details = await RequesterDetails.findByIdAndUpdate(id,req.body);
        //cannot find data in DB
        if(!req_details){
            return res.statusCode(404).json({message:`cannot find requester details with ID ${id}`});
        }
        const updated_req_details = await RequesterDetails.findByIdAndUpdate(id);
        res.status(200).json(updated_req_details);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
// delete data from database
app.delete('/requester_details/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const req_details = await RequesterDetails.findByIdAndDelete(id);
        if(!req_details){
            return res.status(404).json({message:`cannot find requester details with ID ${id}`})
        }
        res.status(200).json(req_details);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
//post method(crates)

app.post("/requester_details", async(req, res) => {
    try{
        const req_details = await RequesterDetails.create(req.body);
        res.status(200).json(req_details);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////API FOR REQUESTED ITEMS ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/item_details", async(req, res) => {
    try{
        const item_details = await RequestedItems.create(req.body);
        res.status(200).json(item_details);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

//put method (update/edit data)
app.put('/item_details/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const req_details = await RequestedItems.findByIdAndUpdate(id,req.body);
        //cannot find data in DB
        if(!req_details){
            return res.statusCode(404).json({message:`cannot find requester details with ID ${id}`});
        }
        const updated_req_details = await RequestedItems.findByIdAndUpdate(id);
        res.status(200).json(updated_req_details);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
//fetch data
app.get('/item_details/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const req_details = await RequestedItems.findById(id);
        res.status(200).json(req_details);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// delete data from database
app.delete('/item_details/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const req_details = await RequestedItems.findByIdAndDelete(id);
        if(!req_details){
            return res.status(404).json({message:`cannot find requester details with ID ${id}`})
        }
        res.status(200).json(req_details);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});














app.listen(port, () => {
    logger.info("this is a test")
    console.log(`Server is up and running on port ${port}`);
    connect();
});






