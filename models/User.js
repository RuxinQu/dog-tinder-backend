const { Schema, Types, model } = require("mongoose");
const bcrypt = require("bcrypt");
const imageSchema = new Schema({
  url: {
    type: String,
  },
});
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    name: {
      type: String,
    },
    breed: {
      type: String,
    },
    age: {
      type: String,
    },
    size: {
      type: String,
    },
    gender: {
      type: String,
    },
    description: {
      type: String,
    },
    imgs: [imageSchema],
    matches: [String],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
