const router = require("express").Router();
const { Message } = require("../models");

router.post("/add-message", async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    newMessage
      ? res.status(201).send({ message: "message sent successfully" })
      : res.status(400).send({ message: "failed to send message" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/one", async (req, res) => {
  const { fromId, receiveId } = req.query;
  try {
    const messagesFromOne = await Message.find({
      fromUser: fromId,
      toUser: receiveId,
    });
    messagesFromOne
      ? res.status(200).send(messagesFromOne)
      : res.status(404).send({ message: "something went wrong" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
