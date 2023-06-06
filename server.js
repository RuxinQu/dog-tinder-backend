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

db.once("open", () => {
  app.listen(port, () => {
    console.log(`server is listening to port ${port}!`);
  });
});
