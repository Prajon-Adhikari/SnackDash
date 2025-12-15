import mongoose, { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: string;
  description: string;
  image: string;
  variation: string[];
  rating?: number;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    variation: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || model<IProduct>("Product", productSchema);

export default Product;
