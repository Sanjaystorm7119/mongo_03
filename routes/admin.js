const { Router } = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  //check if Admin exists
  const exisitingAdmin = await Admin.findOne({ username });
  if (exisitingAdmin) {
    res.json({ msg: "user already exists" });
  } else {
    await Admin.create({
      username: username,
      password: password,
      // username,
      // password, // same as above if the keys are of same name
    });
    res.json({
      message: "Admin created Successfully",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  //use Zod for better validation
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  res.json({ msg: "course Created", courseId: newCourse._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  res.json({ allCourses: allCourses });
});

module.exports = router;
