const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Welcome to world best online QR_Weds booking by swati technical using router"
      );
  } catch (error) {
    console.log(error);
  }
};

// user registration logic

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, phone, password } = req.body;

    const userExist = await User.findOne({ phone });

    if (userExist) {
      return res.status(400).json({ message: "This phone number already exists" });
    }

    // hash the password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({ username, phone, password });

    res
      .status(201)
      .json({
        msg: "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    // res.status(500).json("internal server error");
    next(error);
  }
};

// user login logic

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const userExist = await User.findOne({ phone });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res
        .status(200)
        .json({
          msg: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
    } else {
      res.status(401).json({ message: "Invalid phone no. or password" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// *-------------------
// User Logic
// *-------------------

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login, user };
