const { Schema, Types, model } = require("mongoose");

const messageSchema = new Schema(
  {
    fromUser: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    toUser: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timeSent: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
const Message = model("Message", messageSchema);

module.exports = Message;
