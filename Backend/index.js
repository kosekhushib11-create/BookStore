
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import orderRoute from "./route/order.route.js";

dotenv.config();

const app = express();

// Allowed frontend domains
const allowedOrigins = [
  "https://jovial-gumption-5dc17a.netlify.app",
  "https://bookstore-1-g3jg.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked CORS origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// MongoDB URI
const URI = process.env.MONGO_URI;

// Health check
app.get("/", (req, res) => {
  res.status(200).send("BookStore Backend is running!");
});

// MongoDB connection
let connectionPromise = null;

const connectDB = async () => {
  if (!URI) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(URI)
      .then(() => {
        console.log("MongoDB connected successfully!");
      })
      .catch((error) => {
        connectionPromise = null;
        console.error("MongoDB connection error:", error.message);
        throw error;
      });
  }

  await connectionPromise;
};

// Database middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database Connection Error:", error.message);

    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// API Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);

// Invalid route handler
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// Start Render server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`BookStore server running on port ${PORT}`);
});
