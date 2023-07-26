import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import md5 from "md5";
let refreshTokens = [];
export const authController = {
  TOKEN: process.env.JSONWEBTOKEN_TOKEN,
  //GET PROJECT
  registerUser: async (req, res, next) => {
    console.log(req.body);
    try {
      const md5Password = md5(req.body.password);
      const newUser = await UserModel({
        username: req.body.username,
        password: md5Password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      });
      const user = await newUser.save();
      res
        .status(200)
        .json({ account: user, message: "Created account successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const TOKEN = process.env.JSONWEBTOKEN_TOKEN;
      const user = await UserModel.findOne({
        username: req.body.username,
        password: md5(req.body.password),
      });
      console.log(user);
      if (user) {
        const { password, ...others } = user._doc;
        let accessToken = jwt.sign(
          {
            _id: user._id,
            isAdmin: user.role === "Admin" ? true : false,
          },
          TOKEN,
          { expiresIn: "2h" }
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
            isAdmin: user.role === "Admin" ? true : false,
          },
          TOKEN,
          { expiresIn: "1" }
        );
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken);
        res.status(200).json({
          message: "success",
          account: others,
          accessToken: accessToken,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logoutUser: async (req, res, next) => {
    res.clearCookie("refreshToken");
    // refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json("logout Successful");
  },
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JSONWEBTOKEN_TOKEN, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      let newAccessToken = jwt.sign(
        {
          _id: user._id,
          isAdmin: user.role === "Admin" ? true : false,
        },
        TOKEN,
        { expiresIn: "2d" }
      );
      const newRefreshToken = jwt.sign(
        {
          id: user.id,
          isAdmin: user.role === "Admin" ? true : false,
        },
        TOKEN,
        { expiresIn: "365d" }
      );
      console.log(refreshTokens);
      refreshTokens.push(newRefreshToken);
      console.log(refreshTokens);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
};
