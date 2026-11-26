
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import orderRoute from "./route/order.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
const URI = process.env.MONGO_URI;

if (!URI) {
    console.error("MongoDB URI is missing!");
    process.exit(1);
}

try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB successfully!");

    // Defining routes
    app.use("/book", bookRoute);
    app.use("/user", userRoute);
    app.use("/order", orderRoute);

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });

} catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
}
