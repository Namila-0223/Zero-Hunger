// import express from "express";
// import cors from "cors";
import 'dotenv/config';
import logger from "./src/utils/logger.js";
import {connect} from "./src/utils/database.connection.js";
import StoreItems from "./src/api/models/store_items.js";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");


const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;
// const port = process.env.port || "8090";

app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));


// app.use(cors());
// app.use(express.json({limit:"20mb"}));

app.get("/", (req, res, next) => {
    res.send("<h1>Welcome</h1>");
    next();
});
///////////////////////////// API FOR REQUESTER DETAILS
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


//-------------------------DONATOR----------------------------

const loginRouter = require("./routes/login");
app.use("/main", loginRouter);

//donator routes
const donatorRoutes = require("./routes/donator/donator.routes.js");
app.use("/donator", donatorRoutes);

//requester
const requesterRoutes = require("./routes/requester.routes");
app.use("/requester", requesterRoutes);

//home routes
const homeRoutes = require("./routes/home.routes");
app.use("/home", homeRoutes);

//-------------------------DONATOR----------------------------

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});


//-------------------------DONATOR----------------------------



















// mongoose.connect(url, {
//   // useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // useFindAndModify: false
// })

// const donaters_register = require('./routes/Donater/Dregister_routes')
// app.use("/donaters_register" , donaters_register);

// app.listen(port, () => {
//     logger.info("this is a test")
//     console.log(`Server is up and running on port ${port}`);
//     connect();
// });


// --------------------------------------------------------------------------------
// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import logger from "./src/utils/logger.js";
// import {connect} from "./src/utils/database.connection.js";
// import RequesterDetails from "./src/api/models/requester_details.js";
// import RequestedItems from "./src/api/models/requested_items.js";

// const app = express();
// const port = process.env.port || "8090";

// app.use(cors());
// app.use(express.json({limit:"20mb"}));

// app.get("/", (req, res, next) => {
//     res.send("<h1>Welcome</h1>");
//     next();
// });
// ///////////////////////////// API FOR REQUESTER DETAILS
// //Get method(retrieve/find method)
// app.get('/requester_details', async (req, res) => {
//     try {
//         const req_details = await RequesterDetails.find({});
//         res.status(200).json(req_details);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// });
// //fetch data from server
// app.get('/requester_details/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const req_details = await RequesterDetails.findById(id);
//         res.status(200).json(req_details);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// });
// //put method (update/edit data)
// app.put('/requester_details/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const req_details = await RequesterDetails.findByIdAndUpdate(id,req.body);
//         //cannot find data in DB
//         if(!req_details){
//             return res.statusCode(404).json({message:`cannot find requester details with ID ${id}`});
//         }
//         const updated_req_details = await RequesterDetails.findByIdAndUpdate(id);
//         res.status(200).json(updated_req_details);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// });
// // delete data from database
// app.delete('/requester_details/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const req_details = await RequesterDetails.findByIdAndDelete(id);
//         if(!req_details){
//             return res.status(404).json({message:`cannot find requester details with ID ${id}`})
//         }
//         res.status(200).json(req_details);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// });
// //post method(crates)

// app.post("/requester_details", async(req, res) => {
//     try{
//         const req_details = await RequesterDetails.create(req.body);
//         res.status(200).json(req_details);
//     }
//     catch(error){
//         console.log(error.message);
//         res.status(500).json({message: error.message})
//     }
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////API FOR REQUESTED ITEMS ////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post("/item_details", async(req, res) => {
//     try{
//         const item_details = await RequestedItems.create(req.body);
//         res.status(200).json(item_details);
//     }
//     catch(error){
//         console.log(error.message);
//         res.status(500).json({message: error.message})
//     }
// });

// //put method (update/edit data)
// app.put('/item_details/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const req_details = await RequestedItems.findByIdAndUpdate(id,req.body);
//         //cannot find data in DB
//         if(!req_details){
//             return res.statusCode(404).json({message:`cannot find requester details with ID ${id}`});
//         }
//         const updated_req_details = await RequestedItems.findByIdAndUpdate(id);
//         res.status(200).json(updated_req_details);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// });
// //fetch data
// app.get('/item_details/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const req_details = await RequestedItems.findById(id);
//         res.status(200).json(req_details);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// });

// // delete data from database
// app.delete('/item_details/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const req_details = await RequestedItems.findByIdAndDelete(id);
//         if(!req_details){
//             return res.status(404).json({message:`cannot find requester details with ID ${id}`})
//         }
//         res.status(200).json(req_details);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// });














// app.listen(port, () => {
//     logger.info("this is a test")
//     console.log(`Server is up and running on port ${port}`);
//     connect();
// });






