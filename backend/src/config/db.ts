import mongoose from "mongoose";
import config from "./env";

const FALLBACK_URI = "mongodb://127.0.0.1:27017/healthy_web_care";

export async function connectDB(): Promise<typeof mongoose> {
  const uri = config.mongoUri || FALLBACK_URI;

  mongoose.connection.on("connected", () => {
    console.log(`[db] MongoDB connected (${mongoose.connection.name})`);
  });
  mongoose.connection.on("error", (error: Error) => {
    console.error(`[db] MongoDB connection error: ${error.message}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected");
  });

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  return mongoose;
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}

export default connectDB;
