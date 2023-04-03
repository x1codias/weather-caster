const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ErrorHandler = require("../models/error-handler");
const User = require("../models/user");

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    console.log(req.body);
    return next(
      new ErrorHandler("Invalid inputs passed, please check your data", 422)
    );
  }

  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    console.log(err);

    return next(
      new ErrorHandler("Signing up failed, please try again later", 500)
    );
  }

  if (existingUser) {
    return next(
      new ErrorHandler("User exists already, please login instead", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new ErrorHandler("Could not create user, please try again", 500)
    );
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Signing up failed, please try again", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_KEY,
      { expiresIn: "2h" }
    );
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Signing up failed, please try again", 500));
  }

  console.log(token);

  res
    .status(201)
    .json({ userId: newUser.id, email: newUser.email, token: token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    console.log(req.body);
    return next(
      new ErrorHandler("Invalid inputs passed, please check your data", 422)
    );
  }

  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    console.log(err);
    return next(
      new ErrorHandler("Logging in failed, please try again later", 500)
    );
  }

  console.log(existingUser);

  if (!existingUser) {
    return next(
      new ErrorHandler("Invalid username, insert correct username.", 401)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new ErrorHandler("Invalid credentials, could not log you in.", 500)
    );
  }

  if (!isValidPassword) {
    return next(
      new ErrorHandler("Invalid password, insert correct password.", 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      process.env.JWT_KEY,
      { expiresIn: "2h" }
    );
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Logging in failed, please try again", 500));
  }

  console.log(token);

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token,
  });
};

exports.login = login;
exports.signup = signup;
