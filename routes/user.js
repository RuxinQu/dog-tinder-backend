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

router.get("/all", async (req, res) => {
  const allUser = await User.find();
  if (!allUser) {
    res.status(404).send({ message: "No user found" });
    return;
  }
  res.status(200).send(allUser);
});

router.get("/one/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  user
    ? res.status(200).json(user)
    : res.status(404).json({ message: "something went wrong" });
});

router.put("/add-match", async (req, res) => {
  const { myId, yourId } = req.query;
  const newUser = await User.findByIdAndUpdate(
    myId,
    { $addToSet: { matches: yourId } },
    { new: true }
  );
  newUser
    ? res.status(200).json(newUser)
    : res.status(404).json({ message: "something went wrong" });
});

router.put("/profile/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    user
      ? res.status(200).send(user)
      : res.status(400).send({ message: "Something went wrong" });
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
});

module.exports = router;
