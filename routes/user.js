const router = require("express").Router();
const { User } = require("../models");
const { signToken } = require("../util/auth");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = await User.create({ email, password });
      !newUser
        ? res.status(404).send({ message: "Failed to find the user" })
        : res.status(200).send({ token: signToken(newUser), user: newUser });
    } else {
      res.status(400).send({ message: "This email already exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "No user with this email found" });
      return;
    }
    const checkPw = await user.isCorrectPassword(password);
    if (!checkPw) {
      res.status(404).send({ message: "Incorrect password" });
      return;
    }
    const token = signToken(user);
    res.status(200).send({ token, user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
