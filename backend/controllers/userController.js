import { UserModel } from "../models/User.js";
import md5 from "md5";
export const userController = {
  //GET USER
  getAllUser: async (req, res) => {
    
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  },
  getOneUser: async (req, res) => {
    try {
      const user = await UserModel.findOne(req.body._id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  },
  getWithRole: async (req, res) => {
    try {
      const user = await UserModel.find({
        role: req.params.role,
      });
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getProfile: async (req, res) => {
    try {
      const user = await UserModel.findById(req.userId);
      res.status(200).json({
        profile:user
      });
    } catch (error) {
      res.status(500).json({
      message:'error'
      });
    }
  },
  updateImageUser: async (req, res) => {
    console.log(req.files)
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { image: req.files }
    ).then((data) => {
      res.status(200).json({ data: data, message: "Success" });
    })
    .catch(err=>{res.status(500).json(err)})
  },
  deleteUser: async (req, res) => {
    UserModel.findByIdAndRemove(req.params.id)
      .then((data) => {
        if (data) {
          res.status(200).json({
            message: "Project deleted successfully",
            data: data,
          });
        } else {
          res.status(403).json({
            message: "Project deleted failed",
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  updateUser: async (req, res) => {
    const {oldPassword,password} = req.body
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { password: md5(password)}
    ).then((data) => {
      res.status(200).json({ data: data, message: "Success" });
    })
    .catch(err=>{res.status(500).json(err)})
  },
};
