const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const PORT = 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://databse:databse@cluster0.0uvlwtl.mongodb.net/test-db"
    );
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");

    console.log(error.message);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send("Hello Wordl");
});
app.get("*", (req, res) => {
  res.status(404).send("<h1>404 Not found</h1>");
});

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDB();
});
