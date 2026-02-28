import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var __mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    listenersAttached: boolean;
  } | undefined;
}

const cached = global.__mongoose || {
  conn: null,
  promise: null,
  listenersAttached: false,
};
global.__mongoose = cached;

export const connectedToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("Missing MONGODB_URL");
  }

  if (!cached.listenersAttached) {
    mongoose.connection.on("disconnected", () => {
      cached.conn = null;
      cached.promise = null;
    });
    mongoose.connection.on("error", () => {
      cached.conn = null;
      cached.promise = null;
    });
    cached.listenersAttached = true;
  }

  if (mongoose.connection.readyState === 1 && cached.conn) {
    return cached.conn;
  }

  if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }

  return cached.conn;
};
