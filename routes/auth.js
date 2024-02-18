const router = require("express").Router();
const { User, List } = require("../db");
const jwt = require("jsonwebtoken");
const { CreateSignUp } = require("../types");
const jwttoken = "jsonwebtoken";

//SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validation with zod
    const parsedPayload = CreateSignUp.safeParse(req.body);
    if (!parsedPayload.success) {
      res.status(411).json({
        msg: `${parsedPayload.error.message}`,
      });
      return;
    }

    const token = jwt.sign(password, jwttoken);
    // console.log(token);
    const user = new User({ email, username, password: token });
    await user
      .save()
      .then(() => res.status(200).json({ mesaage: "Sign up successfull" }));
  } catch (error) {
    
    res.status(200).json({message : "User already Exists"});
  }
});

//SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).json({message : "Please Sign Up"});
      return;
    }

    // console.log(user.password);
    const convertedPAssword = jwt.verify(user.password, jwttoken);
    // console.log(convertedPAssword);
    const isPasswordCorrect = req.body.password == convertedPAssword;

    if (!isPasswordCorrect) {
      res.status(200).json({message : "Password is not correct"});
      return;
    }

    // to extract password from document remaining into other object
    const { password, ...others } = user._doc;
    res.status(200).json({ others });

  } catch (error) {
    res.status(200).json({message : `${error.mesaage}`});
  }

});

module.exports = router;
