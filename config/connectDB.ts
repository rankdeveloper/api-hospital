import mongoose from "mongoose";
import { Pool } from "pg";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

// postgres connection
export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "rankush0507",
  database: "postgres",
});

pool.on("connect", () => {
  console.log("Connected to database");
});

pool.on("error", (err: any) => {
  console.log("connection failed", err);
});
