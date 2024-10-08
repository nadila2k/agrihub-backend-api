const User = require("../models/userModel");
const createSendToken = require("../service/createSendToken");

const signIn = async (req, res) => {
  console.log("Sign in");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    if (user) {
      createSendToken(user, 200, 'Sign in successful!', res);
    } else {
      throw new Error("Error when user sign-in");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

const signUp = async (req, res, next) => {
  console.log("Sigin up");
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      district,
      phoneNumber,
      role,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !district ||
      !phoneNumber ||
      !role
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      district,
      phoneNumber,
      role,
    });

    if (newUser) {
      createSendToken(newUser, 201, 'User registered successfully!', res);
    } else {
      throw new Error("Error when user creating");
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

module.exports = { signIn, signUp };
