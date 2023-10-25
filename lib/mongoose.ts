import mongoose from "mongoose";

let isConnected = false;

export const connectedToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("No URL");
  if (isConnected) return console.log("connected");

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};
