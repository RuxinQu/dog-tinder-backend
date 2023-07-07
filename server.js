const express = require("express");
const app = express();
const db = require("./db/connection");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(port, () => {
    console.log(`server is listening to port ${port}!`);
  });
});
