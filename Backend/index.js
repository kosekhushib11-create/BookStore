
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import orderRoute from "./route/order.route.js";

dotenv.config();

const app = express();

// ===============================
// CORS CONFIGURATION
// ===============================

const allowedOrigins = [
  "https://jovial-gumption-5dc17a.netlify.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Handle preflight requests
app.options(/.*/, cors());

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

// ===============================
// MONGODB CONNECTION
// ===============================

const URI = process.env.MONGO_URI;

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!URI) {
    throw new Error("MongoDB URI is missing!");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(URI)
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
};

// Connect to MongoDB before API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);

    res.status(500).json({
      message: "Database connection failed"
    });
  }
});

// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
  res.send("BookStore Backend is running!");
});

// ===============================
// API ROUTES
// ===============================

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`BookStore Backend running on port ${PORT}`);
});
