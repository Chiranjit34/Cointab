const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
