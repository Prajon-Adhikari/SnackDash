import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  resetOtp?: string;
  resetOtpExpiry?: Date;
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
    resetOtp: {
      type: String,
    },
    resetOtpExpiry: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;
