const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  orderdate: { type: Date, default: Date.now },
  totalamount: { type: Number, required: true },
});

orderModel = mongoose.model("order",orderSchema);
module.exports = orderModel;