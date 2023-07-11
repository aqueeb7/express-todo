const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRouter = require("./router/todo")
const userRouter = require("./router/user")
require('dotenv').config


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("process.env.MONGODB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to DB"))
  .catch(console.error)


app.use("/api", todoRouter)
app.use("/api/auth", userRouter)


app.listen(process.env.PORT, () => console.log(`Server Started on localhost:3001`))