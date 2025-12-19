import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please menetion mongo uri in .env file");
}

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGO_URI, {
      dbName: "snackdash",
    });
    console.log("Mongo DB connected");
  } catch (error) {
    console.log("Error while connecting mongodb", error);
  }
};

export default connectDB;
