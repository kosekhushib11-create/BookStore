
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
    origin: "https://bookstore-1-g3jg.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// Health check
app.get("/", (req, res) => {
    res.send("BookStore Backend is running!");
});

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);

const startServer = async () => {
    try {
        if (!URI) {
            throw new Error("MongoDB URI is missing!");
        }

        await mongoose.connect(URI);
        console.log("Connected to MongoDB successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server Error:", error.message);
        process.exit(1);
    }
};

startServer();
