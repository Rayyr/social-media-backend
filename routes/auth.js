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



//login
router.post("/login",async(req,res)=>{

    try{

        const user=await User.findOne({email:req.body.email});
   
        if(!user){
            res.status(404).json( "Invalid credentials , there is no assiciated user with this email");
            
        }

        const isPasswordMatch=await bcrypt.compare(req.body.password,user.password);
        if(isPasswordMatch){
            res.status(200).json({message:"logged in succefully",user});
        }
       else  res.status(400).json( "Invalid credentials , wrong password");


    }catch(error){
        console.log(error);
    }
});
module.exports=router;