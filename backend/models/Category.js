import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  category_name: { type: String, required: "true"},
  categorySlug: { type: String, required: "true",unique:true},
},{
  timestamps:true
});

export const CategoryModel = mongoose.model("Category", schema);
