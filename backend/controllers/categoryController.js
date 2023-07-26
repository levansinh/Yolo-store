import { CategoryModel } from "../models/Category.js";
import slugify from "slugify"
export const categoryController = {
  //GET all category
  getAll: async (req, res) => {
    try {
      const category = await CategoryModel.find();
      res.status(200).json({
        data: category,
        success: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const category = await CategoryModel.findOne({ _id: req.params.id });
      res.status(200).json({
        data: category,
        success: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //ADD PROJECT
  create: async (req, res) => {
   
        try {
          const category = await new CategoryModel({
            category_name:req.body.category_name,
            categorySlug:slugify(req.body.category_name, {replacement:'-',lower:true}),
           });
           const result = await category.save();
           res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
  
  },
  //UPDATE PROJECT
  update: async (req, res) => {
    try {
      const category = await CategoryModel.updateOne(
        { _id: req.params.id },
        {
          category_name:req.body.category_name,
          categorySlug:slugify(req.body.category_name, {replacement:'-',lower:true}),
        }
      );
      res.status(200).json({ message: "success", data: category });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //DELETE PROJECT
  delete: async (req, res) => {
    CategoryModel.findByIdAndRemove(req.params.id)
    .then(data=>{
      if(data){
        res.status(200).json({
          message: 'category deleted successfully',
          data:data
        });
      }else{
        res.status(403).json({
          message: 'category deleted failed',
        });
      }
    })
    .catch((err)=>{
      res.status(500).json(err)
    })
  },
};
