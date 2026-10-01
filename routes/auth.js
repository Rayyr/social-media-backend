const bcrypt =require ("bcrypt");

const express=require("express");
const router=express.Router();
const User=require("../models/User.js");

//sign up
router.post("/register",async(req,res)=>{

    try{

        //generate hashed password
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(req.body.password,saltRounds);
       //create and save user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
   
    });
    res.status(200).json(newUser);
}catch(error){
console.log(error);
}
});

module.exports=router;