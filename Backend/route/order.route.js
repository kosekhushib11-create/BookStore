
import express from "express";

import {
  createOrder,
  getUserOrders,
} from "../controller/order.controller.js";

const router = express.Router();

// Create order
router.post("/create", createOrder);

// Get user's orders
router.get("/user/:userId", getUserOrders);

export default router;
