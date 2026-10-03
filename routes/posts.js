const express = require("express");
const Post = require("../models/Post.js");

const router = express.Router();

//create a post
router.post("/create", async (req, res) => {
  try {
    const newPost = await new Post(req.body).save();
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//update post
router.put("/update/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("the post has been updated");
    } else {
      return res.status(403).json("you can only update your post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});


//delete post
router.delete("/delete/:id",async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("the post has been deleted");
    } else {
      return res.status(403).json("you can only delete your post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});


//like/dislike a post
router.put("/like/:id",async(req,res)=>{

    try{

        const post =await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            return res.status(200).json("The post has been liked");
        }else {
            await post.updateOne({$pull:{likes:req.body.userId}});
            return res.status(200).json("the post has beem disliked");
        }
    }catch(error){
         return res.status(500).json(error); 
    }
});


//get a post
router.get("/get-post/:id",async(req,res)=>{

    try{

        const post=await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch(error){
        return res.status(500).json(error);
    }
});
module.exports = router;
