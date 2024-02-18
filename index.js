require("dotenv").config();
const express = require("express");
const app = express();
const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());

const cors = require("cors");
app.use(cors());



app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
  console.log("Server Start");
});
