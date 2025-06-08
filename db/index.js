const mongoose = require("mongoose");

require("dotenv").config(); // Load environment variables from .env

// Connect to MongoDB using the connection string from the .env file
mongoose
  .connect(
    process.env.MONGO_URI
    //     {
    //     useNewUrlParser: true, //to use new parse since mongodb 3x used a old one , 5x uses new
    //     useUnifiedTopology: true, // for better connectivity and consistency
    //   }
  )
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
