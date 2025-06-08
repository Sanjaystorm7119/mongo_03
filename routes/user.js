const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { mongo, default: mongoose } = require("mongoose");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  //check if user exists
  const exisitingUser = await User.findOne({ username });
  if (exisitingUser) {
    res.json({ msg: "user already exists" });
  } else {
    await User.create({
      username: username,
      password: password,
      // username,
      // password, // same as above if the keys are of same name
    });
    res.json({
      message: "User created Successfully",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  res.json({ allCourses: allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: { purchasedCourses: courseId },
    }
  );
  res.json({ message: "Purchase Complete" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
