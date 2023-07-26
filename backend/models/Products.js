import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  categorySlug: { type: String, require:"true"},
  title: { type: String, required: "true" },
  price: { type: String, required: "true" },
  image: { type: String, required: "true"},
  size: { type: Array, required: "true" },
  colors: { type: Array,required: "true" },
  description: { type: String},
  slug: { type: String, required: "true",unique:true},
  review_count: { type: Number, default: 0 },
  average_score: { type: Number, default: 0 },
},{
  timestamps:true
});

export const ProductModel = mongoose.model("Product", schema);
