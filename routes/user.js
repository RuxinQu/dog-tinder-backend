const router = require("express").Router();
const { User } = require("../models");
const { upload, removeFileFromS3 } = require("../util/imageHelper");
const { signToken, isLoggedIn } = require("../util/auth");

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

//get all users
router.get("/all", isLoggedIn, async (req, res) => {
  const allUser = await User.find();
  if (!allUser) {
    res.status(404).send({ message: "No user found" });
    return;
  }
  res.status(200).send(allUser);
});

//return a user with a specific id
router.get("/one/:id", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.params.id);
  user
    ? res.status(200).json(user)
    : res.status(404).json({ message: "something went wrong" });
});

//upload profile images
router.post(
  "/upload-imgs",
  isLoggedIn,
  upload.array("imgs", 10),
  async (req, res) => {
    try {
      const files = req.files;
      // Create an array of the uploaded file URLs
      const imgs = files.map((file) => {
        return { original: file.location };
      });
      // Do something with the file URLs, such as storing them in a database or sending them in a response
      res.status(200).send({ imgs });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Error uploading files",
        error: err.message,
      });
    }
  }
);

//remove profile images
router.delete(
  "/delete-img/:key/user/:userId/img/:imgId",
  isLoggedIn,
  removeFileFromS3,
  async (req, res) => {
    // code to delete the image from the database
    const { userId, imgId } = req.params;
    try {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { imgs: { _id: imgId } } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
    }
  }
);

router.put("/add-match", isLoggedIn, async (req, res) => {
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

router.put("/profile/:id", isLoggedIn, async (req, res) => {
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
