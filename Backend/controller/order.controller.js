
import mongoose from "mongoose";
import Order from "../model/order.model.js";
import User from "../model/user.model.js";
import Book from "../model/book.model.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Validate required fields
    if (!userId || !bookId) {
      return res.status(400).json({
        message: "User ID and Book ID are required",
      });
    }

    // Validate MongoDB IDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(bookId)
    ) {
      return res.status(400).json({
        message: "Invalid user ID or book ID",
      });
    }

    // Check user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Calculate amount from database price
    const totalAmount = book.price;

    // Save order
    const newOrder = new Order({
      user: user._id,
      book: book._id,
      bookName: book.name,
      price: book.price,
      quantity: 1,
      totalAmount,
      orderStatus: "Confirmed",
      paymentStatus: "Pending",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    console.log("Order Error:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get orders of a user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const orders = await Order.find({ user: userId })
      .populate("book")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.log("Fetch Orders Error:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
