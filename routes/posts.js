const express=require("express");
const Post=require("../models/Post.js");

const router=express.Router();


//create a post
router.post("/create",async(req,res)=>{

    
    try{
        const newPost=await new Post(req.body).save();
   return res.status(200).json(newPost); 
    }catch(error){
        return res.status(500).json(error);
    }
});

module.exports=router;