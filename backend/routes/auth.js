const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
//To validate email,password and name.
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");

//Route:1 Create a user using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("email", "Please enter a valid email.").isEmail(),
    body("password", "Password must be atleast 8 characters.").isLength({
      min: 8,
    }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    //send the error if there are any.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check if the user with same email already exists.
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry, user with this email already exists.",
          });
      }
      //To secure user from get hacked.
      let salt = await bcrypt.genSalt(10);
      let secpass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      //to authenticate the user for next time login
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).send("Internal server error.");
    }
  }
);
//Route:2 Authenticate a user using POST "/api/auth/login". No login required.
router.post(
  "/login",
  [
    body("email", "Please enter a valid email.").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //send the error if there are any.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    //check if the user with entered email exists.
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry, please try to login with correct credentials.",
          });
      }
      //To compare the entered password with user password
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry, please try to login with correct credentials.",
          });
      }

      //to allow the user to get loggedin
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);
//Route:3 Get loggedin user details using POST "/api/auth/getuser". login required.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});
module.exports = router;
