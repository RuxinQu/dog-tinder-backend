const router = require("express").Router();
const userRouter = require("./user");
const messageRouter = require("./message");

router.use("/user", userRouter);
router.use("/message", messageRouter);

router.use("*", (req, res) => {
  res.send("<h1>bad request</h1>");
});

module.exports = router;
