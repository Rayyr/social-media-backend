const express=require("express");
const router=express.Router();


//update user
router.put("/",(req,res)=>{
    res.status(200).send("wellcome to users home page");
});



module.exports=router;