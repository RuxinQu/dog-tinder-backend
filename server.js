const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
