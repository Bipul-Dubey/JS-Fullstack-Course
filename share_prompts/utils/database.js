import mongoose from "mongoose";

let isConnected = false; // track the db connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.NEXT_MONGODB_URI, {
      dbName: "prompt_share",
    });
    isConnected = true;
    console.log("mongo db is connected");
  } catch (error) {
    console.log("error while db connection", error);
  }
};
