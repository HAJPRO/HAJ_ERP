const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const SaleDepProvideCardSchema = new Schema(
  {
    delivery_product_box_id: { type: mongoose.Schema.ObjectId },
    sale_order_id: { type: Schema.ObjectId, ref: "SaleCard" },
    departmen: { type: String },
    author: { type: mongoose.Schema.ObjectId },
    status: { type: String, default: "Tasdiqlanmagan" },
    proccess_status: { type: Array },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("DepProvideCard", SaleDepProvideCardSchema);
