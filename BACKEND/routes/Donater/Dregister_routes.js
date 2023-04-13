var express = require("express");
var router = express.Router();
const { id } = require("date-fns/locale");
const bcrypt = require('bcryptjs');
let donaters_register = require("../../models/Donater/Dregister_model");
// let profile = require("../../model/register/profile_model");

 //create data implementation - exception handling

 router.post("/addDonater",async function (req, res) {
    const Name = req.body.Name;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const ContactNumber = req.body.ContactNumber;
    const Password = req.body.Password;
   
    

    const newDonaterRegister = new donaters_register({
        Name,
        Address,
        Email,
        ContactNumber,
        Password
    
        
    });

     await newDonaterRegister.save().then(() => {
         res.json("Registration Success!");
     }).catch((err) => {
         console.log(err);
         res.json("Registration Failed!");
     })
});

//log in
router.route('/login').post((req, res, next) => {
  var Email = req.body.Email;
  var Password = req.body.Password;

  systemReg.findOne({$or: [{Email:Email}]})
  .then(systemreg =>{
      if(systemreg){
              bcrypt.compare(Password, systemreg.Password, function(err, result){
                  if(err){
                      res.json({
                          error:err
                      })
                  }
                  if(result){
                      console.log(err);
                      res.json({
                          message: true
                      })      
                  }else{
                      console.log(err);
                       res.json({
                          message: false
                      })    
                  }
              })

      }else{
          res.json({
              message: false
          })
      }
  })
});


//update data in the database
router.put("/update/:id", async function (req, res){
    let userId = req.params.id;
    const{
        Name,
        Address,
        Email,
        ContactNumber,
        password } = req.body;

    const updatedonaters_register = {
        Name,
        Address,
        Email,
        ContactNumber,
        password,
    
    }

    donaters_register.findByIdAndUpdate(userId, updatedonaters_register).then(() =>{
        res.status(200).send({status: "User Updated Success!"})

    }).catch((err) => {
        console.log(err);
        res.status(403).send({status: "Error with updating data"});
    })

})

//read implementaion
router.get("/",async(req,res)=> {

    await donaters_register.find(id)
    .then((donaters_registers)=> res.json(donaters_registers))
    .catch((err)=> res.status(403).json(
        {
            success : false,
            message : err,
            payload: {}
        }
        ));
});

//fecth
// router.get("/get/:id",async(req,res) => { // get data from frontend via request. async function is used to increase the performance 
//     let userId = req.params.id; //fetch the id parameter in url

//   await donaters_register.findById(userId).exec(function(err,result){
//     if(err){
//         res.json({"err":"Something went wrong"})
//     } else{
//         res.json({donater:result})
//     }
  
//   }) //pass two parameters(userid,object that store seller data) and find user by id and update relevent data
  

// })

//delete data implementation from database
router.delete("/delete/:id", async (req, res) => {
    let userId = req.params.id;

    await donaters_register.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted Success!"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleted", error:err.message});
    })
})

// fetch/read data of one user only
router.get("/get/:id",async (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    const user = await donaters_register.findById(userId)
    .then(() => {
        res.status(200).send({status: "user fetched", user: user})
    }).catch(() => {
        res.status(500).send({status: "Error with get user"});
    })
})



module.exports = router;
