const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

//update user
router.put("/update/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    //in case there is a password in req.body so we nust hash it
    if (req.body.password) {
      try {
        const saltRounds = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
      );
      return res.status(200).json("account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});


//delete user
router.delete("/delete/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
  

    try {
      const user = await User.deleteOne({_id:req.params.id});
      return res.status(200).json("account has been deleted");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
}); 


//get a user 
router.get("/:id",async(req,res)=>{
    try{

        const user=await User.findById({_id:req.params.id}).select("-password -isAdmin");
         return res.status(200).json(user);
    }catch(error){
        return res.status(500).json(error);
    }
});

module.exports = router;
