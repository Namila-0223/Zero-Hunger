import express from "express";
import cors from "cors";
import 'dotenv/config';



const app = express();
const port = process.env.port || "8090";

app.use(cors());
app.use(express.json({limit:"20mb"}));

app.get("/", (req, res, next) => {
    res.send("<h1>Welcome</h1>");
    next();
});

app.listen(port, () => {
   
    console.log(`Server is up and running on port ${port}`);
});





