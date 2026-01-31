import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });
    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/herbalStore`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

