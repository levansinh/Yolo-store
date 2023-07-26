import { ProductModel } from "../models/Products.js";
import slugify from "slugify"
export const projectController = {
  //GET PROJECT
  getAll: async (req, res) => {
    try {
      const product = await ProductModel.find();
      res.status(200).json({
        product: product,
        success: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getBySlug: async (req, res) => {
    try {
      const product = await ProductModel.findOne({slug: req.params.slug });
      res.status(200).json({
        product: product,
        success: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //ADD PROJECT
  create: async (req, res) => {
    try {
      const product = await new ProductModel({
        categorySlug: req.body.categorySlug,
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        size: req.body.size,
        slug: slugify(req.body.title,{replacement:'-',lower:true}),
        colors: req.body.colors,
        description: req.body.description,
      });
      const result = await product.save();
      res.status(200).json({
        message: "Create product success",
        product: result,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //UPDATE PROJECT
  update: async (req, res) => {
    try {
      const result = await ProductModel.updateOne(
        { _id: req.params.id },
        {
          categorySlug: req.body.categorySlug,
          title: req.body.title,
          price: req.body.price,
          image: req.body.image,
          size: req.body.size,
          slug: slugify(req.body.title,{replacement:'-',lower:true}),
          colors: req.body.colors,
          description: req.body.description,
        }
      );
      res.status(200).json({ message: "Update product success", product: result });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //DELETE PROJECT
  delete: async (req, res) => {
    ProductModel.findByIdAndRemove(req.params.id)
      .then((data) => {
        if (data) {
          res.status(200).json({
            message: "Product deleted successfully",
            product: data,
          });
        } else {
          res.status(403).json({
            message: "Product deleted failed",
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
