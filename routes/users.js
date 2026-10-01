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
      const user = await User.deleteOne({ _id: req.params.id });
      return res.status(200).json("account has been deleted");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }).select(
      "-password -isAdmin",
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//follow user
router.put("/follow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); //user to be followed
      const currentUser = await User.findById(req.body.userId); //user who make follow process

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        return res.status(200).json("user has been followed");
      } else {
        return res.status(403).json("you already follow this user");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you cant follow yourself");
  }
});
module.exports = router;
