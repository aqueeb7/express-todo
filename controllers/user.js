const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    let userData = await newUser.save();

    if (userData) {
      return res.status(201).send({
        message: "User created successfully",
        user: userData,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
      data: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let userData = await User.findOne({ email: req.body.email });

    if (userData) {
      if (bcrypt.compareSync(req.body.password, userData.password)) {
        let jwt_secret = process.env.JWT_SECRET || "mysecret";
        const token = jwt.sign(
          {
            data: userData,
          },
          jwt_secret,
          {
            expiresIn: "12h",
          }
        );
        return res.status(201).send({
          message: "User logged in successfully",
          data: {
            token: token,
            user: userData,
          },
        });
      } else {
        return res.status(400).send({
          message: "Invalid credentials",
          data: {},
        });
      }
    } else {
      return res.status(400).send({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      data: error,
    });
  }
};