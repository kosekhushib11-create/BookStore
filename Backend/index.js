
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import orderRoute from "./route/order.route.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "https://jovial-gumption-5dc17a.netlify.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());

const URI = process.env.MONGO_URI;

// Health check
app.get("/", (req, res) => {
    res.send("BookStore Backend is running!");
});

// MongoDB connection
let connectionPromise;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(URI)
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
        if (!URI) {
            throw new Error("MongoDB URI is missing!");
        }

        await connectDB();
        next();

    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);

// Export Express app for Vercel
export default app;
