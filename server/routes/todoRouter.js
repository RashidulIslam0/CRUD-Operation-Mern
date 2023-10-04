const router = require("express").Router();
const User = require("../models/data");

router.get("/", async (req, res) => {
  const data = await User.find({});
  res.json({
    success: true,
    data: data,
  });
});

// create data || save data in mongo db

module.exports = router;
