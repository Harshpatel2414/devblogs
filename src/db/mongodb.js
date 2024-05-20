import mongoose from "mongoose";

const connectMongoDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    // If already connected, no need to reconnect
    return;
  }
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURI, {
      dbName: "devblogs"
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;