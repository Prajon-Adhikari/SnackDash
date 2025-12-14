import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;
