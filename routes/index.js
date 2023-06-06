const router = require("express").Router();
const userRouter = require("./user");

router.use("/user", userRouter);
router.use("*", (req, res) => {
  res.send("<h1>bad request</h1>");
});

module.exports = router;
