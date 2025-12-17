import mongoose, { Schema, model, Document, Types } from "mongoose";
import User from "@/model/User";
import Product, { IProduct } from "./Product";

export interface ICartProduct {
  product: Types.ObjectId | IProduct;
  quantity: number;
}

export interface ICart extends Document {
  items: ICartProduct[];
  userId: Types.ObjectId;
}

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);
const Cart = mongoose.models.Cart || model<ICart>("Cart", CartSchema);

export default Cart;
