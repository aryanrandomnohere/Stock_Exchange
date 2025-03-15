import User from "../model/user_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

/*signup*/
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]).{8,}$/;

  if (!username.match(usernameRegex)) {
    return next(
      errorHandler(400, "Username can only contain letters and numbers.")
    );
  }

  if (!password.match(passwordRegex)) {
    return next(
      errorHandler(400, "Password must meet the specified criteria.")
    );
  }

  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required."));
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: "https://cdn-icons-png.freepik.com/512/64/64572.png",
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "MYSECRET", {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User account created successfully",
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    next(error);
  }
};

/*signin*/
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(errorHandler(404, "Invalid Credentials"));
  }
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) {
    return next(errorHandler(400, "Invalid Credentials"));
  }

  try {
    const token = jwt.sign({ id: validUser._id }, "MYSECRET", {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        message: "Signed in successfully",
        token,
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};

/*google auth*/
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, "MYSECRET", {
        expiresIn: "1d",
      });

      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({
          message: "Signed in successfully",
          token,
          user: rest, // Send all user data except password
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const username =
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(36).slice(-4); // Adjusted to use alphanumeric characters

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id },
        "MYSECRET",
        { expiresIn: "1d" } // Add expiration if desired
      );

      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({
          message: "Account created and signed in successfully",
          token,
          user: rest,
        });
    }
  } catch (error) {
    next(error);
  }
};

/*signout*/
export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
