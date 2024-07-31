const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer ", "").trim();
  console.log("JWT Token Received:", jwtToken);

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded);

    const phoneNumber = decoded.phone;
    console.log("Phone Number from Token:", phoneNumber);

    const userData = await User.findOne({ phone: phoneNumber }).select("-password");
    console.log("User Data Found:", userData);

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    console.log("Error Verifying Token:", error.message);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;