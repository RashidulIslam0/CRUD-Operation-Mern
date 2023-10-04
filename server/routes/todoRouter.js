const router = require("express").Router();
const userModel = require("../models/data");

router.get("/", async (req, res) => {
  try {
    const data = await userModel.find({});
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data",
    });
  }
});

// create data || save data in mongo db

//http://localhost:3000/create
/*
    {
        name,
        email,
        mobile
    }
*/
router.post("/create", async (req, res) => {
  console.log(req.body);

  try {
    const data = new userModel(req.body);
    await data.save();

    res.status(201).json({
      success: true,
      message: "Data saved successfully",
      data: data, // Optionally, you can send back the saved data in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while saving data",
    });
  }
});

// update data

//http://localhost:3000/update/id

/**
 * {
 *      id:"",
 *      name:"",
 *      email:"",
 *      mobile:""
 * }
 */
router.put("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newData = req.body; // Assuming req.body contains the new data you want to set

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      newData,
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user data",
    });
  }
});

// delete api
//http://localhost:3000/delete/id
router.delete("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await userModel.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
    });
  }
});

module.exports = router;
