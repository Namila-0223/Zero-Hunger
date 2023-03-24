var express = require("express");
var router = express.Router();
const { id } = require("date-fns/locale");
const profile = require("../../models/Donater/Dprofile_model");

//update data in the database
router.put("/update/:id", async function (req, res){
    let userId = req.params.id;
    const{
        Name,
        address,
        email,
        ContactNumber,
        password } = req.body;

    const updatedonaterprofile = {
        Name,
        address,
        email,
        ContactNumber,
        password
    }

    donaterprofile.findByIdAndUpdate(userId, updatedonaterprofile).then(() =>{
        res.status(200).send({status: "User updated", user: update})

    }).catch((err) => {
        console.log(err);
        res.status(403).send({status: "Error with updating data"});
    })

})

router.get("/get/:id",async(req,res) => { // get data from frontend via request. async function is used to increase the performance 
    let userId = req.params.id; //fetch the id parameter in url

     await Donater_register.findById(userId) //pass two parameters(userid,object that store seller data) and find user by id and update relevent data
    .then(() => {
        res.json("Donater Registration Success!");
     }).catch((err) => {
         console.log(err);
         res.json("Donater Registration Failed!");
     })

})

router.get("/getdonater" , async(req,res)=>{
    const students= await profile.find({} , err , result=>{
        if(err){
            res.status(500).send({msg:"err"})
        }else{
            res.status(200).send({"data":result})
        }
    })
})


module.exports = router;