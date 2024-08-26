const User = require("../models/userModel");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    
    const user = await User.findOne({ where: { email } });

    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    
    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // If credentials are correct, you can return a success message or a JWT token
    return res.status(200).json({ message: "Sign in successful!", user: { id: user.id, email: user.email, role: user.role } });

  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

const signUp = async (req, res, next) => {

  try {
    const { firstName, lastName, email, password, district, phoneNumber, role } = req.body;

    
    if (!firstName || !lastName || !email || !password || !district || !phoneNumber || !role) {
      return res.status(400).json({ message: "Please fill in all required fields." });
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
      role
    });
    
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        district: newUser.district,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      }
    });

  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}


module.exports = { signIn, signUp };
